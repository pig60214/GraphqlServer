const { pool } = require('./connection');

function toPostGraphqlType(post) {
  return {
      id: post.id,
      title: post.title,
      from: post.from_date,
      to: post.to_date,
      color: post.color
  }
}

function toPhotoGraphqlType(photo) {
  return {
    id: photo.id,
    path: photo.imgur_link,
    caption: photo.caption,
  }
}

async function getPosts(postsQueryInput) {
  const { from, to } = postsQueryInput;
  try {
    const result = await pool.query(`SELECT * FROM get_posts('${from}','${to}')`);
      const posts = result.rows[0].posts.map(post => toPostGraphqlType(post));
      const photos = result.rows[0].photos;
      posts.forEach(post => {
        post.photos = photos.filter(photo => photo.post_id === post.id).map(photo => toPhotoGraphqlType(photo));
      });
      return posts;
  } catch (err) {
      console.error('SQL error', err);
      return [];
  }
}

async function addPost(addPostInput){
  const { title, from, to, color } = addPostInput;
  try {
      const result = await pool.query(`SELECT * FROM add_post('${title}','${from}','${to}','${color}')`);
      const posts = result.rows.map(post => toPostGraphqlType(post));
      return posts[0];
  } catch (err) {
      console.error('SQL error', err);
      return null;
  }
}

async function updatePostAndDeletePhotos(updatePostInput){
  const { id, title, from, to, color, deletePhotoIds } = updatePostInput;
  const deletePhotoIdsStr = deletePhotoIds ? deletePhotoIds.join(',') : '';
  try {
    const result = await pool.query(`SELECT * FROM update_post_and_delete_photos(${id},'${title}','${from}','${to}','${color}', '${deletePhotoIdsStr}')`);
    const posts = result.rows.map(post => toPostGraphqlType(post));
    console.log(posts[0]);
    return posts[0];
  } catch (err) {
    console.error('SQL error', err);
    return null;
  }
}

module.exports = {
  getPosts,
  addPost,
  updatePostAndDeletePhotos,
}