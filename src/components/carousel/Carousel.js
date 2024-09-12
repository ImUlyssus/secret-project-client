import React from "react";
import { Box, Center, Text, Stack, Image } from "@chakra-ui/react";
import ConfusedPig from '../../assets/hiw.png';

const Carousel = () => {

  return (
    <Stack alignItems="center" borderRadius='xl' direction={{ base: "column", md: "row" }}>
      <Box w={['100%','50%']}>
      <Center pt='3' as='b' fontSize={'1.5rem'} color='white'>
        How to buy tickets?
      </Center>
      <Center>
      <Box w='50%' h='2px' bg='white' />
      </Center>
      {HTBT()}
      </Box>
      <Box w={['100%','50%']}>
      <Center pt='3' as='b' fontSize={'1.5rem'} color='white'>
        How it works?
      </Center>
      <Center>
      <Box w='50%' h='2px' bg='white' />
      </Center>
      {HIW()}
      </Box>
    </Stack>
  );
};
const HTBT = () => {
  return (
    <Box p='3' bg='black' borderRadius='md' mt='2' color='white' h={{md:'520px',lg:'330px'}}>
      <Text color='white' mt='2'>
        You can buy tickets on our website using the following methods:
      </Text>
      <Box pl='4' mt='2'>
        <Text>
          1. Generate Your Own Tickets:
        </Text>
        <Text ml='4'>
          - Input 8 characters (4 letters + 4 numbers) to create a specific ticket.
        </Text>
        <Text ml='4'>
          - Each unique combination of characters corresponds to a unique ticket.
        </Text>
        <Text>
          2. System Generated Tickets:
        </Text>
        <Text ml='4'>
          - Input 0 to 5 characters to have the system generate tickets for you.
        </Text>
        <Text ml='4'>
          - System generates tickets using both random and range methods.
        </Text>
        <Text ml='4'>
          - If you enter 6 characters, system generates the remaining 100 tickets (From XXXXXX00 to XXXXXX99).
        </Text>
        <Text>
          3. Payment:
        </Text>
        <Text ml='4'>
          - You can make payment using two stable cryptocurrencies: USDT and BUSD.
        </Text>
      </Box>
    </Box>
  );
};

const HIW = () => {
  return (
    <Box px='3' py={{md:'45px',lg:'3'}} bg='black' borderRadius='md' mt='2' color='white' h={{md:'520px',lg:'330px'}}>
      <Center>
        <Image
          src={ConfusedPig}
          alt="Header Photo"
          style={{ borderRadius: "0 10px 10px 0" }}
          height='143px'
        />
      </Center>
      <Text color='white' mt='2'  ml='4'>
        Here is how our system works:
      </Text>
      <Box pl='4' mt='2'>
        <Text ml='4'>
          - Buy ticket(s)
        </Text>
        <Text ml='4'>
          - We will announce the winners when we reach our target sale
        </Text>
        <Text ml='4'>
          - Winners will receive their prize money in USDT
        </Text>
        <Text>
          What happen if user does not have a wallet address?
        </Text>
        <Text ml='4'>
          - We will postpone transferring prize money to the next round
        </Text>
        <br />
      </Box>
    </Box>
  );
};

export default Carousel;


// import React, { useState, useEffect } from "react";
// import { Image, Box, Button, Icon, Center } from "@chakra-ui/react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import Slide1 from '../../assets/slide1.jpeg';
// import Slide2 from '../../assets/slide2.jpeg';
// import Slide3 from '../../assets/slide3.jpeg';

// const images = [Slide1, Slide2, Slide3];

// const Carousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((activeIndex) => (activeIndex + 1) % images.length);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const prevSlide = () => {
//     setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
//   };

//   const nextSlide = () => {
//     setActiveIndex((activeIndex + 1) % images.length);
//   };

//   return (
//     <Center>
//     <Box
//       position="relative"
//       maxHeight={["250px","500px"]}
//       width="100%"
//       backgroundColor="#eee"
//       overflow="hidden"
//       m='4'
//       borderRadius={'xl'}
//     >
//       <Image
//         src={images[activeIndex]}
//         alt={`Carousel slide ${activeIndex}`}
//         objectFit="cover"
//         height="100%"
//         width="100%"
//       />

//       <Button
//         position="absolute"
//         top="50%"
//         left="0"
//         transform="translateY(-50%)"
//         variant="ghost"
//         onClick={prevSlide}
//       >
//         <Icon as={FaChevronLeft} />
//       </Button>
//       <Button
//         position="absolute"
//         top="50%"
//         right="0"
//         transform="translateY(-50%)"
//         variant="ghost"
//         onClick={nextSlide}
//       >
//         <Icon as={FaChevronRight} />
//       </Button>
//     </Box></Center>
//   );
// };

// export default Carousel;
