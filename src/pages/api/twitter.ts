import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterClient } from "twitter-api-client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return;

  const { accessToken, accessTokenSecret } = req.body;
  console.log({ accessToken, accessTokenSecret });

  if (!accessToken || !accessTokenSecret) {
    return res.status(403);
  }

  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_CLIENT_ID,
    apiSecret: process.env.TWITTER_CLIENT_SECRET,
    accessToken,
    accessTokenSecret,
  });

  const messages = await twitterClient.directMessages.eventsList();
  console.log(messages);

  return res.json(messages);
};

export default handler;
