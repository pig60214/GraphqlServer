const { pool } = require('./connection');

async function addPostPhoto(postId, caption, imgurLink, imgurDeleteHash){
  try {
    await pool.query(`CALL add_post_photo(${postId}, '${caption}', '${imgurLink}', '${imgurDeleteHash}')`);
  } catch (err) {
    console.error('SQL error', err);
  }
}

module.exports = {
  addPostPhoto,
}
