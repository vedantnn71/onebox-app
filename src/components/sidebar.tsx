import { Flex, Image, Link as ChakraLink } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Icon from "./icon";

const Sidebar = () => {
  const { data: session } = useSession();
  const { image: profile, name } = session;

  return (
    <Flex
      direction="column"
      justify="space-between"
      paddingY="8"
      paddingX="6"
      shadow="sm"
      boxShadow="md"
      backgroundColor="gray.100"
      borderRight="1px"
      borderColor="blackAlpha.300"
      maxWidth="fit-content"
      minHeight="100vh"
    >
      <Link href="/">
        <ChakraLink>
          <Icon name="bxs-chat" color="brand.500" size="3xl" />
        </ChakraLink>
      </Link>
      <Flex direction="column" color="gray.700" fontSize="2xl" gap="4">
        <Link href="/">
          <ChakraLink>
            <Icon name="bxs-conversation" active />
          </ChakraLink>
        </Link>
        <Link href="/setup/twitter">
          <ChakraLink>
            <Icon name="bxl-twitter" />
          </ChakraLink>
        </Link>
        <Link href="/setup/instagram">
          <ChakraLink href="/setup/instagram">
            <Icon name="bxl-instagram-alt" />
          </ChakraLink>
        </Link>
        <Icon name="bx-plus" />
      </Flex>

      <Image
        src={profile as string}
        borderRadius="50%"
        width="32px"
      />
    </Flex>
  );
};

export default Sidebar;
