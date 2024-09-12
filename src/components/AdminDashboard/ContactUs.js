import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { colors } from '../../Theme';
import { toast } from 'react-toastify';
import { Box, Flex, Text, Center, Button, Modal, ModalContent, ModalHeader, ModalOverlay, ModalBody, ModalFooter, Grid, GridItem } from '@chakra-ui/react';
const ContactUs = ({ allMessages, setAllMessages }) => {
    const axiosPrivate = useAxiosPrivate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState();
    const [currentMessage, setCurrentMessage] = useState();

    useEffect(() => {
        setAllMessages(allMessages);
        let currentMessageFromStorage = localStorage.getItem('currentMessage');
        currentMessage && setCurrentMessage(currentMessageFromStorage);
    })
    const handleChangeWord = (e) => {
        setResponseMessage(e.target.value);
    }
    const handleSubmit = async () => {
        let recipientEmail;
        const updatedMessage = allMessages.map((message) => {
            if (message.id === currentMessage) {
                recipientEmail = message.email;
                return { ...message, isResponded: true };
            }
            return message;
        });
        setAllMessages(updatedMessage);
        if(!responseMessage){
            try{
            await axiosPrivate.post('/contactus/updatemessage', { isResponded: true, id: currentMessage })
                .then((response) => {
                    if (response.data.success) {
                        setCurrentMessage();
                        localStorage.setItem("currentMessage", null)
                        toast.success("Sent message successfully!")
                    }else{
                        toast.error("Sending message failed!");
                    }}).catch(console.log)
            }catch(err){
                console.log(err);
                toast.error(err);
            }
            setIsModalOpen(false);
            return;
        }
        try {
            await axiosPrivate.post('/contactus/updatemessage', { isResponded: true, id: currentMessage })
                .then((response) => {
                    if (response.data.success) {
                        axiosPrivate
                            .post("/send_contactus_email", {
                                recipient_email: recipientEmail,
                                responseMessage
                            }).then(() =>
                                {setResponseMessage("");
                                setCurrentMessage();
                        localStorage.setItem("currentMessage", null);
                                toast.success("Sent message successfully!")})
                            .catch(console.log);
                    } else {
                        toast.error("Sending message failed!");
                    }
                })
                .catch(console.log)
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
        setIsModalOpen(false);
    };
    const sortedMessages = allMessages.sort((a, b) => b.id - a.id);

    return (
        <>
            <Modal color='white' isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md" isCentered>
                <ModalOverlay />
                <ModalContent bg={colors.modalBg} color='white' maxH="50vh">
                    <ModalHeader>Confirm Sending Message</ModalHeader>
                    <ModalBody maxH="50vh" overflowY="scroll">
                        <Text>Are you sure you want to send this email message to this user?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg="#F0EEED" onClick={() => { setIsModalOpen(false) }} color='black' mr='2'>
                            Close
                        </Button>
                        <Button bg='#beef00' color='black' onClick={handleSubmit}>Send</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex flexDir="column" w="100%" mb={{ base: '4', md: '0' }}>
                <Box borderWidth="1px" borderRadius="lg" h={["750px", "400px"]} border='2px solid #beef00' overflow='hidden'>
                    <Flex justifyContent="center" mb='2' bg='#F6E05E' py='2' px='4' position="sticky" top="0">
                        <Text fontSize={{ base: 'lg', md: 'xl' }} mr={['1', '3']} pt={['1', '1']} as='b'>Contact Us</Text>
                    </Flex>

                    <Grid
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(5, 1fr)'
                        gap={4}
                        mx='2'
                        mb='2'
                        h="350px"
                    >
                        <GridItem rowSpan={['1', '2']} colSpan={{ base: '5', md: '2' }}>
                            <Box h="340px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0">Messages</Center>
                                {sortedMessages.map((value, key) => {
                                    if(!value.isResponded){
                                        return (
                                            <Box
                                                 key={value.id}
                                                 my='2'
                                                 border={value.id === currentMessage ? '#beef00 solid 1px' : 'white solid 1px'}
                                                 borderRadius='md'
                                                 p='3'
                                                 onClick={() => {
                                                     setCurrentMessage(value.id);
                                                     localStorage.setItem('currentMessage', value.id);
                                                 }}
                                                 color='white'
                                             >
                                                 <Flex justifyContent='space-between' fontSize='sm'>
                                                     <Text>{value.userName}</Text>
                                                     <Text>{value.email}</Text>
                                                 </Flex>
                                                 <Box>
                                                     {value.message}
                                                 </Box>
                                             </Box>
                                             // </Center>
                                         );
                                    }
                                    }
                                )}
                            </Box>
                        </GridItem>
                        <GridItem rowSpan={['1', '2']} colSpan={{ base: '5', md: '3' }}>
                            <Box h="340px" overflowY="scroll">
                                <Center as='b' p='3' bg='black' color='white' borderRadius='md' position="sticky" top="0" mb='2'>Response Message</Center>
                                {currentMessage &&
                                    <div>
                                        <textarea
                                            placeholder='Enter response message'
                                            style={{ height: '220px', width: '100%', borderRadius: '20px', paddingTop: '1rem' }}
                                            value={responseMessage}
                                            onChange={handleChangeWord}
                                        />
                                        <Center mt='1'>
                                            <Button w='30%' bg='#beef00' color='black' onClick={() => { setIsModalOpen(true) }} disabled={currentMessage?false:true}>Continue</Button>
                                        </Center>
                                    </div>}
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
            </Flex>

        </>
    )
}

export default ContactUs