import { Flex, Heading, Button, Link as ChakraLink } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const fetchMessages =() => {
  console.log("req going on 'messages'")
  
  return axios
    .get("/api/twitter/messages")
    .then(({ data }) => data)
}

const fetchMentions = () => {
  return axios
    .get("/api/twitter/mentions")
    .then(({ data }) => data)
}

const MentionsBox = () => {
  // const { data: twitterMessages, status: twitterMessagesStatus } = useQuery("twitterMessages", fetchMessages);
  // const { data: twitterMentions, status: twitterMentionsStatus } = useQuery("twitterMentions", fetchMentions);

  // console.log(twitterMessages, twitterMentions);
  // console.log(twitterMessagesStatus)

  const { data, isLoading } =useQuery("twitterMessages", fetchMessages); 

  if (isLoading) return <Spinner />
  
  return <div>
     <pre>{JSON.stringify(data, null, 2)}</pre> 
  </div>
}

export default MentionsBox;