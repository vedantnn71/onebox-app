import type { Db, Collection } from "mongodb";
import { ObjectId } from "mongodb";
import { TwitterClient } from "twitter-api-client";
import mongoClient from "../mongoClient";
import Account from "../interfaces/account";

const userTwitterClient = async (accountId: ObjectId) => {
  const client = await mongoClient;
  const database: Db = await client.db("main");
  const accounts: Collection<Account> = await database.collection("accounts");
  const account = await accounts.findOne({ _id: accountId });

  if (!account) {
    throw new Error("Account not found");
  }

  const { oauth_token, oauth_token_secret } = account;
  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_CLIENT_ID,
    apiSecret: process.env.TWITTER_CLIENT_SECRET,
    accessToken: oauth_token,
    accessTokenSecret: oauth_token_secret,
  });

  return twitterClient;
};

export default userTwitterClient;
