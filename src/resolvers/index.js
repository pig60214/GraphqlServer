const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const resolversArray = loadFilesSync('./**/*.resolvers.js');
module.exports = mergeResolvers(resolversArray);
