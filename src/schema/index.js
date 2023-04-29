const { mergeTypeDefs } = require('@graphql-tools/merge');

const photoType = require('./types/photo');
const postType = require('./types/post');

const postQuery = require('./queries/post');

const postMutation = require('./mutations/post');

const addPostInput = require('./inputs/addPostInput');
const postsQueryInput = require('./inputs/postsQueryInput');
const updatePostInput = require('./inputs/updatePostInput');

const processStatusEnum = require('./enum/processStatus');

const typesArray = [
  photoType,
  postType,
  postQuery,
  postMutation,
  addPostInput,
  postsQueryInput,
  updatePostInput,
  processStatusEnum
];
module.exports = mergeTypeDefs(typesArray);
