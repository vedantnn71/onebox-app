import type { Db, Collection, WithId } from "mongodb";
import { ObjectId } from "mongodb";
import mongoClient from "./mongoClient";

interface Account {
  provider: string;
  type: string;
  providerAccountId?: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  userId: ObjectId;
  expires_at: number;
  oauth_token?: string;
  oauth_token_secret?: string;
}


const fetchAccount = async (userId: ObjectId, provider: string) => {
  if (!userId) {
    throw new Error("Invalid userId")
  }

  const client = await mongoClient;
  const database: Db = await client.db("main");
  const accounts: Collection<Account> = await database.collection("accounts");
  const account = accounts.findOne({ userId: new ObjectId(userId), provider });

  if (!account) {
    return null;
  }

  return account;
}

export default fetchAccount;