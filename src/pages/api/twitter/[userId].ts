import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import fetchUserId from "../lib/fetchUserId";
import fetchAccount from "../lib/fetchAccount";
import userTwitterClient from "../lib/twitter/userTwitterClient";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });
  const { userId: userQuery } = req.query;

  if (!session) {
    return res.status(401).send("Unauthorized");
  }

  const userId = await fetchUserId(session.user.email);
  const userAccount = await fetchAccount(userId, "twitter");

  if (userAccount === null) {
    return res.status(400).send("No account found");
  }

  const twitterClient = await userTwitterClient(userAccount._id);

  if (userQuery === "$me") {
    const userDetails = await twitterClient.accountsAndUsers.usersShow({
      user_id: userAccount.providerAccountId as string,
    });

    return res.json(userDetails);
  }

  try {
    const userDetails = await twitterClient.accountsAndUsers.usersShow({
      screen_name: userQuery as string,
    });

    return res.json(userDetails);
  } catch (error) {
    if (error.statusCode) {
      return res.status(404).send("No user found");
    }

    return res.status(500);
  }
};

export default handler;
