import type { NextPage } from "next";
import { Button, Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "../components/loading";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/signin");
  }

  if (session) {
    const { image: profile, name } = session.user;

    return (
      <Box>
        <Heading>Signed in as {name}</Heading>
        <img src={profile} />
      </Box>
    );
  }

  return <Loading />;
};

export default Home;
