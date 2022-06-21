import { Flex } from "@chakra-ui/react";
import Navigation from "./navigation";
import Inbox from "./inbox";

const Sidebar = () => {

  return (
    <Flex direction="row">
      <Navigation />
      <Inbox />
    </Flex>
  );
};

export default Sidebar;
