module.exports = /* GraphQL */ `
  type Mutation {
      addPost(addPostInput: AddPostInput!): Post
      updatePost(updatePostInput: UpdatePostInput!): Post
  }
`