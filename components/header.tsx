import { Box,Flex,Heading, Spacer, Text} from "@chakra-ui/react";
import Image from 'next/image';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2' bg="teal.400" opacity="0.9" color="#ffff" h="50px">
        <Box pl='35px' _hover={{ color: "gray.100"}}>
          <Link href='/top'>
            <Heading fontSize={38} fontWeight="bold">FaMo</Heading>
          </Link>
        </Box>
        <Spacer />
        <Box w='50px'>
          <Link href='/top'>
          <FontAwesomeIcon icon={faHouse} fontSize='30px' color='RGBA(0, 0, 0, 0.80)' />
          </Link>
        </Box>
        <Box w='50px'>
          <Link href='/'>
            <FontAwesomeIcon fontSize='30px' icon={faWandMagicSparkles} color='RGBA(0, 0, 0, 0.80)' />
          </Link>
        </Box>
        <Box mr='25px' position="relative" w='38px' h="38px" >
          <Link href='https://github.com/kenta-77/Mosaic_app'>
            <Image src='/github-mark.png' alt="" fill style={{ objectFit: 'contain'}}/>
          </Link>
        </Box>
      </Flex>
    </>
  )
}