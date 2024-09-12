import React, { useEffect, useState, useRef } from 'react';
import {
  Flex, Box, Text, Center, Image, Button, Grid,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Modal
} from '@chakra-ui/react';

import { QuestionIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import TwitterIcon from '../icons/twitter.png';
import FacebookIcon from '../icons/facebook.png';
import InstagramIcon from '../icons/instagram.png';
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
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const effectRan = useRef(false);
  const axiosPrivate = useAxiosPrivate();
  const [listOfNewTickets, setListOfNewTickets] = useState([]);
  const [listOfOldTickets, setListOfOldTickets] = useState([]);
  const [user, setUser] = useState({});
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profilePictures = [ProfilePicture1, ProfilePicture2, ProfilePicture3, ProfilePicture4, ProfilePicture5, ProfilePicture6, ProfilePicture7, ProfilePicture8, ProfilePicture9, ProfilePicture10, ProfilePicture11, ProfilePicture12, ProfilePicture13, ProfilePicture14, ProfilePicture15, ProfilePicture16];
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const profilePictureIndex = user.randomizedProfilePicture - 1;
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (effectRan.current === true) {
      const getUser = async () => {
        try {
          const user = await axiosPrivate.get(`/users/byid/${auth.user.userId}`, {
            signal: controller.signal
          });
          // const newTickets = await axiosPrivate.get(`/newtickets/byid/${auth.user.userId}`, {
          //   signal: controller.signal
          // });
          // const oldTickets = await axiosPrivate.get(`/oldTickets/byid/${auth.user.userId}`, {
          //   signal: controller.signal
          // });
          // console.log(newTickets.data.ticketIds);
          // setListOfNewTickets(newTickets.data.ticketIds);
          // setListOfOldTickets(oldTickets.data.ticketIds);
          isMounted && setUser(user.data)
        } catch (err) {
          console.log(err);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
      getUser();

    }
    return () => {
      isMounted = false;
      controller.abort();
      effectRan.current = true;
    }
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (

    <div style={{ marginBottom: '-1rem' }}>
      <Center>
        <Box w={{ base: '100%', md: '80%', lg: '45%' }}>
          <Flex h={['160px', '150px']}>
            <Box ml='1rem'>
              <Image
                // https://bit.ly/sage-adebayo
                src={(user.picturePath == null || user.picturePath == '') ? profilePictures[profilePictureIndex] : user.picturePath}
                alt='User Profile'
                w={['110px', '150px']}
                h={['110px', '150px']}
                borderRadius='10%'
                border='#beef00 solid 3px'
                ml='2'
                mt={['1rem', '0']}
                objectFit="cover" // Crop the image to fit the container
                objectPosition="center" />

            </Box>
            <Box ml={['2', '4']} mt={['4.2rem', '4.5rem']}>
              <Box as='b' fontSize={['md', 'xl']} color='white' pt='2'>
                {user.userName}
              </Box>
              <Box pb='1' w={['10rem', '13rem']} fontSize={['sm', '']} color='white' mt='2'>
                Your profile is {user.isPrivate ? 'private ' : 'public '}
                <QuestionIcon mb='1' onClick={onOpen} cursor='pointer' />
              </Box>
            </Box>
          </Flex>
          <Box bg='black' mt={['-6rem', '-5.5rem']} borderTopRadius='15px'>
            <SocialMediaLink twitter={user.twitter} facebook={user.facebook} instagram={user.instagram} />
          </Box>
          <Box bg='#1A202C' pb='1rem' borderBottomRadius='20px' mb='1rem'>
            <Box pt='1.5rem'>
              <Flex flexDir="column" w="100%" mb={{ base: '4', md: '0' }}>
                <Box borderWidth="1px" borderRadius="lg" h="300px" overflowY="scroll" border='2px solid #beef00' m='2'>
                  <Flex justifyContent="center" alignItems="center" mb='1rem' bg='#F6E05E' py='2' px='4' position="sticky" top="0" zIndex='2'>
                  <Text fontSize={{ base: 'sm', md: 'sm', lg: 'lg' }} mr={['1', '3']} pt={['1', '1']} as='b'>Recently Bought</Text>
                    <Text mx='2' p='2' border='1px solid black' borderRadius='md' fontWeight='bold' fontSize={{ base: 'xs', md: 'sm', lg: 'lg' }}>{auth.authNewTickets.length}</Text>
                    <Text fontSize={{ base: 'sm', md: 'sm', lg: 'lg' }} mr={['1', '3']} pt={['1', '1']} as='b'>Tickets</Text>
                  </Flex>
                  {auth.authNewTickets.length === 0 ? (
                      <Box mt='10vh'>
                        <Center as='b' fontSize='lg' color='white'>
                          You do not have any tickets
                        </Center>
                      </Box>
                    ) : (
                  <Grid
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)"
                    }}
                    gap={8}
                    m='3'
                  >
                    
                      {auth.authNewTickets.map((ticket, key) => {
                        return <CustomInputGroup ticketId={ticket.ticketId} key={key} />;
                      })}

                  </Grid>
                  )}
                </Box>
              </Flex>
            </Box>
            {/* <Box pt='1.5rem'>
              <Flex flexDir="column" w="100%" mb={{ base: '4', md: '0' }}>
                <Box borderWidth="1px" borderRadius="lg" h="300px" overflowY="scroll" border='2px solid #beef00' m='2'>
                  <Flex justifyContent="center" alignItems="center" mb='1rem' bg='#F6E05E' py='2' px='4' position="sticky" top="0" zIndex='2'>
                  <Text mx='2' p='2' border='1px solid black' borderRadius='md' fontWeight='bold' fontSize={{ base: 'xs', md: 'sm', lg: 'lg' }}>{listOfOldTickets.length}</Text>
                    <Text fontSize={{ base: 'sm', md: 'sm', lg: 'lg' }} mr={['1', '3']} pt={['1', '1']} as='b'>Old Tickets</Text>
                  </Flex>
                  {listOfOldTickets.length === 0 ? (
                      <Box mt='10vh'>
                        <Center as='b' fontSize='lg' color='white'>
                          You do not have any tickets
                        </Center>
                      </Box>
                    ) : (
                  <Grid
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)"
                    }}
                    gap={8}
                    m='3'
                  >
                    
                      {listOfOldTickets.map((ticket, key) => {
                        return <CustomInputGroup ticketId={ticket} key={key} />;
                      })}

                  </Grid>
                    )}
                </Box>
              </Flex>
            </Box> */}
            <Flex justifyContent="center" py='2'>
              <Text fontSize={['md', 'lg']} pt='1' color='white'>End of Profile</Text>
            </Flex>
          </Box>

        </Box>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
            <ModalHeader>{isSwitchOn ? 'Private Profile' : 'Public Profile'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <Text>{user.isPrivate ? "If your profile is private, people cannot see the tickets you bought. Currently, your profile is private. You can change it to public in setting." :
                "If your profile is public, people can see the tickets you bought. Currently, your profile is public. You can change it to private in setting."}</Text>
            </ModalBody>

            <ModalFooter>
              <Button bg='#beef00' color='black' mr={3} onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
      <ToastContainer />
    </div>
  )
}
function CustomInputGroup({ ticketId }) {
  return (
    <Box
      mr="0"
      fontWeight="bold"
      userSelect="none"
      pointerEvents="none"
      textAlign="center"
      border='1px solid #beef00'
      p='1'
      bg='#F6F1E9'
      borderRadius='lg'
    >
      {ticketId}
    </Box>
  );
}

const SocialMediaLink = ({ twitter, facebook, instagram }) => {
  const openSocialMediaProfile = (url) => {
    if(url=='' || url == null){
      return toast.error("You have not connected to any social media yet. You can change it in the setting.")
    }else{
      window.open(url, '_blank');
    }
  };

  return (
    <Flex pt={['5.5rem', '7rem']} pb={'3'} mx='4' justifyContent='space-evenly'>
      <a target="_blank" rel="noopener noreferrer" onClick={() => openSocialMediaProfile(twitter)}>
        <Flex bg='white' p={['0', '1']} borderRadius={['5px', '10px']} alignItems='center' cursor='pointer'>
          <img src={TwitterIcon} alt="Icon" width="30px" height="30px" />
          <Text as='b' mx={['1', '2']} fontSize={['sm', 'md']}>Twitter</Text>
        </Flex>
      </a>

      <a target="_blank" rel="noopener noreferrer" onClick={() => openSocialMediaProfile(facebook)}>
        <Flex bg='white' p={['0', '1']} borderRadius={['5px', '10px']} alignItems='center' cursor='pointer'>
          <img src={FacebookIcon} alt="Icon" width="30px" height="30px" />
          <Text as='b' mx={['1', '2']} fontSize={['sm', 'md']}>Facebook</Text>
        </Flex>
      </a>
      <a target="_blank" rel="noopener noreferrer" onClick={() => openSocialMediaProfile(instagram)}>
        <Flex bg='white' p={['0', '1']} borderRadius={['5px', '10px']} alignItems='center' cursor='pointer'>
          <img src={InstagramIcon} alt="Icon" width="30px" height="25px" />
          <Text as='b' mx={['1', '2']} fontSize={['sm', 'md']}>Instagram</Text>
        </Flex>
      </a>
    </Flex>
  );
};

export default Profile;
