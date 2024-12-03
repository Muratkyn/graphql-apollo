import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { games, reviews, authors } from "./db.js";
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return games;
    },
    authors() {
      return authors;
    },
    reviews() {
      return reviews;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log("Port is listening to", 3000);
