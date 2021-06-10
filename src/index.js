const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema');

const data = [
  { title: 'FP in JavaScript', category: 'FP' },
  { title: 'RxJS in Action', category: 'FRP' },
  { title: 'Speaking JavaScript', category: 'JS' },
];

const books = (_, { category }) => data.filter((x) => x.category === category);

const resolvers = {
  Query: {
    books,
  },
};

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.applyMiddleware({ app });

app.listen({ port: 4000 },
  () => console.log(`GraphQL Server ready at http://localhost:4000${apolloServer.graphqlPath}`));  // eslint-disable-line
