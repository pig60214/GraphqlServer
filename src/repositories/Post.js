const { getPosts, addPost, updatePostAndDeletePhotos } = require('./mssql/post');

module.exports = {
  getPosts,
  addPost,
  updatePostAndDeletePhotos
}