import type { Db, Collection, WithId } from "mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import mongoClient from "./mongoClient";

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
}

const fetchUserId = async (): Promise<ObjectId> => {
  const session = await getSession();
  
  if (!session) {
    throw new Error("Authentication error")
  }

  const { email } = session.user;
  
  const database: Db = mongoClient.db("main");
  const users: Collection<User> = database.collection("users");
  const user = users.findOne({ email });

  if (!user) {
    throw new Error("No user found")
  }

  return user._id;
}

export default fetchUserId;