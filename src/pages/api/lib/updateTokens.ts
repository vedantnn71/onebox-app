import type { Db, Collection } from "mongodb";
import { ObjectId } from "mongodb";
import mongoClient from "./mongoClient";
import Account from "./interfaces/account";

interface IUpdateTokens {
  accountId: ObjectId;
  accessToken: string;
  refreshToken: string;
}

const updateTokens = async ({
  accountId,
  accessToken,
  refreshToken,
}: IUpdateTokens) => {
  const client = await mongoClient;
  const database: Db = await client.db("main");
  const accounts: Collection<Account> = await database.collection("accounts");
  const account = await accounts.findOneAndUpdate(
    { _id: accountId },
    {
      $set: { access_token: accessToken, refresh_token: refreshToken },
    }
  );

  return account;
};

export default updateTokens;
