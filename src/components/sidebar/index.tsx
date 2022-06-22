import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Navigation from "./navigation";
import Inbox from "./inbox";

const Sidebar = () => {
  const [inbox, setInbox] = useState<{
    show: boolean;
    provider: "twitter" | "facebook";
  }>({ show: false, provider: "twitter" });

  return (
    <Flex direction="row" maxH="100vh">
      <Navigation inbox={inbox} setInbox={setInbox} />
      {inbox.show && <Inbox provider={inbox.provider} />}
    </Flex>
  );
};

export default Sidebar;
