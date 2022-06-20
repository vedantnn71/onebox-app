import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import fetchUserId from "../lib/fetchUserId";
import fetchAccount from "../lib/fetchAccount";
import userTwitterClient from "../lib/twitter/userTwitterClient";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("Unauthorized");
  }

  const userId = await fetchUserId(session.user.email);
  const userAccount = await fetchAccount(userId, "twitter");

  if (!userAccount) {
    return res.status(403).send("Account not found");
  }

  const twitterClient = await userTwitterClient(userAccount._id);
  const messages = await twitterClient.directMessages.eventsList();

  return res.json(messages);
};

export default handler;
