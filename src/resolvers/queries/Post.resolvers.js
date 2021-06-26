const { getPosts } = require('../../repositories/Post')

module.exports = {
  Query: {
    posts: (_, { postsQueryInput }) => {
      return getPosts(postsQueryInput);
    },
  },
};
