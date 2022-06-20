import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import TwitterApi, { EDirectMessageEventTypeV1 } from "twitter-api-v2";
import fetchUserId from "../lib/fetchUserId";
import fetchAccount from "../lib/fetchAccount";
import updateTokens from "../lib/updateTokens";

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

  const client = new TwitterApi({
    appKey: process.env.CLIENT_ID,
    appSecret: process.env.CLIENT_SECRET,
    accessToken: oauth_token,
    accessSecret: oauth_token_secret,
  });
  
  res.status(200)

}

export default handler;