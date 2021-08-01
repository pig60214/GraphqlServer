const { getPosts, addPost } = require('../../repositories/Post')

module.exports = {
  Query: {
    posts: async (_, { postsQueryInput }) => {
      return await getPosts(postsQueryInput);
    },
  },

  Mutation: {
    addPost: (_, { addPostInput }) => {
      return addPost(addPostInput);
    },
  }
};
