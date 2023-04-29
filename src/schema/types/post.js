module.exports = /* GraphQL */ `
  type Post {
    id: ID!
    title: String!
    from: String
    to: String
    location: String
    with: [String!]
    tag: [String!]
    photos: [Photo!]
    content: String
    processStatus: ProcessStatus
    isTemplate: Boolean
    createdOn: String
    modifiedOn: String
    color: String
  }
`