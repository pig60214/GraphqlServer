const { getPosts, addPost, updatePostAndDeletePhotos } = require('../../repositories/post');
const { addPostPhoto } = require('../../services/photoService');

module.exports = {
  Query: {
    posts: async (_, { postsQueryInput }) => {
      return await getPosts(postsQueryInput);
    },
  },

  Mutation: {
    addPost: async (_, { addPostInput }) => {
      const newPost = await addPost(addPostInput);

      const { title, photos } = addPostInput;
      await addPostPhoto(newPost.id, title, photos);

      return newPost;
    },

    updatePost: async (_, { updatePostInput }) => {
      const post = await updatePostAndDeletePhotos(updatePostInput);
      const { id, title, addPhotos } = updatePostInput;
      await addPostPhoto(id, title, addPhotos);

      return post;
    },
  }
};
