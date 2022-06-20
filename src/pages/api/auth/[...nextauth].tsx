import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import mongoClient from "../lib/mongoClient";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  adapter: MongoDBAdapter(mongoClient),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      // clientId: process.env.TWITTER_OAUTH_TOKEN,
      // clientSecret: process.env.TWITTER_OAUTH_SECRET,
      // version: "2.0"
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
});
