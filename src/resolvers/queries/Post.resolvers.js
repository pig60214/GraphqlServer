const { getPosts, addPost } = require('../../repositories/Post');
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
      addPostPhoto(newPost.id, addPostInput);

      return newPost;
    },
  }
};
