const { pool } = require('./connection');

function toPostGraphqlType(post) {

  return {
      id: post.id,
      title: post.title,
      from: post.fromdate,
      to: post.todate,
      color: post.color
  }
}

function toPhotoGraphqlType(photo) {
  return {
    id: photo.id,
    path: photo.imgurlink,
    caption: photo.caption,
  }
}

async function getPosts(postsQueryInput) {
  const { from, to } = postsQueryInput;
  try {
    const result = await pool.query(`SELECT * FROM GetPosts('${from}','${to}')`);
      const posts = result.rows[0].posts.map(post => toPostGraphqlType(post));
      const photos = result.rows[0].photos;
      posts.forEach(post => {
        post.photos = photos.filter(photo => photo.postid === post.id).map(photo => toPhotoGraphqlType(photo));
      });
      return posts;
  } catch (err) {
      console.error('SQL error', err);
      return [];
  }
}

module.exports = {
  getPosts,
}