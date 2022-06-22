import { Flex, Button, Image, Skeleton, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FC, Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Icon from "../icon";
import Link from "next/link";
import ConnectOAuthModal from "../connectOAuthModal";

interface NavigationProps {
  setInbox: Dispatch<
    SetStateAction<{
      show: boolean;
      provider: string;
    }>
  >;
  inbox: {
    show: boolean;
    provider: string;
  };
}

const Navigation: FC<NavigationProps> = ({ setInbox, inbox }) => {
  const { data: session } = useSession();
  const { image: profile } = session;
  const { data: twitterUser, isError } = useQuery(
    "fetchTwitterUser",
    async () => {
      const res = await axios.get("/api/twitter/$me");
      return res;
    }
  );
  const twitterDisclosure = useDisclosure();
  const facebookDisclosure = useDisclosure();
  const toast = useToast();

  const oauthProviders = [
    { name: "twitter", disclosure: twitterDisclosure },
    { name: "facebook", disclosure: facebookDisclosure },
  ];

  const handleProviderClick = (provider: { name: string; disclosure: any }) => {
    if (!twitterUser) provider.disclosure.onOpen();
    setInbox({ show: !inbox.show, provider: provider.name });
  };

  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        paddingY="8"
        paddingX="2"
        shadow="sm"
        boxShadow="md"
        backgroundColor="gray.100"
        borderRight="1px"
        borderColor="blackAlpha.300"
        maxWidth="fit-content"
        minHeight="100vh"
      >
        <Link href="/">
          <Button colorScheme="white" variant="ghost">
            <Icon name="bxs-chat" color="brand.500" size="3xl" />
          </Button>
        </Link>
        <Flex direction="column" color="gray.700" fontSize="2xl" gap="4">
          {oauthProviders.map((provider) => (
            <Button
              colorScheme="white"
              variant="ghost"
              onClick={() => handleProviderClick(provider)}
            >
              <Icon name={`bxl-${provider.name}`} />
            </Button>
          ))}
        </Flex>

        <Image src={profile} borderRadius="50%" width="32px" />
      </Flex>

      {oauthProviders.map((provider) => (
        <ConnectOAuthModal
          providerId={provider.name}
          {...provider.disclosure}
        />
      ))}

      {isError &&
        toast({
          status: "error",
          title: "Error occured while getting your mentions and messages",
        })}
    </>
  );
};

export default Navigation;
