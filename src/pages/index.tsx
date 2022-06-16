import type { NextPage } from "next";
import { Button, Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Loading from "../components/loading";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return (
      <>
        <Button onClick={() => signIn()}>Hiya! Sign in </Button>
      </>
    );
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

  return (
    <>
      <Button onClick={() => signIn()}>Please sign in</Button>
    </>
  );
};

export default Home;
