const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
app.use(express.json({limit : '2100000kb'}));

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.applyMiddleware({ app });

if(process.env.NODE_ENV === 'development') {
  app.listen({ port: 4000 },
    () => console.log(`GraphQL Server ready at http://localhost:4000${apolloServer.graphqlPath}`));  // eslint-disable-line
} else {
  app.listen(() => console.log(`GraphQL Server ready at http://{{domainName}}${apolloServer.graphqlPath}`));  // eslint-disable-line
}
