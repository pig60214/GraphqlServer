const { getPosts, addPost, updatePostAndDeletePhotos } = require('./pg/post');

module.exports = {
  getPosts,
  addPost,
  updatePostAndDeletePhotos
}