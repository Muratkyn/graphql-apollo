import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { games, reviews, authors } from "./db.js";
import { typeDefs } from "../schema.js";

const resolvers = {
  Query: {
    games() {
      return games;
    },
    game(_, args) {
      return games.find((game) => game.id === args.id);
    },
    authors() {
      return authors;
    },
    author(_, args) {
      return authors.find((author) => author.id === args.id);
    },
    reviews() {
      return reviews;
    },
    review(_, args) {
      return reviews.find((rev) => rev.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return games.filter((game) => game.id === parent.game_id);
    },
    author(parent) {
      return authors.filter((author) => author.id === parent.author_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      const foundIndex = games.findIndex((game) => game.id === args.id);
      if (foundIndex && foundIndex !== -1) games.splice(foundIndex, 1);
      return games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: (games.length + 1).toString(),
      };
      games.push(game);

      return game;
    },
    editGame(_, args) {
      const index = games.findIndex( g => g.id === args.id)

      let updatedGame = {
        ...games[index],
        ...args.edit
      }
      return updatedGame
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
