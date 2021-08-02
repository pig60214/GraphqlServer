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
    }
}

function toPhotoGraphqlType(photo) {
  return {
    path: photo.ImgurLink,
    caption: photo.Caption,
  }
}

async function getPosts(postsQueryInput) {
    const { from, to } = postsQueryInput;
    await poolConnect; // ensures that the pool has been created
    try {
        const result = await pool.request()
            .input('fromDate', sql.DateTime, from)
            .input('toDate', sql.DateTime, to)
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
    const { title, from, to } = addPostInput;

    await poolConnect; // ensures that the pool has been created
    try {
        const result = await pool.request()
            .input('title', sql.NVarChar(500), title)
            .input('fromDate', sql.DateTime, from)
            .input('toDate', sql.DateTime, to)
            .execute('AddPost');
        const posts = result.recordset.map(post => toPostGraphqlType(post));
        return posts[0];
    } catch (err) {
        console.error('SQL error', err);
        return null;
    }
}

module.exports = {
    getPosts,
    addPost
}