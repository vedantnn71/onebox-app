import {
  Flex,
  Box,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  keyframes,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FC, useEffect, useState } from "react";
import { decode } from "html-entities";
import Twemoji from "react-twemoji";
import Icon from "../icon";
import axios from "axios";

const LoadingSkeleton = () => (
  <Flex
    direction="column"
    backgroundColor="gray.100"
    borderRight="1px"
    borderColor="blackAlpha.300"
    maxW="fit-content"
    minH="100vh"
  >
    <Flex
      background="whiteAlpha.900"
      paddingY="2"
      paddingX="4"
      alignItems="center"
      justify="space-between"
      borderBottom="1px"
      borderColor="blackAlpha.300"
      minW="max-content"
      gap="4"
    >
      <Skeleton>
        <Heading fontWeight="bold" size="md" color="blackAlpha.800">
          Loading
        </Heading>
      </Skeleton>

      <SkeletonCircle />
    </Flex>
    <Flex direction="column" overflowY="scroll" overflowX="hidden">
      {[1, 2, 3, 4].map((_, index) => (
        <Flex
          background="whiteAlpha.900"
          paddingY="4"
          paddingX="4"
          alignItems="center"
          borderBottom="1px"
          borderColor="blackAlpha.300"
          gap="2"
          minW="max-content"
          key={`${index}-loading-reply`}
        >
          <SkeletonCircle mb="2" size="10" />
          <Flex direction="column">
            <Twemoji options={{ className: "twemoji-small" }}>
              <Skeleton>
                <Heading fontWeight="bold" size="xs">
                  Example User
                </Heading>
              </Skeleton>
              <Skeleton>
                <Heading fontWeight="medium" size="xs" noOfLines={1} my="2">
                  Loading your replies
                </Heading>
              </Skeleton>
            </Twemoji>
          </Flex>
        </Flex>
      ))}
    </Flex>
  </Flex>
);

const fetchTwitterMentions = async () => {
  const { data } = await axios.get("/api/twitter/mentions");
  return data;
};

interface InboxProps {
  provider?: "twitter" | "facebook";
}

const Inbox: FC<InboxProps> = ({ provider = "twitter" }) => {
  const { data, isLoading } = useQuery("twitterMentions", fetchTwitterMentions);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (isLoading) return;

    data.map((reply) => setReplies([...replies, reply]));
  }, [data]);

  if (isLoading) {
    return <LoadingSkeleton />;
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
          <Heading fontWeight="bold" size="md" color="blackAlpha.800">
            Inbox
          </Heading>
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
                  <Heading fontWeight="bold" size="xs">
                    {reply?.user?.name}
                  </Heading>
                  <Heading fontWeight="medium" size="xs" noOfLines={1}>
                    {decode(reply?.text.replace("@vedantnn7", ""))}
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
