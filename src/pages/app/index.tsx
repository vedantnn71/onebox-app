import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar";
import Loading from "../../components/loading";

const App: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <Loading />;
  }

  return (
    <Flex>
      <Sidebar />
    </Flex>
  );
};

export default App;