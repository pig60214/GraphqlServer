module.exports = /* GraphQL */ `
  input AddPostInput {
    title: String!
    photos: [Base64FileCaptionPair!]
    from: String
    to: String
    color: String
  }

  input Base64FileCaptionPair {
    base64File: String!
    caption: String
  }
`