import type { Db, Collection, WithId } from "mongodb";
import { ObjectId } from "mongodb";
import mongoClient from "./mongoClient";

interface Account {
  provider: string;
  type: string;
  providerAccountId?: string;
  access_token?: string;
  token_type?: string;
  userId: ObjectId;
  expires_at: number;
  oauth_token?: string;
  oauth_token_secret?: string;
}


const fetchAccount = (userId: string): Promise<WithId<Account>> | null => {
  if (!userId || !(ObjectId.isValid(userId))) {
    throw new Error("Invalid userId")
  }

  const database: Db = mongoClient.db("main");
  const accounts: Collection<Account> = database.collection("accounts");
  const account = accounts.findOne({ userId: new ObjectId(userId) });

  if (!account) {
    return null;
  }

  return account;
}

export default fetchAccount;