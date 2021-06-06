import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { typeDefs } from './schema/index.js'

let data = [
  { title: 'FP in JavaScript', category: 'FP'},
  { title: 'RxJS in Action', category: 'FRP'},
  { title: 'Speaking JavaScript', category: 'JS'}
]

let books = (_, { category }) => data.filter(x => x.category === category)

let resolvers = {
  Query: {
    books
  }
}

let app = express()

let apolloServer = new ApolloServer({ typeDefs, resolvers })

apolloServer.applyMiddleware({ app })

app.listen({ port: 4000 },
  () => console.log(`GraphQL Server ready at http://localhost:4000${ apolloServer.graphqlPath }`)
)