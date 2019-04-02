import "@babel/polyfill";
import { ApolloServer } from "apollo-server";
import typeDefs from "./data/schema";
import resolvers from "./data/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
