const { pool, poolConnect } = require('./connection');
const sql=require('mssql');

async function addPostImage(postId, caption, imgurLink, imgurDeleteHash){
  await poolConnect; // ensures that the pool has been created
  try {
    await pool.request()
      .input('postId', sql.Int, postId)
      .input('caption', sql.NVarChar(50), caption)
      .input('imgurLink', sql.NVarChar(50), imgurLink)
      .input('imgurDeleteHash', sql.NVarChar(50), imgurDeleteHash)
      .execute('AddPostImage');
  } catch (err) {
    console.error('SQL error', err);
    return null;
  }
}

module.exports = {
  addPostImage,
}