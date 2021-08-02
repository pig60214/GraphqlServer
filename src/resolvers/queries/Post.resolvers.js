const { getPosts, addPost } = require('../../repositories/Post');
const { addPostImage } = require('../../services/imageService');

module.exports = {
  Query: {
    posts: async (_, { postsQueryInput }) => {
      return await getPosts(postsQueryInput);
    },
  },

  Mutation: {
    addPost: async (_, { addPostInput }) => {
      const newPost = await addPost(addPostInput);
      addPostImage(newPost.id, addPostInput);

      return newPost;
    },
  }
};
