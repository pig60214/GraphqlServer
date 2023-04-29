module.exports = /* GraphQL */ `
  type Query {
      posts(postsQueryInput: PostsQueryInput!): [Post]
  }
`