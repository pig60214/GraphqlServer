const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function start() {
  const url = await startStandaloneServer(server, {
    listen: { port: 4000 },
    bodyParserConfig: {
      limit:"10mb"
    }
  });

  console.log(`🚀  Server ready at: ${url.url}`);
}

start();