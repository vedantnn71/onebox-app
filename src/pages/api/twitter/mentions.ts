import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import userTwitterClient from "../lib/twitter/userTwitterClient";
import fetchUserId from "../lib/fetchUserId";
import fetchAccount from "../lib/fetchAccount";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("Unauthorized");
  }

  const userId = await fetchUserId(session.user.email);
  const userAccount = await fetchAccount(userId, "twitter");

  if (userAccount === null) {
    return res.status(400).send("No account found")
  }

  const twitterClient = await userTwitterClient(userAccount._id);
  const recentMentions = await twitterClient.tweets.statusesMentionsTimeline();

  return res.json(recentMentions);
}

export default handler;