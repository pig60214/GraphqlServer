const { getPosts, addPost } = require('../../repositories/Post')

module.exports = {
  Query: {
    posts: (_, { postsQueryInput }) => {
      return getPosts(postsQueryInput);
    },
  },

  Mutation: {
    addPost: (_, { addPostInput }) => {
      return addPost(addPostInput);
    },
  }
};
