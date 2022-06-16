import { Flex, Spinner } from "@chakra-ui/react";
import Icon from "./icon";

const Loading = () => (
  <Flex
    direction="column"
    width="100vw"
    height="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <Icon name="bxs-chat" color="brand.500" size="8xl" />
    <Spinner thickness="4px" color="brand.500" size="md" />
  </Flex>
);

export default Loading;
