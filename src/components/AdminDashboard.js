import { Center, Divider, Box, Flex, Text, Grid, Textarea, Button, Modal, ModalBody, ModalFooter, ModalContent, ModalOverlay, ModalHeader, Select, GridItem, Image, FormControl, Input } from '@chakra-ui/react';
import { colors } from '../Theme';
import { useEffect, useState, useRef } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

import WinnerRewards from './AdminDashboard/WinnerRewards';
import FindUser from './AdminDashboard/FindUser';
import Refunds from './AdminDashboard/Refunds';
import ContactUs from './AdminDashboard/ContactUs';
const AdminDashboard = () => {
    const effectRan = useRef(false);
    const axiosPrivate = useAxiosPrivate();
    const [totalPreviousRoundTickets, setTotalPreviousRoundTickets] = useState(0);
    const [totalCurrentRoundTickets, setTotalCurrentRoundTickets] = useState(0);
    const [allNotifications, setAllNotifications] = useState([]);
    const [currentRefund, setCurrentRefund] = useState();
    const [previousRound, setPreviousRound] = useState();
    const [allRefunds, setAllRefunds] = useState([]);
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (effectRan.current === true) {
            const getTotalTickets = async () => {
                try {
                    
                    const notifications = await axiosPrivate.get(`/notifications/getallnotifications`, {
                        signal: controller.signal
                    });
                    const refunds = await axiosPrivate.get(`/refunds/getallrefunds`, {
                        signal: controller.signal
                    });
                    const messages = await axiosPrivate.get(`/contactus/getmessages`,{
                        signal: controller.signal
                    });
                    const getRound = await axiosPrivate.get(`/roundsandprizes/getround`,{
                        signal: controller.signal
                    });
                    setPreviousRound(getRound.data);
                    const previousRoundTickets = await axiosPrivate.get(`/oldtickets/gettotaltickets/${previousRound}`, {
                        signal: controller.signal
                    });
                    const currentRoundTickets = await axiosPrivate.get(`/newtickets/gettotaltickets`, {
                        signal: controller.signal
                    });
                    setAllNotifications(notifications.data);
                    setAllRefunds(refunds.data);
                    setAllMessages(messages.data.messages)
                    setTotalCurrentRoundTickets(currentRoundTickets.data.totalTickets);
                    let currentRefund = localStorage.getItem('currentRefund');
                    currentRefund && setCurrentRefund(currentRefund);
                    isMounted && setTotalPreviousRoundTickets(previousRoundTickets.data)
                } catch (err) {
                    console.log(err);
                    //   navigate('/login', { state: { from: location }, replace: true });
                }
            }
            getTotalTickets();

        }
        return () => {
            isMounted = false;
            controller.abort();
            effectRan.current = true;
        }
    }, [previousRound]);

    return (
        <>
            <Center fontSize={['30px', '35px']} as='b' color='white' mb='3'>
                Admin Dashboard
            </Center>
            <Divider />
            <Flex bg={colors.boxColor} fontSize={['20px', '30px']} m='2' p='3' as='b' color='white' borderRadius='md' justifyContent='space-between'>
                <Text>
                Current Round({previousRound+1}) Total Sale:
                </Text>
                <Text>
                    ${2 * totalCurrentRoundTickets}
                </Text>
            </Flex>
            <Grid
                templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                gap="1rem"
                mt="4"
            >
                {AddNotification({ notifications: allNotifications })}
                {SendNotification({ notifications: allNotifications })}
            </Grid>
            <Box mt='8'>
                <WinnerRewards totalReward={totalPreviousRoundTickets * 0.6 * 2} round={previousRound} />
            </Box>
            <Box mt='8'>
                {WinnerSelection({totalTickets: totalCurrentRoundTickets, round: previousRound})}
            </Box>
            <Box mt='8'>
                <Refunds
                    allRefunds={allRefunds}
                    currentRefund={currentRefund}
                    setCurrentRefund={setCurrentRefund}
                    setAllRefunds={setAllRefunds}
                />
            </Box>
            <Box  mt='8'>
                <FindUser />
            </Box>
            <Box  mt='8'>
                <ContactUs allMessages={allMessages} setAllMessages={setAllMessages} />
            </Box>
            <ToastContainer />
        </>
    )
}



const AddNotification = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newNotification, setNewNotification] = useState('');
    const axiosPrivate = useAxiosPrivate();

    const handleChange = (e) => {
        setNewNotification(e.target.value);
    };

    const handleSubmit = () => {
        if (newNotification === '' || newNotification === null) {
            toast.error("Notification cannot be null!");
            return
        }
        if (newNotification.length > 700) {
            toast.error("Notification cannot be more than 700 characters!");
            return
        }
        try {
            axiosPrivate.post('notifications/postNotification', { message: newNotification })
                .then((response) => {
                    if (response.data.success === true) {
                        setNewNotification('');
                        toast.success("Added notification successfully!");
                    } else {
                        toast.error("Adding notification failed!");
                    }
                })
                .catch(console.log)
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };
    return (
        <>
            <Modal color='white' isOpen={isOpen} onClose={() => setIsOpen(false)} size="md" isCentered>
                <ModalOverlay />
                <ModalContent bg={colors.modalBg} color='white' maxH="50vh">
                    <ModalHeader>All {notifications.length} notifications</ModalHeader>
                    <ModalBody maxH="50vh" overflowY="scroll">
                        {[...notifications].reverse().map(notification => (
                            <Box key={notification.id} mb={4} bg={colors.modalBox} p='2' borderRadius='md'>
                                <Text>
                                    {notification.id}
                                </Text>
                                <Text>
                                    {notification.text}
                                </Text>
                            </Box>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button bg='#beef00' color='black' onClick={() => { setIsOpen(false) }}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box bg='#1A202C' borderRadius='lg' p='1rem' color='white' mt={['1', '1rem']}>
                <Center mb='3'>
                    <Box>
                        <Text as='b' fontSize='lg' pb='2'>Add Notification</Text>
                        <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
                    </Box>
                </Center>
                <Box>
                    <Textarea placeholder="Enter new notification" size="md" mb="4" h='100px' value={newNotification} onChange={handleChange} />
                    <Flex justify="space-between">
                        <Button color={colors.primaryText} size='sm' onClick={() => setIsOpen(true)} >
                            See notifications
                        </Button>
                        <Button bg={colors.primary} color={colors.primaryText} size='sm' onClick={handleSubmit}>
                            Add notification
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}
const SendNotification = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toWhom, setToWhom] = useState('To all users');
    const [notiId, setNotiId] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [userNotifications, setUserNotifications] = useState([]);

    const handleSubmit = () => {
        setIsOpen(false);
        // notifications.forEach(notification => {
        //     // console.log(notification.id);
        // });
        // console.log(notiId);
        const notiExists = notifications.some(notification => notification.id === notiId);
        if (!notiExists) {
            toast.error("This notification does not exist.");
            return
        }
        try {
            axiosPrivate.post('/users/sendnotification', { toWhom: toWhom, notiId: notiId })
                .then((response) => {
                    if (response.data.success) {
                        toast.success("Send notification successfully!");
                    } else {
                        toast.error("Sending notification failed!");
                    }
                })
                .catch(console.log)
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };
    const handleSeeUserNotification = async () => {
        try {
            // Make a GET request to your backend route to retrieve user notifications
            const response = await axiosPrivate.get('/notifications/getusernotification');
            if (response.data) {
                setUserNotifications(response.data);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching user notifications');
        }
    }
    return (
        <>
            <Modal color='white' isOpen={isOpen} onClose={() => setIsOpen(false)} size="md" isCentered>
                <ModalOverlay />
                <ModalContent bg={colors.modalBg} color='white' maxH="50vh">
                    <ModalHeader>Sending notifications</ModalHeader>
                    <ModalBody maxH="50vh" overflowY="scroll">
                        <Text>{toWhom}</Text>
                        <Text>Notification ID: {notiId}</Text>
                        {notifications.map(notification => (
                            (notiId === notification.id) && (
                                <Box key={notification.id} mb={4} bg={colors.modalBox} p='2' borderRadius='md'>
                                    <Text>
                                        {notification.text}
                                    </Text>
                                </Box>
                            )
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button bg='#beef00' color='black' onClick={handleSubmit}>Send</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal color='white' isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md" isCentered>
                <ModalOverlay />
                <ModalContent bg={colors.modalBg} color='white' maxH="50vh">
                    <ModalHeader>Sending notifications</ModalHeader>
                    <ModalBody maxH="50vh" overflowY="scroll">
                        <Text>Normal User Notifications</Text>
                        <Text p='2'>{userNotifications[0]}</Text>
                        <Text>Winner User Notifications</Text>
                        <Text p='2'>{userNotifications[1]}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg='#beef00' color='black' onClick={() => { setIsModalOpen(false) }}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box bg='#1A202C' borderRadius='lg' p='1rem' color='white' mt={['1', '1rem']}>
                <Center mb='3'>
                    <Box>
                        <Text as='b' fontSize='lg' pb='2'>Send Notification</Text>
                        <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
                    </Box>
                </Center>
                <Box mb='4'>
                    <Flex>
                        <label htmlFor="toWhom" style={{ width: '55%', padding: '8px' }}>To Whom:</label>
                        <Select id="toWhom" mb="4" onChange={(e) => setToWhom(e.target.value)}>
                            <option value="toAllUsers">To all users</option>
                            <option value="toWinners">To winners</option>
                        </Select>
                    </Flex>
                    <Flex>
                        <label htmlFor="notiId" style={{ width: '55%', padding: '8px' }}>Notification ID:</label>
                        <Select id="notiId" onChange={(e) => setNotiId(e.target.value)}>
                            {Array.from({ length: 100 }, (_, index) => (
                                <option key={index} value={index}>
                                    {index}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                </Box>
                <Box pt='1'>
                    <Flex justify="space-between">
                        <Button color={colors.primaryText} size='sm' onClick={handleSeeUserNotification}>
                            See users notifications
                        </Button>
                        <Button bg={colors.primary} color={colors.primaryText} size='sm' onClick={() => { setIsOpen(true) }}>
                            Send notification
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

const WinnerSelection = ({totalTickets, round}) => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [top3Winners, setTop3Winners] = useState([]);
    const [top4Winners, setTop4Winners] = useState([]);
    const [top5Winners, setTop5Winners] = useState([]);
    const [top6Winners, setTop6Winners] = useState([]);
    const profilePictures = [ProfilePicture1, ProfilePicture2, ProfilePicture3, ProfilePicture4, ProfilePicture5, ProfilePicture6, ProfilePicture7, ProfilePicture8, ProfilePicture9, ProfilePicture10, ProfilePicture11, ProfilePicture12, ProfilePicture13, ProfilePicture14, ProfilePicture15, ProfilePicture16];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmWord, setConfirmWord] = useState('');

    const handleWinnerSelection = async () => {
        if(totalTickets<73){
            return toast.error("Not enough tickets to choose winners!")
        }
        try {
            const response = await axiosPrivate.get(`/newtickets/randomizewinners`);

            if (response.data) {
                // Assuming the response from the server includes the winners in the expected format
                const { top3Winners, top4Winners, top5Winners, top6Winners } = response.data;
                setTop3Winners(top3Winners);
                setTop4Winners(top4Winners);
                setTop5Winners(top5Winners);
                setTop6Winners(top6Winners);
            }
        } catch (error) {
            console.error("Error selecting winners: ", error);
        }
    }
    const handleSubmit = async () => {
        if (confirmWord !== "Confirm Winners") return toast.error("Please enter correctly.");
        try {
            const winnersData = {
                top3Winners,
                top4Winners,
                top5Winners,
                top6Winners,
                round: round+1,
                prizeAmount: totalTickets
            };
            const response = await axiosPrivate.post(`/newtickets/postwinners`, winnersData);
            if (response.data) {
                setConfirmWord('');
                toast.success("Winner Selection Confirmation Successful!");
                setIsModalOpen(false);
                setTop3Winners([]);
                setTop4Winners([]);
                setTop5Winners([]);
                setTop6Winners([]);
            }
        } catch (error) {
            setConfirmWord('');
            console.error("Error posting winners: ", error);
            setIsModalOpen(false);
        }
    }
    const handleChangeWord = (e) => {
        setConfirmWord(e.target.value);
    }

    return (
        <>
            <Modal color='white' isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md" isCentered>
                <ModalOverlay />
                <ModalContent bg={colors.modalBg} color='white' maxH="50vh">
                    <ModalHeader>Confirm Selection</ModalHeader>
                    <ModalBody maxH="50vh" overflowY="scroll">
                        <Text>After Confirming, you can no longer undo this action.</Text>
                        <Text>Please enter 'Confirm Winners' to confirm winner selection.</Text>
                        <FormControl mt='3'>
                            {/* <FormLabel>Enter a value:</FormLabel> */}
                            <Input type='text' value={confirmWord} onChange={handleChangeWord} placeholder="Enter your 'Confirm Winners' here" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg="#F0EEED" onClick={() => { setIsModalOpen(false) }} color='black' mr='2'>
                            Close
                        </Button>
                        <Button bg='#beef00' color='black' onClick={handleSubmit}>Confirm</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex flexDir="column" w="100%" mb={{ base: '4', md: '0' }}>
                <Box borderWidth="1px" borderRadius="lg" h={["510px", "400px"]} border='2px solid #beef00' overflow='hidden'>
                    <Flex justifyContent="center" mb='2' bg='#F6E05E' py='2' px='4' position="sticky" top="0">
                        <Text fontSize={{ base: 'lg', md: 'xl' }} mr={['1', '3']} pt={['1', '1']} as='b'>Winner Selection</Text>
                    </Flex>

                    <Grid
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(5, 1fr)'
                        gap={4}
                        mx='2'
                        mb='2'
                        h={["395px", "285px"]}
                        overflowY="scroll"
                    >
                        <GridItem rowSpan={{ base: '1', md: '2' }} colSpan={{ base: '5', md: '2' }}>
                            <Box maxH="285px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">Top 3 Winners</Center>
                                {top3Winners.map((value, key) => {
                                    let userId = value.userId;
                                    let userName = value.userName;
                                    let ticketNumber = value.ticketId;
                                    let status = value.status;
                                    let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;
                                    return (
                                        <Center>
                                            <Card
                                                key={key}
                                                imageUrl={profilePic}
                                                userName={userName}
                                                ticketNumber={ticketNumber}
                                                userId={userId}
                                                status={status}
                                            />
                                        </Center>
                                    );
                                })}
                            </Box>
                        </GridItem>
                        <GridItem rowSpan={{ base: '1', md: '2' }} colSpan={{ base: '5', md: '1' }}>
                            <Box maxH="285px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">4th Winners</Center>
                                {top4Winners.map((value, key) => {
                                    let userId = value.userId;
                                    let userName = value.userName;
                                    let ticketNumber = value.ticketId;
                                    let status = value.status;
                                    let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;
                                    return (
                                        <Card
                                            key={key}
                                            imageUrl={profilePic}
                                            userName={userName}
                                            ticketNumber={ticketNumber}
                                            userId={userId}
                                            status={status}
                                        />
                                    );
                                })}
                            </Box>
                        </GridItem>
                        <GridItem rowSpan={{ base: '1', md: '2' }} colSpan={{ base: '5', md: '1' }}>
                            <Box maxH="285px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">5th Winners</Center>
                                {top5Winners.map((value, key) => {
                                    let userId = value.userId;
                                    let userName = value.userName;
                                    let ticketNumber = value.ticketId;
                                    let status = value.status;
                                    let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;
                                    return (
                                        <Card
                                            key={key}
                                            imageUrl={profilePic}
                                            userName={userName}
                                            ticketNumber={ticketNumber}
                                            userId={userId}
                                            status={status}
                                        />
                                    );
                                })}
                            </Box>
                        </GridItem>
                        <GridItem rowSpan={{ base: '1', md: '2' }} colSpan={{ base: '5', md: '1' }}>
                            <Box maxH="285px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">6th Winners</Center>
                                {top6Winners.map((value, key) => {
                                    let userId = value.userId;
                                    let userName = value.userName;
                                    let ticketNumber = value.ticketId;
                                    let status = value.status;
                                    let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;
                                    return (
                                        <Card
                                            key={key}
                                            imageUrl={profilePic}
                                            userName={userName}
                                            ticketNumber={ticketNumber}
                                            userId={userId}
                                            status={status}
                                        />
                                    );
                                })}
                            </Box>
                        </GridItem>
                    </Grid>
                    <Flex justify="space-between" mb='2' bg='#F6E05E' py='2' px='4'>
                        <Button size="sm" bg='white' onClick={() => { auth.user && handleWinnerSelection() }}>Randomize</Button>
                        <Button colorScheme={"red"} size='sm' onClick={() => { top3Winners.length > 0 && setIsModalOpen(true) }} >
                            Confirm Selection
                        </Button>
                    </Flex>
                </Box>
            </Flex>

        </>
    )
}
const Card = ({ imageUrl, userName, ticketNumber, userId, status }) => {
    return (
        <Box
            maxW="md"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            bg={colors.boxColor}
            color={status === "normal" ? 'white' : 'red'}
            borderColor={status === "normal" ? '#beef00' : 'red'}
            // onClick={() => { navigate(`/profile/${userId}`) }} cursor="pointer"
            my='2'
        >
            <Flex alignItems="center" p="2">
                <Image borderRadius='full' src={imageUrl} alt={userName} w="20%" />
                <Text ml="4" fontSize="lg" fontWeight="bold">
                    {userName}
                </Text>
            </Flex>
            <Divider />
            <Box p="2" >
                <Center>
                    <Text as='b' size='xl'>{ticketNumber}</Text>
                </Center>
            </Box>
        </Box>
    );
};
export default AdminDashboard;