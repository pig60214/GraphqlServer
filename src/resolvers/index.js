const { mergeResolvers } = require('@graphql-tools/merge');

const post = require('./queries/post.resolvers')

const resolversArray = [post];
module.exports = mergeResolvers(resolversArray);
