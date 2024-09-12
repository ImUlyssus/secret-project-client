import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, Box, Flex, Center, Button, SimpleGrid, ModalBody, ModalContent, ModalFooter, Modal, ModalOverlay, Grid, Spinner } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrderHistory = () => {
  const effectRan = useRef(false);
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [orderTickets, setOrderTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketsShowingModal, setTicketsShowingModal] = useState(false);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  const copy = async (userId, purchaseDate) => {
    await navigator.clipboard.writeText(userId + "|" + purchaseDate);
    toast.success("Copied Order ID!")
  }

  const getAllTickets = async ({ userId, purchaseDate }) => {
    setIsLoading(true);

    try {
      let response;
      response = await axiosPrivate.get('/newTickets/getorder', { params: { userId: userId, purchaseDate: purchaseDate } });

      if (response.data.success) {
        setOrderTickets(response.data.ticketIds);
      } else {
        toast.error("Error while fetching data!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching data!");
    } finally {
      setIsLoading(false);
      setTicketsShowingModal(true); // Show the modal immediately after data fetching
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (effectRan.current === true) {
      const getUser = async () => {
        try {
          const response = await axiosPrivate.get(`/orders/byid/${auth.user.userId}`, {
            signal: controller.signal
          });
          isMounted && setOrders(response.data)
        } catch (err) {
          console.log(err);
          // navigate('/login', { state: { from: location }, replace: true });
        }
      }
      getUser();

    }
    return () => {
      isMounted = false;
      controller.abort();
      effectRan.current = true;
    }
  });
  // const handleOrders = () => {
  //   console.log(orders);
  // }
  return (
    <div>
      <Modal isOpen={isLoading} isCentered>
        <ModalContent h='200px' w='200px' bg='#262626' color='white'>
          <ModalBody>
            <Box mt='30%'>
              <Center><Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='#beef00' size='xl' /></Center>
              <Center fontSize='xl' as='b'>Loading</Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={ticketsShowingModal}>
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
          <ModalBody>
            <Center as='b' fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }} my='2'>Tickets from this order.</Center>
            <Box borderWidth="1px" borderRadius="lg" h="200px" overflowY="scroll" border='2px solid #beef00' m='2'>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)"
                }}
                gap={5}
                m='3'
              >
                {orderTickets.map((ticket, index) => (
                  <Center key={index}>
                    <Box border='white solid 1px' py='2' px='4' borderRadius='md'>{ticket}</Box>
                  </Center>
                ))}
              </Grid>
              <br /><br />
            </Box>
          </ModalBody>
          <ModalFooter color='black'>
            <Button
              bg={'#beef00'}
              onClick={() => setTicketsShowingModal(false)}
              cursor={'pointer'}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Center fontSize={['30px', '35px']} as='b' color='white' mb='3'>
        Order History
      </Center>
      <Divider />
      <Box mt='4'>
        {orders.length === 0 ? <Center my='40vh' fontSize='xl' as='b' color='white'>You do not have any order.</Center> :
          <>
            <SimpleGrid columns={[1, 2, 2, 4]} spacing="1rem">

              {orders.sort((a, b) => b.id - a.id).map(order => (
                <Box key={order.id} bg='#1A202C' borderRadius='lg' p='1rem' color='white'>
                  <Flex justifyContent='space-between'>
                    <Box>Order Date: </Box>
                    <Box>{formatDate(order.purchaseDate)}</Box>
                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Box>Total Tickets: </Box>
                    <Box>{order.totalTickets}</Box>
                  </Flex>
                  <Flex justifyContent='space-between' mb='4'>
                    <Box>Price: </Box>
                    <Box>${2 * order.totalTickets}</Box>
                  </Flex>
                  <Divider />
                  <Flex mt='4' justifyContent='space-evenly'>
                    <Button size='sm' color='black' onClick={() => copy(order.userId, order.purchaseDate)}>Copy Order ID</Button>
                    <Button size='sm' color='black' bg='#beef00' onClick={() => getAllTickets({ userId: order.userId, purchaseDate: order.purchaseDate })}>See All Tickets</Button>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </>
        }
      </Box>
      <ToastContainer />
    </div>
  )
}

export default OrderHistory