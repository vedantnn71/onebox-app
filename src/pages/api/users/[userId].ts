import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectId, Collection, Db } from "mongodb";
import { getSession } from "next-auth/react";
import mongoClient from "../lib/mongoClient";

interface Account {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token?: string;
  token_type?: string;
  oauth_token?: string;
  oauth_token_secret: string;
  expires_at: number;
  userId: ObjectId;
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await mongoClient;
  const { userId } = req.query;
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ message: "Please sign in" });
  }
  
  if (!userId) {
    return res.status(403).json({ message: "Invalid userId" });
  } 

  if (ObjectId.isValid(userId as string) === false) {
    return res.status(403).json({ message: "Invalid userId" });
  }

  if (!client) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const database: Db = await client.db("main");
  const accounts: Collection<Account> = await database.collection("accounts");
  const user = await accounts.findOne({ userId: new ObjectId(userId as string) })
  
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.json(user);
}

export default handler;