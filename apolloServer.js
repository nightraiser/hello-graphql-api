
import { gql, ApolloServer } from 'apollo-server-express';
import * as UserService from './services/user.service';

const typeDefs = gql`
 type Comment {
   _id: String,
   comment: String,
   post: Post,
   user: User
 }
 type Post {
  _id: String,
    title: String,
    text: String,
    comments:[Comment],
    user: User
 }
 type User {
  _id: String,
   name: String,
   posts: [Post]
 }
 type Query {
    users: [User]
  }
  `;

const resolvers = {
    Query: {
        users: async () => await UserService.findAllAsync()
    }
};


const server = new ApolloServer({ typeDefs, resolvers });
export default server;