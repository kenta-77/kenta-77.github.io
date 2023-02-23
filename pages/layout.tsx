import Link from "next/link";
import { ReactNode } from "react";
import { Box,Flex,Heading, Spacer} from "@chakra-ui/react";
import Image from 'next/image';

const Layout = ({ children }: Props) => {
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' bg="teal.400" opacity="0.9" color="#ffff" h="50px">
    <Box pl='35px' as="a" href='http://localhost:3000/' _hover={{ color: "gray.100"}}>
      <Heading fontSize={38} fontWeight="bold">FaMo</Heading>
    </Box>
    <Spacer />
    <Box mr='25px' position="relative" w='38px' h="38px" >
      <Link href='https://github.com/kenta-77/Mosaic_app'>
        <Image src='/github-mark.png' alt="" fill style={{ objectFit: 'contain'}}/>
      </Link>
    </Box>
  </Flex>
  );
};

type Props = {
  children?: ReactNode;
};

export default Layout;