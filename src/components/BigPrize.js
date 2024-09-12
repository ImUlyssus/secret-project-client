import { Box, Stack, Heading, Text, Image, Divider, Flex, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom'

import ProfilePicture1 from '../assets/1.png';
import ProfilePicture2 from '../assets/2.png';
import ProfilePicture3 from '../assets/3.png';
import ProfilePicture4 from '../assets/4.png';
import ProfilePicture5 from '../assets/5.png';
import ProfilePicture6 from '../assets/6.png';
import ProfilePicture7 from '../assets/7.png';
import ProfilePicture8 from '../assets/8.png';
import ProfilePicture9 from '../assets/9.png';
import ProfilePicture10 from '../assets/10.png';
import ProfilePicture11 from '../assets/11.png';
import ProfilePicture12 from '../assets/12.png';
import ProfilePicture13 from '../assets/13.png';
import ProfilePicture14 from '../assets/14.png';
import ProfilePicture15 from '../assets/15.png';
import ProfilePicture16 from '../assets/16.png';
import {PrizePercentage} from "../utils/constants/constants.js";

const Card = ({ prizeMoney, imageUrl, userName, ticketNumber, userId }) => {
  let navigate = useNavigate();

  return (
    <Box
      w={{ md: "30%", lg: "25%" }}
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="0 0 20px 10px rgba(26, 32, 44, 0.3)"
      bg="#1A202C"
      color="#F7FAFC"
      borderColor="#657a00"
    >
      <Stack spacing={4} p={6}>
        <Flex justifyContent="center" alignItems="center">
          <Heading fontSize="xl" fontWeight="bold" bg='yellow' color='black' p='2' borderRadius='md'>
            {prizeMoney}
          </Heading>
        </Flex>
        <Divider />
        <Flex justifyContent="center" alignItems="center" h="175px">
          <Box onClick={() => { navigate(`/otherprofile/${userId}`) }} cursor="pointer">
            <Image borderRadius="full" boxSize="150px" objectFit="cover" src={imageUrl} alt={userName} />
            <Center mt='1'>
              <Text as='b' size={['sm', 'lg']} mt='1'>{userName}</Text>
            </Center>
          </Box>
        </Flex>
        <Divider />
        <Box textAlign="center">
          <Text as="b" fontSize={['sm', 'lg']}>
            {ticketNumber}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

const BigPrize = ({round, totalPrizeMoney}) => {
  const [listOfWinners, setListOfWinners] = useState([]);
  // const [totalPrizeMoney, setTotalPrizeMoney] = useState(100);
  // const [totalTickets, setTotalTickets] = useState(100);
  const profilePictures = [ProfilePicture1, ProfilePicture2, ProfilePicture3, ProfilePicture4, ProfilePicture5, ProfilePicture6, ProfilePicture7, ProfilePicture8, ProfilePicture9, ProfilePicture10, ProfilePicture11, ProfilePicture12, ProfilePicture13, ProfilePicture14, ProfilePicture15, ProfilePicture16];
  
  useEffect(() => {
    axios.get(`/winningtickets/${round}`)
      .then((response) => {
        const ticketData = response.data;
        if(ticketData){
          const userIds = [...new Set(ticketData.map((item) => item.userId))];
        // Fetch user data for the extracted user IDs
        const userPromises = userIds.map((id) => axios.get(`/users/byid/${id}`));


        Promise.all(userPromises)
          .then((userResponses) => {
            const userData = userResponses.map((userResponse) => userResponse.data);

            // Map the filtered tickets data with user information
            const enrichedData = ticketData.map((item) => {
              const user = userData.find((userItem) => userItem.userId === item.userId);
              return {
                ...item,
                userName: user?.userName || '',
                picturePath: user?.picturePath || '',
                randomizedProfilePicture: user?.randomizedProfilePicture,
              };
            });

            setListOfWinners(enrichedData);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });

  }, [round]);
  const filteredWinners = listOfWinners
        .filter((value) => [1, 2, 3].includes(value.prize))
        .sort((a, b) => a.prize - b.prize);

  return (
    <>
    <Center>
    <Text py='3' px='10' mb='2' bg='black' color='white' borderRadius={'md'} fontSize='xl' fontWeight='bold'>Top Winners</Text>
    </Center>
    <Stack direction={{ base: "column", md: "row" }} spacing="8" justify="center" mb="4">
      {listOfWinners && filteredWinners.map((value, key) => {
        let prizeMoney = "";
        let userId = value.userId;
        let userName = value.userName;
        let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;
        let ticketNumber = value.ticketId;
        if (value.prize === 1) {
          prizeMoney = "$" + (totalPrizeMoney * PrizePercentage.firstPrize).toFixed(2);
        } else if (value.prize === 2) {
          prizeMoney = "$" + (totalPrizeMoney * PrizePercentage.secondPrize).toFixed(2);
        } else if (value.prize === 3) {
          prizeMoney = "$" + (totalPrizeMoney * PrizePercentage.thirdPrize).toFixed(2);
        }
        return (
          <Card
            key={key}
            prizeMoney={prizeMoney}
            imageUrl={profilePic}
            userName={userName}
            ticketNumber={ticketNumber}
            userId={userId}
          />
        );
      })}
    </Stack>
    </>
  );
};

export default BigPrize;
