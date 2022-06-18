import { Flex, Image, Button, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Icon from "./icon";
import ConnectOAuthModal from "./connectOAuthModal";

const Sidebar = () => {
  const { data: session } = useSession();
  const { image: profile } = session;
  const twitterDisclosure = useDisclosure();
  const facebookDisclosure = useDisclosure();

  const oauthProviders = [
    { name: "twitter", disclosure: twitterDisclosure },
    { name: "facebook", disclosure: facebookDisclosure },
  ];

  console.log(profile);

  return (
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
            onClick={provider.disclosure.onOpen}
          >
            <Icon name={`bxl-${provider.name}`} />
          </Button>
        ))}
      </Flex>

      <Image src={profile as string} borderRadius="50%" width="32px" />

      {oauthProviders.map((provider) => (
        <ConnectOAuthModal
          providerId={provider.name}
          {...provider.disclosure}
        />
      ))}
    </Flex>
  );
};

export default Sidebar;
