import fetchUserId from "../lib/fetchUserId";
import fetchAccount from "../lib/fetchAccount";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
// import { TwitterClient } from "twitter-api-client";
import TwitterApi from "twitter-api-v2";

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

  const { access_token, refresh_token } = userAccount;

  const twitterClient = new TwitterApi({
    clientId: process.env.TWITTER_OAUTH_TOKEN,
    clientSecret: process.env.TWITTER_OAUTH_SECRET,
  });

  const {
    client,
    accessToken,
    refreshToken
  } = await twitterClient.refreshOAuth2Token(refresh_token);

  const { data }  = await client.v2.userTimeline("12");

  return res.json(data)
}

export default handler;