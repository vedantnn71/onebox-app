import type { NextPage } from "next";
import { Button, Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Loading from "../components/loading";

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <Button onClick={() => signIn()}>Hiya! Sign in </Button>
      </>
    )
  }

  if (session) {
    const { image: profile, name } = session.user;

    console.log(session)

    return (
      <Box>
        <Heading>Signed in as {name}</Heading>
        <img src={profile} />
      </Box>
    )
  }

  return (
    <>
      <Button onClick={() => signIn()}>Please sign in</Button>
    </>
  )
};

export default Home;
