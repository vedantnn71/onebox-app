import type { Db, Collection } from "mongodb";
import { ObjectId } from "mongodb";
import mongoClient from "./mongoClient";
import Account from "./interfaces/account";

interface IUpdateAccessToken {
  accountId: ObjectId;
  accessToken: string;
}

const updateAccessToken = async ({
  accountId,
  accessToken,
}: IUpdateAccessToken) => {
  const client = await mongoClient;
  const database: Db = await client.db("main");
  const accounts: Collection<Account> = await database.collection("accounts");
  const account = await accounts.findOneAndUpdate(accountId, {
    $set: { access_token: accessToken },
  });

  return account;
};

export default updateAccessToken;
