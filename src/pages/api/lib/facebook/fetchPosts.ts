import fetchUserId from "../fetchUserId";
import fetchAccount from "../fetchAccount";
import facebookClient from "./facebookClient";

const fetchPosts = async (accessToken: string) => {
  const client = facebookClient(accessToken);
  const { id } = await client.api("me");
  const posts = await client.api(`me/posts`);

  return posts;
};

export default fetchPosts;
