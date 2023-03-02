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
        <Image
          src='/back_image.jpg'
          alt='test_image'
          width="1300"
          height="300"
        />
      </Center>
      <Center>
        <Heading
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
          className="h2"
        >Welcome to FaMo</Heading>
        </Center>
      <Center>
        <Text fontSize='3xl'>顔にモザイクをかけるアプリです</Text>
      </Center>
      <Box mt='50px' h='200px'>
        <Center>
          <Link href='/main'>
            <Button>START</Button>
          </Link>
        </Center>
      </Box>
    </>
  );
};

export default Home;