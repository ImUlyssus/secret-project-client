import { Center, Divider, Box, Flex, Text, Grid, Button, Modal, ModalBody, ModalFooter, ModalContent, ModalOverlay, ModalHeader, GridItem, Image, useBreakpointValue } from '@chakra-ui/react';
import { colors } from '../../Theme';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Refunds from './Refunds';
import ProfilePicture1 from '../../assets/1.png';
import ProfilePicture2 from '../../assets/2.png';
import ProfilePicture3 from '../../assets/3.png';
import ProfilePicture4 from '../../assets/4.png';
import ProfilePicture5 from '../../assets/5.png';
import ProfilePicture6 from '../../assets/6.png';
import ProfilePicture7 from '../../assets/7.png';
import ProfilePicture8 from '../../assets/8.png';
import ProfilePicture9 from '../../assets/9.png';
import ProfilePicture10 from '../../assets/10.png';
import ProfilePicture11 from '../../assets/11.png';
import ProfilePicture12 from '../../assets/12.png';
import ProfilePicture13 from '../../assets/13.png';
import ProfilePicture14 from '../../assets/14.png';
import ProfilePicture15 from '../../assets/15.png';
import ProfilePicture16 from '../../assets/16.png';
import { axiosPrivate } from '../../api/axios';
import { PrizePercentage } from "../../utils/constants/constants";

const WinnerRewards = ({ totalReward, round }) => {
    const [listOfWinners, setListOfWinners] = useState([]);
    const [listOfOldWinners, setListOfOldWinners] = useState([]);
    const profilePictures = [ProfilePicture1, ProfilePicture2, ProfilePicture3, ProfilePicture4, ProfilePicture5, ProfilePicture6, ProfilePicture7, ProfilePicture8, ProfilePicture9, ProfilePicture10, ProfilePicture11, ProfilePicture12, ProfilePicture13, ProfilePicture14, ProfilePicture15, ProfilePicture16];
    const [currentReward, setCurrentReward] = useState();
    const [isPaid, setIsPaid] = useState(false);
    const isSmall = useBreakpointValue({ base: true, md: false });
    const [isOldTickets, setIsOldTickets] = useState(false);
    const { auth } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, [round]);
    const fetchData = () => {
        axios.get(`/winningtickets/all/${round}`)
            .then((response) => {
                const { fetchedNewTickets, fetchedOldTickets } = response.data;
                const newUserIds = [...new Set(fetchedNewTickets.map((item) => item.userId))];
                const oldUserIds = [...new Set(fetchedOldTickets.map((item) => item.userId))];

                // Fetch user data for the extracted user IDs
                const newUserPromises = newUserIds.map((id) => axios.get(`/users/byid/${id}`));
                const oldUserPromises = oldUserIds.map((id) => axios.get(`/users/byid/${id}`));
                Promise.all(newUserPromises)
                    .then((userResponses) => {
                        const userData = userResponses.map((userResponse) => userResponse.data);
                        // Map the filtered tickets data with user information
                        const enrichedData = fetchedNewTickets.map((item) => {
                            const user = userData.find((userItem) => userItem.userId === item.userId);
                            return {
                                ...item,
                                userName: user?.userName || '',
                                picturePath: user?.picturePath || '',
                                randomizedProfilePicture: user?.randomizedProfilePicture,
                                network: user?.network || '',
                                walletAddress: user?.walletAddress || '',
                                isWalletReady: user?.isWalletReady || false,
                            };
                        });
                        let currentReward = localStorage.getItem('currentReward');
                        currentReward && setCurrentReward(currentReward);
                        setListOfWinners(enrichedData);
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });
                Promise.all(oldUserPromises)
                    .then((userResponses) => {
                        const userData = userResponses.map((userResponse) => userResponse.data);
                        // Map the filtered tickets data with user information
                        const enrichedData = fetchedOldTickets.map((item) => {
                            const user = userData.find((userItem) => userItem.userId === item.userId);
                            return {
                                ...item,
                                userName: user?.userName || '',
                                picturePath: user?.picturePath || '',
                                randomizedProfilePicture: user?.randomizedProfilePicture,
                                network: user?.network || '',
                                walletAddress: user?.walletAddress || '',
                                isWalletReady: user?.isWalletReady || false,
                            };
                        });
                        setListOfOldWinners(enrichedData);
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching tickets:", error);
            });
    }
    const calculatePrize = (prize) => {
        if (prize === 1) {
            return (totalReward * PrizePercentage.firstPrize).toFixed(2);
        } else if (prize === 2) {
            return (totalReward * PrizePercentage.secondPrize).toFixed(2);
        } else if (prize === 3) {
            return (totalReward * PrizePercentage.thirdPrize).toFixed(2);
        } else if (prize === 4) {
            return (totalReward * PrizePercentage.fourthPrize).toFixed(2);
        } else if (prize === 5) {
            return (totalReward * PrizePercentage.fifthPrize).toFixed(2);
        } else {
            return (totalReward * PrizePercentage.sixthPrize).toFixed(2);
        }
    }
    const copy = async (walletAddress) => {
        await navigator.clipboard.writeText(walletAddress);
        toast.success("Copied wallet address")
    }
    const filteredWinners = (isOldTickets ? listOfOldWinners : listOfWinners)
        .filter((value) => [1, 2, 3].includes(value.prize))
        .sort((a, b) => a.prize - b.prize);

    const handleReward = async ({ ticketId, paid, status, purchaseDate }) => {
        const response = await axiosPrivate.post("/oldtickets/updateticket", { ticketId, paid, status, purchaseDate });
        if (response.data.success && paid) {
            fetchData();
            axiosPrivate
                .post("/send_reward_status_email", {
                    status: 'normal',
                    recipient_email: auth.user.email,
                    ticketId: ticketId
                }).then(() => toast.success("Paid reward successfully."))
                .catch(console.log);
        } else if (response.data.success && !paid) {
            fetchData();
            axiosPrivate
                .post("/send_reward_status_email", {
                    status: 'reject',
                    recipient_email: auth.user.email,
                    ticketId: ticketId
                }).then(() => toast.success("Rejected reward successfully."))
                .catch(console.log);
        } else {
            toast.error("Error processing your request!")
        }
        setIsOpen(false);
    }
    return (
        <>
            <Flex flexDir="column" w="100%" mb={{ base: '4', md: '0' }} mt='2'>
                <Box borderWidth="1px" borderRadius="lg" h={["800px", "540px"]} border='2px solid #beef00' overflow='hidden'>
                    <Flex justifyContent="space-around" bg='#F6E05E' position="sticky" top="0">
                        <Text fontSize={{ base: 'lg', md: 'xl' }} p='2' as='b'>Winner Rewards</Text>
                    </Flex>
                    <Flex justifyContent='space-around' bg='black' mb='2' py='2'>
                        <Box>
                            <Button size={['sm', 'md']} onClick={() => setIsOldTickets(false)} bg={isOldTickets ? 'white' : 'transparent'} color={!isOldTickets ? 'white' : 'black'} border='white solid 2px' mr='2'>
                                New Tickets
                            </Button>
                            <Button size={['sm', 'md']} onClick={() => setIsOldTickets(true)} bg={!isOldTickets ? 'white' : 'transparent'} color={isOldTickets ? 'white' : 'black'} border='white solid 2px'>
                                Old Tickets
                            </Button>
                        </Box>
                        <Box>
                            <Button size={['sm', 'md']} onClick={() => setIsPaid(false)} bg={!isPaid ? 'black' : 'white'} color={!isPaid ? 'white' : 'black'} border='white solid 2px' mr='2'>
                                Unpaid
                            </Button>
                            <Button size={['sm', 'md']} onClick={() => setIsPaid(true)} bg={isPaid ? 'black' : 'white'} color={isPaid ? 'white' : 'black'} border='white solid 2px'>
                                Paid
                            </Button>
                        </Box>
                        {!isSmall && <Flex color='white' p='2'>
                            <Box mr='2' w='20px' h='20px' borderRadius='50%' bg='red' />
                            <Text mr='2'>Rejected</Text>
                            <Box mr='2' w='20px' h='20px' borderRadius='50%' bg='#beef00' />
                            <Text>Normal</Text>
                        </Flex>}
                    </Flex>

                    <Grid
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(4, 1fr)'
                        gap={4}
                        mx='2'
                        mb='2'
                        h={["395px", "285px"]}
                        overflowY="scroll"
                    >
                        <GridItem rowSpan={{ base: '1', md: '2' }} colSpan={{ base: '5', md: '1' }}>
                            <Box maxH="285px" overflowY="scroll" mt='0'>
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">Top 3 Winners</Center>
                                {filteredWinners.map((value, key) => {
                                    let userId = value.userId;
                                    let ticketId = value.ticketId;
                                    let purchaseDate = value.purchaseDate;
                                    let userName = value.userName;
                                    let ticketNumber = value.ticketId;
                                    let status = value.status;
                                    let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;

                                    return (
                                        <Center key={key} onClick={() => {
                                            setCurrentReward(ticketId + "|" + purchaseDate);
                                            localStorage.setItem('currentReward', (ticketId + "|" + purchaseDate));
                                        }}>
                                            {value.paid === isPaid && <Card
                                                imageUrl={profilePic}
                                                userName={userName}
                                                ticketNumber={ticketNumber}
                                                userId={userId}
                                                status={status}
                                            />}
                                        </Center>
                                    );
                                })}
                            </Box>
                        </GridItem>
                        <GridItem rowSpan={{ base: '1', md: '2' }} colSpan={{ base: '5', md: '1' }}>
                            <Box maxH="285px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">4th Winners</Center>
                                {(isOldTickets ? listOfOldWinners : listOfWinners).map((value, key) => {
                                    let userId = value.userId;
                                    let userName = value.userName;
                                    let ticketId = value.ticketId;
                                    let purchaseDate = value.purchaseDate;
                                    let status = value.status
                                    let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;
                                    return (
                                        <Center key={key} onClick={() => {
                                            setCurrentReward(ticketId + "|" + purchaseDate);
                                            localStorage.setItem('currentReward', (ticketId + "|" + purchaseDate))
                                        }}>
                                            {value.prize === 4 && value.paid === isPaid && <Card
                                                imageUrl={profilePic}
                                                userName={userName}
                                                ticketNumber={ticketId}
                                                userId={userId}
                                                status={status}
                                            />}
                                        </Center>
                                    );
                                })}
                            </Box>
                        </GridItem>
                        <GridItem rowSpan={{ base: '1', md: '2' }} colSpan={{ base: '5', md: '1' }}>
                            <Box maxH="285px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">5th Winners</Center>
                                {(isOldTickets ? listOfOldWinners : listOfWinners).map((value, key) => {
                                    let userId = value.userId;
                                    let userName = value.userName;
                                    let purchaseDate = value.purchaseDate;
                                    let ticketId = value.ticketId;
                                    let status = value.status;
                                    let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;
                                    return (
                                        <Center key={key} onClick={() => {
                                            setCurrentReward(ticketId + "|" + purchaseDate);
                                            localStorage.setItem('currentReward', (ticketId + "|" + purchaseDate))
                                        }}>
                                            {value.prize === 5 && value.paid === isPaid && <Card
                                                
                                                imageUrl={profilePic}
                                                userName={userName}
                                                ticketNumber={ticketId}
                                                userId={userId}
                                                status={status}
                                            />}
                                        </Center>
                                    );
                                })}
                            </Box>
                        </GridItem>
                        <GridItem rowSpan={{ base: '1', md: '2' }} colSpan={{ base: '5', md: '1' }}>
                            <Box maxH="285px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">6th Winners</Center>
                                {(isOldTickets ? listOfOldWinners : listOfWinners).map((value, key) => {
                                    let userId = value.userId;
                                    let userName = value.userName;
                                    let purchaseDate = value.purchaseDate;
                                    let ticketId = value.ticketId;
                                    let status = value.status
                                    let profilePic = value.picturePath === '' ? profilePictures[value.randomizedProfilePicture - 1] : value.picturePath;
                                    return (
                                        <Center key={key} onClick={() => {
                                            setCurrentReward(ticketId + "|" + purchaseDate);
                                            localStorage.setItem('currentReward', (ticketId + "|" + purchaseDate))
                                        }}>
                                            {value.prize === 6 && value.paid === isPaid &&
                                                <Card
                                                    imageUrl={profilePic}
                                                    userName={userName}
                                                    ticketNumber={ticketId}
                                                    userId={userId}
                                                    status={status}
                                                />}
                                        </Center>
                                    );
                                })}
                            </Box>
                        </GridItem>
                    </Grid>
                    <Flex justify="space-between" mb='2' bg='black' py='2' px='4' h={['300px', '135px']} w='100%' alignItems={'center'}>
                        <Box bg={colors.boxColor} border='black solid 2px' py='3' borderRadius='md' w='100%'>
                            {currentReward &&
                                (isOldTickets ? listOfOldWinners : listOfWinners)
                                    .filter((reward) => reward.ticketId === currentReward.split('|')[0] && reward.purchaseDate === currentReward.split('|')[1]) // Filtering the currentRefund from allRefunds
                                    .map((foundReward) => (
                                        <div key={foundReward.ticket}>
                                            <Grid templateRows='repeat(2,1fr)' templateColumns='repeat(5, 1fr)' gap={2} color='white'>
                                                <GridItem rowSpan={2} colSpan={[5, 1]}>
                                                    <Center p='2' bg='green.300' color='black' display="flex" flexDirection="column" borderRadius='md' ml={['0', '2']} as='b' fontSize={'2xl'}>
                                                        <Text>{foundReward.ticketId}</Text>
                                                        {/* <Box>${calculatePrize(foundReward.prize)}</Box> */}
                                                        {isOldTickets ? <Box>{foundReward.prizeAmount}</Box>:
                                                        <Box>${calculatePrize(foundReward.prize)}</Box>
                                                        }
                                                    </Center>
                                                </GridItem>
                                                <GridItem rowSpan={2} colSpan={[5, 2]}>
                                                    <Flex justifyContent="space-between" mb='2'>
                                                        <Text p={['0', '2']} as='b' fontSize='lg'>Network:</Text>
                                                        {foundReward.network === null || foundReward.network === '' ? <Center bg='red' borderRadius='md' width='50%'>NULL</Center> :
                                                            <Box w='50%' py='2' border='white solid 2px' borderRadius='md' pl='2'>{foundReward.network}</Box>
                                                        }
                                                    </Flex>
                                                    <Flex justifyContent="space-between">
                                                        <Text p={['0', '2']} as='b' fontSize='lg'>Wallet:</Text>
                                                        {foundReward.walletAddress === null || foundReward.walletAddress === '' ? <Center bg='red' borderRadius='md' width='50%'>NULL</Center> :
                                                            // <Button size='sm' color='black' onClick={() => copy(foundReward.walletAddress)}>Copy Wallet Address</Button>
                                                            <Center bg='white' color='black' borderRadius='md' width='50%' onClick={() => copy(foundReward.walletAddress)} cursor='pointer'>Copy Wallet Address</Center>
                                                        }
                                                    </Flex>
                                                </GridItem>
                                                {!foundReward.paid &&
                                                    <GridItem rowSpan={2} colSpan={[5, 2]}>
                                                        <Box display={['flex', 'block']} justifyContent="space-around">
                                                            <Center mb={['0', '2']}>
                                                                <Button bg='#beef00' color='black' onClick={() => setIsOpen(true)}>Finish reward</Button>
                                                            </Center>
                                                            <Center>
                                                                <Button bg='red' color='white' onClick={() => handleReward({ ticketId: foundReward.ticketId, paid: foundReward.paid, status: "reject", purchaseDate: foundReward.purchaseDate })}>Reject reward</Button>
                                                            </Center>
                                                        </Box>
                                                    </GridItem>
                                                }
                                            </Grid>
                                            <Modal color='white' isOpen={isOpen} onClose={() => setIsOpen(false)} size="md" isCentered>
                                                <ModalOverlay />
                                                <ModalContent bg={colors.modalBg} color='white' maxH="50vh">
                                                    <ModalHeader>Finish processing reward</ModalHeader>
                                                    <ModalBody maxH="50vh" overflowY="scroll">
                                                        <Text>I confirm that I just finished processing the reward transaction for this winner.</Text>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                    <Button bg='white' color='black' onClick={() => setIsOpen(false)} mr='2'>Cancel</Button>
                                                        <Button bg='#beef00' color='black' onClick={() => handleReward({ ticketId: foundReward.ticketId, paid: true, status: foundReward.status, purchaseDate: foundReward.purchaseDate })}>Confirm</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </div>
                                    ))}
                        </Box>
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
            color={status !== "reject" ? 'white' : 'red'}
            borderColor={status !== "reject" ? '#beef00' : 'red'}
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

export default WinnerRewards;