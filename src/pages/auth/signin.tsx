import { getProviders, signIn } from "next-auth/react";
import { FC } from "react";
import Icon from "../../components/icon";
import Link from "next/link";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import {
  Flex,
  Heading,
  Link as ChakraLink,
  Image,
  Button,
} from "@chakra-ui/react";

type Provider = {
  name?: string;
  id?: string;
};

interface SignInProps {
  providers: Provider[];
}

const getIconColor = (social: string) => {
  if (social === "twitter") return "blue.500";
  if (social === "facebook") return "blue.700";

  return "gray.800";
};

const SignIn: FC<SignInProps> = ({ providers }) => {
  return (
    <Flex
      direction="column"
      padding="4"
      justify="center"
      align="center"
      backgroundImage="/background.svg"
    >
      <Flex
        justify="center"
        align="center"
        alignItems="center"
        height="100vh"
        margin="auto"
      >
        <Flex
          direction="column"
          padding="1.5rem"
          background="whiteAlpha.800"
          boxShadow="0px 4px 134px rgba(47, 47, 47, 0.15)"
          borderRadius="md"
          gap="1rem"
          justify="space-between"
          align="center"
          alignContent="center"
          maxWidth="content-fit"
          paddingX="lg"
          paddingY="12"
          height="80vh"
          width={{ sm: "75vw", lg: "40vw" }}
          backdropFilter="blur(4px)"
        >
          <Flex direction="row">
            <Image src="/logo.svg" width={{ sm: "2.5rem", lg: "3rem" }} />
            <Heading
              color="brand.500"
              fontWeight="bold"
              size={{ sm: "lg", lg: "xl" }}
            >
              Onebox
            </Heading>
          </Flex>

          <Flex direction="column" gap="1rem">
            {Object.values(providers).map((provider) => (
              <Flex justify="center" key={provider?.name}>
                <Button
                  variant="outline"
                  colorScheme="gray"
                  gap="1"
                  fontWeight="550"
                  size="md"
                  minW="100%"
                  padding={{ sm: "3", lg: "5" }}
                  onClick={() => signIn(provider?.id, { callbackUrl: "/" })}
                >
                  <Icon
                    name={`bxl-${provider?.id}`}
                    color={getIconColor(provider?.id)}
                    padding="0"
                  />
                  Sign in with {capitalizeFirstLetter(provider?.id)}
                </Button>
              </Flex>
            ))}
          </Flex>

          <Heading color="gray.500" size="sm">
            Made by{" "}
            <Link about="_blank" href="https://vedantnandwana.me">
              <ChakraLink>Vedant Nandwana</ChakraLink>
            </Link>
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SignIn;
export { getServerSideProps };
