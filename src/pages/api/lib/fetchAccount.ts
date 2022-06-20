import type { Db, Collection, WithId } from "mongodb";
import { ObjectId } from "mongodb";
import Account from "./interfaces/account";
import mongoClient from "./mongoClient";

const fetchAccount = async (userId: ObjectId, provider: string) => {
  if (!userId) {
    throw new Error("Invalid userId");
  }

  const client = await mongoClient;
  const database: Db = await client.db("main");
  const accounts: Collection<Account> = await database.collection("accounts");
  const account = accounts.findOne({ userId: new ObjectId(userId), provider });

  if (!account) {
    return null;
  }

  return account;
};

export default fetchAccount;
