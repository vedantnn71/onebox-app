import { ObjectId } from "mongodb";

interface Account {
  provider: string;
  type: string;
  providerAccountId?: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  userId: ObjectId;
  expires_at: number;
  oauth_token?: string;
  oauth_token_secret?: string;
}

export default Account;