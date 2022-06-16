import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

// id
// NmFabF9SVWxaeFdRZ1gteWtZNUE6MTpjaQ

// secret
// Mw7HfzDjp4egrc5fOKftE8M1UBC-9Jz8Dq7AztCSmMMozDo8zR

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
  ],
});
