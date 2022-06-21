import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import facebookClient from "../lib/facebook/facebookClient";
import fetchUserId from "../lib/fetchUserId";
import fetchAccount from "../lib/fetchAccount";
import fetchPosts from "../lib/facebook/fetchPosts";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("Unauthorized");
  }
  
  const userId = await fetchUserId(session.user.email);
  const userAccount = await fetchAccount(userId, "facebook");

  if (userAccount === null) {
    return res.status(400).send("No account found");
  }

  const { access_token } = userAccount;
  const client = facebookClient(access_token);
  const me = await fetchPosts(access_token);

  console.log(me);
  
  return res.json(me)
}

export default handler;