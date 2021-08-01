const { getPosts, addPost } = require('../../repositories/Post')

module.exports = {
  Query: {
    posts: async (_, { postsQueryInput }) => {
      return await getPosts(postsQueryInput);
    },
  },

  Mutation: {
    addPost: async (_, { addPostInput }) => {
      return await addPost(addPostInput);
    },
  }
};
