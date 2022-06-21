import { Flex, Heading, Button, Link as ChakraLink } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";

const fetchMentions = async () => {
  const { data } = await axios.get("/api/twitter/mentions");
  return data;
}

const Inbox = () => {
  const { data, isLoading } = useQuery("twitterMentions", fetchMentions);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Inbox;
