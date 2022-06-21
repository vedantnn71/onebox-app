import { Facebook } from "fb";

const facebookClient = (accessToken: string): Facebook => {
  if (!accessToken) {
    throw new Error("Please provide access token")
  }
  
  const facebook = new Facebook({ appId: process.env.FACEBOOK_CLIENT_ID });
  facebook.setAccessToken(accessToken);

  return facebook;
}

export default facebookClient;