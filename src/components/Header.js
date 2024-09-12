import { Box, Flex, Image, Text, Center, Button, Stack, Heading, useBreakpointValue } from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import { HomePageContent } from "./TextFile";
import HeaderPic from '../assets/homepage.png';
import HeaderPicLg from '../assets/homepagelg.png';
import useAuth from "../hooks/useAuth";

function HeaderBox() {
  const { auth } = useAuth();
  const imageSrc = useBreakpointValue({
    base: HeaderPicLg, // Image source for small screens (base)
    lg: HeaderPicLg, // Image source for large screens (lg)
    xl: HeaderPic,
  });
  return (
    <div style={{ backgroundColor: "#2D3748" }}>
      <Center>
        <Stack alignItems="center" w='95%' my='4' bg="#1A202C" borderRadius='xl' direction={{ base: "column", lg: "row" }}>
          <Box w={{ base: "100%", lg: "100%", xl: '2/3' }} color='white' px="1rem" p={4}>
            <Heading mb='4'>
              {HomePageContent.headerTitle}
            </Heading>
            <Text fontSize="lg" fontWeight="bold" mb='4'>
              <span dangerouslySetInnerHTML={{ __html: HomePageContent.headerText }} />
            </Text>
            <Button size={['sm', 'md']} m='2' bg='#beef00' color='black'>
              <Link to="/buyticket">
                BUY TICKETS
              </Link>
            </Button>
            {!auth.user &&
              <Button size={['sm', 'md']} m='2' bg='white' color='black'>
                <Link to="/register">
                  <Text fontWeight="bold">Register now</Text>
                </Link>
              </Button>
            }
          </Box>
          <Flex w={{ base: "100%", lg: "100%", xl: '1/3' }} justifyContent={{ base: "center", lg: "center", xl: "flex-end" }}>
            <Box >
              <Image
                src={imageSrc}
                alt="Header Photo"
                borderBottomRightRadius='20px'
                borderBottomLeftRadius={{ base: '20px', lg: '20px', xl: '0' }}
                borderTopLeftRadius='0'
                borderTopRightRadius={{ base: '0', lg: '0', xl: '20px' }}
              />
            </Box>
          </Flex>
        </Stack>
      </Center>
    </div>

  );
}

export default HeaderBox;
