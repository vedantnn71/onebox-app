import type { Db, Collection, WithId } from "mongodb";
import { ObjectId } from "mongodb";
import mongoClient from "./mongoClient";
import User from "./interfaces/user";

const fetchUserId = async (email: string) => {
  const client = await mongoClient;
  const database: Db = await client.db("main");
  const users: Collection<User> = await database.collection("users");
  const user = await users.findOne({ email });

  if (!user) {
    throw new Error("No user found");
  }

  return user._id;
};

export default fetchUserId;
