const { pool, poolConnect } = require('./connection');
const sql=require('mssql');

function toPostGraphqlType(post) {
    const fromDate = post.FromDate;
    const toDate = post.ToDate;

    return {
        id: post.PostId,
        title: post.Title,
        from: fromDate.toISOString().replace('Z', ''),
        to: toDate.toISOString().replace('Z', ''),
        color: post.Color
    }
}

function toPhotoGraphqlType(photo) {
  return {
    id: photo.PhotoId,
    path: photo.ImgurLink,
    caption: photo.Caption,
  }
}

async function getPosts(postsQueryInput) {
    const { from, to } = postsQueryInput;
    await poolConnect; // ensures that the pool has been created
    try {
        const result = await pool.request()
            .input('fromDate', sql.Date, from)
            .input('toDate', sql.Date, to)
            .execute('GetPosts');
        const posts = result.recordset.map(post => toPostGraphqlType(post));
        const photos = result.recordsets[1];
        posts.forEach(post => {
          post.photos = photos.filter(photo => photo.PostId === post.id).map(photo => toPhotoGraphqlType(photo));
        });
        return posts;
    } catch (err) {
        console.error('SQL error', err);
        return [];
    }
}

async function addPost(addPostInput){
    const { title, from, to, color } = addPostInput;

    await poolConnect; // ensures that the pool has been created
    try {
        const result = await pool.request()
            .input('title', sql.NVarChar(500), title)
            .input('fromDate', sql.Date, from)
            .input('toDate', sql.Date, to)
            .input('color', sql.NVarChar(30), color)
            .execute('AddPost');
        const posts = result.recordset.map(post => toPostGraphqlType(post));
        return posts[0];
    } catch (err) {
        console.error('SQL error', err);
        return null;
    }
}

async function updatePostAndDeletePhotos(updatePostInput){
  const { id, title, from, to, color, deletePhotoIds } = updatePostInput;
  const deletePhotoIdsStr = deletePhotoIds ? deletePhotoIds.join(',') : undefined;
  await poolConnect; // ensures that the pool has been created
  try {
    const result = await pool.request()
      .input('postId', sql.Int, id)
      .input('title', sql.NVarChar(500), title)
      .input('fromDate', sql.Date, from)
      .input('toDate', sql.Date, to)
      .input('color', sql.NVarChar(30), color)
      .input('deletePhotoIdsStr', sql.NVarChar(50), deletePhotoIdsStr)
      .execute('updatePostAndDeletePhotos');
    const posts = result.recordset.map(post => toPostGraphqlType(post));
    return posts[0];
  } catch (err) {
    console.error('SQL error', err);
    return null;
  }
}

module.exports = {
    getPosts,
    addPost,
    updatePostAndDeletePhotos
}