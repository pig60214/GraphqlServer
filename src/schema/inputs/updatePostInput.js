module.exports = /* GraphQL */ `
  input UpdatePostInput {
    id: ID!
    title: String
    deletePhotoIds: [ID!]
    " TODO "
    updatePhotoCaptions: [UpdatePhotoCaptionInput!]
    addPhotos: [Base64FileCaptionPair!]
    from: String
    to: String
    color: String
  }

  input UpdatePhotoCaptionInput {
    id: ID!
    caption: String!
  }
`