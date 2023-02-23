import { Box,Flex,Heading, Spacer, Text} from "@chakra-ui/react";
import Image from 'next/image';
import Link from "next/link";
import {Header} from "../components/header";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  )
}