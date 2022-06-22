import { Flex, Heading, Button, Image, Link as ChakraLink } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FC, useEffect, useState } from "react";
import Loading from "../loading";
import Twemoji from "react-twemoji";
import Icon from "../icon";
import axios from "axios";

const fetchTwitterMentions = async () => {
  const { data } = await axios.get("/api/twitter/mentions");
  return data;
}

interface InboxProps {
  provider?: "twitter" | "facebook"
}

const Inbox: FC<InboxProps> = ({ provider = "twitter" }) => {
  const { data, isLoading } = useQuery("twitterMentions", fetchTwitterMentions);
  const [replies, setReplies] = useState([])

  useEffect(() => {
    if (isLoading) return
    
    data.map(reply => setReplies([...replies, reply]));
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <Flex
      direction="column"
      justify="space-between"
      backgroundColor="gray.100"
      borderRight="1px"
      borderColor="blackAlpha.300"
      maxW="fit-content"
    >
      <Flex direction="column" maxH="100vh">
        <Flex 
          background="whiteAlpha.900"
          paddingY="2"
          paddingX="6"
          alignItems="center"
          justify="space-between"
          borderBottom="1px"
          borderColor="blackAlpha.300"
          minW="max-content"
        >
          <Heading fontWeight="bold" size="md" color="blackAlpha.800">Inbox</Heading>
          <Icon name="bx-filter" size="24px" paddingX="0" />
        </Flex>
        <Flex
          direction="column"
          justify="space-between"
          overflowY="scroll"
          overflowX="hidden"
        >
          {data.map((reply, id) => (
            <Flex
              background="whiteAlpha.900"
              paddingY="4"
              paddingX="4"
              alignItems="center"
              borderBottom="1px"
              borderColor="blackAlpha.300"
              gap="2"
              minW="fit-content"
              key={`${id}-twitter-replies`}
            >
              <Image 
                src={reply.user.profile_image_url}
                height="fit-content" 
                width="fit-content" 
                borderRadius="50%"
              />
              <Flex direction="column"> 
                <Twemoji options={{ className: "twemoji-small" }}>    
                  <Heading fontWeight="bold" size="xs">{reply?.user?.name}</Heading>
                  <Heading fontWeight="medium" size="xs" noOfLines={1}>
                    {reply?.text.replace("@vedantnn7", "")}
                  </Heading>
                </Twemoji>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Inbox;
export type { InboxProps };