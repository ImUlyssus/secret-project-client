import { Center, Box, Flex, Text, Button, Modal, ModalBody, ModalFooter, ModalContent, ModalOverlay, ModalHeader, SimpleGrid } from '@chakra-ui/react';
import { colors } from '../../Theme';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const Refunds = ({
    allRefunds,
    currentRefund,
    setCurrentRefund,
    setAllRefunds
}) => {
    const [paid, setPaid] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = useAuth();
    const copy = async (walletAddress) => {
        await navigator.clipboard.writeText(walletAddress);
        toast.success("Copied wallet address")
    }
    const handleFinishRefund = async (orderId) => {
        let status;
        const updatedRefunds = allRefunds.map((refund) => {
            if (refund.orderId === orderId) {
                status = refund.status;
                return { ...refund, paid: true };
            }
            return refund;
        });
        setAllRefunds(updatedRefunds);
        try {
            await axiosPrivate.post('/refunds/updaterefund', { paid: true, status, orderId })
                .then((response) => {
                    if (response.data.success) {
                        axiosPrivate
                            .post("/send_refund_status_email", {
                                status: 'normal',
                                recipient_email: auth.user.email,
                                orderId: orderId
                            }).then(() =>
                                toast.success("Processed refund successfully!"))
                            .catch(console.log);
                    } else {
                        toast.error("Processing refund failed!");
                    }
                })
                .catch(console.log)
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
        setIsOpen(false);
    };
    const handleRejectRefund = async (orderId) => {
        let paid;
        const updatedRefunds = allRefunds.map((refund) => {
            if (refund.orderId === orderId) {
                paid = refund.paid;
                return { ...refund, status: "Rejected" };
            }
            return refund;
        });
        setAllRefunds(updatedRefunds);
        try {
            await axiosPrivate.post('/refunds/updaterefund', { paid, status: "reject", orderId })
                .then((response) => {
                    if (response.data.success) {
                        axiosPrivate
                            .post("/send_refund_status_email", {
                                status: 'reject',
                                recipient_email: auth.user.email,
                                orderId: orderId
                            }).then(() =>
                                toast.success("Rejected refund successfully!"))
                            .catch(console.log);
                    } else {
                        toast.error("Rejecting refund failed!");
                    }
                })
                .catch(console.log)
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };
    return (
        <Box w='100%' display={{ md: 'flex' }}>
            <Box color='white' borderRadius='md' overflowY="scroll" border='white solid 1px' w={['100%', '50%']} h='250px'>
                <Flex justifyContent={'space-between'} mb='2' position="sticky" top="0" bg='#F6E05E' color='black'>
                    <Text p='3' as='b' fontSize='lg'>Refunds:</Text>
                    <Box p='3'>
                        <Text mb='2' as='b' fontSize='lg' border={!paid ? 'red solid 2px' : 'black solid 2px'} color={!paid ? 'red' : 'black'} p='2' mr='2' borderRadius='md' onClick={() => {
                            setPaid(false);
                            setCurrentRefund();
                            localStorage.setItem('currentRefund', -1);
                        }} cursor='pointer'>
                            Unpaid
                        </Text>
                        <Text mb='2' as='b' fontSize='lg' border={paid ? 'red solid 2px' : 'black solid 2px'} color={paid ? 'red' : 'black'} p='2' borderRadius='md' onClick={() => {
                            setPaid(true);
                            setCurrentRefund();
                            localStorage.setItem('currentRefund', -1);
                        }} cursor='pointer'>
                            Paid
                        </Text>
                    </Box>
                </Flex>
                <SimpleGrid columns='1' spacing={4} px='2'>
                    {allRefunds
                        .filter((refund) => refund.paid === paid) // Filter based on the 'paid' variable
                        .map((refund) => (
                            <Box
                                key={refund.id}
                                mb='2'
                                border={refund.id === currentRefund ? '#beef00 solid 1px' : 'white solid 1px'}
                                color={refund.status === "reject"?'red':'white'}
                                borderRadius='md'
                                p='3'
                                onClick={() => {
                                    setCurrentRefund(refund.id);
                                    localStorage.setItem('currentRefund', refund.id);
                                }}
                            >
                                <Flex justifyContent='space-between'>
                                    <strong>ID: {refund.id}</strong>
                                    <strong>Status: {refund.status}</strong>
                                </Flex>
                                <br />
                                <strong>Order ID:</strong> {refund.orderId}<br />
                                <strong>Request Date:</strong> {refund.requestDate.toString()}<br />
                                <strong>Paid:</strong> {refund.paid ? 'Yes' : 'No'}
                            </Box>
                        ))}
                </SimpleGrid>
            </Box>
            <Box color='white' p='4' border='white solid 1px' borderRadius='md' ml={['0', '2%']} w={['100%', '48%']} mt={['2', '0']} h='250px' overflowY="scroll">
                {currentRefund &&
                    allRefunds
                        .filter((refund) => refund.id === currentRefund) // Filtering the currentRefund from allRefunds
                        .map((foundRefund) => (
                            <div key={foundRefund.id}>
                                <Flex as='b' fontSize='lg' mb='2' justifyContent={'space-around'}>
                                    <Text p='2'>Refund Amount: </Text>
                                    <Text p='2' textAlign='center' width='50%' border='white solid 1px' borderRadius='md'>${foundRefund.amount}</Text>
                                </Flex>
                                <Flex as='b' fontSize='lg' mb='2' justifyContent={'space-around'}>
                                    <Text p='2'>Wallet Network: </Text>
                                    <Text p='2' textAlign='center' width='50%' border='white solid 1px' borderRadius='md'>{foundRefund.network ? foundRefund.network : "Null"}</Text>
                                </Flex>
                                <Flex as='b' fontSize='lg' mb='2' justifyContent={'space-around'}>
                                    <Text p='2'>Wallet Address: </Text>
                                    {foundRefund.walletAddress === null || foundRefund.walletAddress === '' ? <Center bg='red' borderRadius='md' width='50%'>NULL</Center> :
                                        // <Button size='sm' color='black' onClick={() => copy(foundReward.walletAddress)}>Copy Wallet Address</Button>
                                        <Center fontSize={['sm', 'md']} bg='white' color='black' borderRadius='md' width='50%' onClick={() => copy(foundRefund.walletAddress)} cursor='pointer'>Copy Wallet Address</Center>
                                    }
                                    {/* <Center fontSize={['sm','md']} bg='white' color='black' borderRadius='md' width='50%' onClick={() => copy(foundRefund.walletAddress)} cursor='pointer'>{foundRefund.walletAddress ? "Copy Wallet Address" : "Null"}</Center> */}
                                    {/* <Text p='2' textAlign='center' border='white solid 1px' borderRadius='md'>{foundRefund.walletAddress ? foundRefund.walletAddress : "Null"}</Text> */}
                                </Flex>
                                {!foundRefund.paid &&
                                    <Flex as='b' fontSize='lg' justifyContent={'space-around'} mt='1rem'>
                                        {/* <Button bg='#beef00' color='black' onClick={() => handleFinishRefund(foundRefund.orderId)}>Finish Refund</Button> */}
                                        <Button bg='#beef00' color='black' onClick={() => setIsOpen(true)}>Finish Refund</Button>
                                        <Button bg='red' color='white' onClick={() => handleRejectRefund(foundRefund.orderId)}>Reject Refund</Button>
                                    </Flex>
                                }
                                <Modal color='white' isOpen={isOpen} onClose={() => setIsOpen(false)} size="md" isCentered>
                                    <ModalOverlay />
                                    <ModalContent bg={colors.modalBg} color='white' maxH="50vh">
                                        <ModalHeader>Finish processing refund</ModalHeader>
                                        <ModalBody maxH="50vh" overflowY="scroll">
                                            <Text>I confirm that I just finished processing the refund transaction for this user.</Text>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button bg='white' color='black' onClick={() => setIsOpen(false)} mr='2'>Cancel</Button>
                                            <Button bg='#beef00' color='black' onClick={() => handleFinishRefund(foundRefund.orderId)}>Confirm</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </div>
                        ))}
            </Box>
        </Box>
    )
}

export default Refunds;
