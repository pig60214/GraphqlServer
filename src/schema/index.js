const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const typesArray = loadFilesSync('**\\*.graphql');
module.exports = mergeTypeDefs(typesArray);
