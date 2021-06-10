const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.applyMiddleware({ app });

app.listen({ port: 4000 },
  () => console.log(`GraphQL Server ready at http://localhost:4000${apolloServer.graphqlPath}`));  // eslint-disable-line
