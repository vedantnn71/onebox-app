import { getProviders, signIn } from "next-auth/react";
import { FC } from "react";
import {
  Flex,
  Box,
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

const SignIn: FC<SignInProps> = ({ providers }) => {
  return (
    <Flex direction="column" padding="4" justify="start" align="left">
      <Flex direction="row" justify="start" align="left">
        <Image src="/logo.svg" width="2rem" />
        <Heading color="brand.500" size="lg" fontWeight="bold">Onebox</Heading>
      </Flex>

      {Object.values(providers).map((provider) => (
        <Flex key={provider?.name}>
          <Button onClick={() => signIn(provider?.id)}>
            Sign in with {provider?.name}
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};

const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SignIn;
export { getServerSideProps };
