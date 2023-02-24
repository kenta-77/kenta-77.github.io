import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Box,Flex,Heading, Button, Text, Center} from "@chakra-ui/react";
import Image from 'next/image';
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <>
    <Layout> </Layout>
      <Center h='200px' mt='100px'>
        <Heading
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
        >Welcome to FaMo</Heading>
      </Center>
      <Center>
        <Text fontSize='3xl'>顔にモザイクをかけるアプリです</Text>
      </Center>
      <Box mt='50px' h='200px'>
        <Center>
          <Link href='/'>
            <Button>はじめる</Button>
          </Link>
        </Center>
      </Box>
    </>
  );
};

export default Home;