const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('../../src/schema');
const resolvers = require('../../src/resolvers');

const getHandler = (event, context) => {
  const server = new ApolloServer({
      typeDefs,
      resolvers,
      debug: true,
  });

  const graphqlHandler = server.createHandler({
    expressGetMiddlewareOptions: {
      bodyParserConfig: {
        limit:"10mb"
      }
    }
  });

  if (!event.requestContext) {
      event.requestContext = context;
  }
  return graphqlHandler(event, context);
}

exports.handler = getHandler;