import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { TwitterClient } from "twitter-api-client";
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

  const { oauth_token, oauth_token_secret } = userAccount;
  
  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_CLIENT_ID, 
    apiSecret: process.env.TWITTER_CLIENT_SECRET, 
    accessToken: oauth_token,
    accessTokenSecret: oauth_token_secret
  })

  const recentMentions = await twitterClient.tweets.statusesMentionsTimeline();

  return res.json(recentMentions);
}

export default handler;