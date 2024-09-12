import React, { useState, useEffect } from 'react'
import { Box, Flex, Center, Text, Button, Divider } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const ContactUs = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const { auth } = useAuth();
    const getUserInfo = () => {
        if (auth.user) {
            setName(auth.user.userName);
            setEmail(auth.user.email);
        } else {
            setName('');
            setEmail('');
        }
    }
    useEffect(() => {
        getUserInfo();
    })
    const handleChangeName = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 25) {
            toast.error('Character limit reached!');
            return;
        }
        setName(inputValue)
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeMessage = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 1000) {
            toast.error('Character limit reached!');
            return;
        }
        setMessage(inputValue);
    }

    const handleSubmit = async () => {
        if (!name || !email || !message) {
            return;
        }
        if (!isValidEmail(email)) {
            return toast.error('Invalid email');
        }
        if (message.length > 1000) {
            return toast.error('Character in message field cannot exceed more than 1000!');
        }
        try {
            const response = await axios.post('/contactus/postmessage', { name, email, message });
            //   console.log(response.data); // This should log the response data
            if (response.data) {
                toast.success('Sent message successfully!');
                getUserInfo();
                setMessage('');
            } else {
                toast.error('Error sending message.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Box bg='#1A202C' borderRadius='lg' color='white' mt='1.2rem' p='3'>
                <Center mb='1rem'>
                    <Box>
                        <Text as='b' fontSize='lg' py='2'>Contact us</Text>
                        <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
                    </Box>
                </Center>
                <Flex borderRadius='md' mb='4'>
                    <label htmlFor='name' style={{ padding: "5px", fontWeight: 'bold' }}>Name: </label>
                    <input id='name' type='text' placeholder='Enter your name' style={{ width: '70%', borderRadius: '10px', padding: '5px', marginLeft: 'auto', color: 'black' }} value={name} onChange={handleChangeName} disabled={auth.user && auth.user.userName ? true : false} />
                </Flex>
                <Flex borderRadius='md' mb='4'>
                    <label htmlFor='email' style={{ padding: "5px", fontWeight: 'bold' }}>Email: </label>
                    <input id='email' type='text' placeholder='Enter your email' style={{ width: '70%', borderRadius: '10px', padding: '5px', marginLeft: 'auto', color: 'black' }} value={email} onChange={handleChangeEmail} disabled={auth.user && auth.user.email ? true : false} />
                </Flex>
                <Flex borderRadius='md' mb='4'>
                    <label htmlFor='message' style={{ padding: "5px", fontWeight: 'bold' }}>Message: </label>
                    <textarea
                        id='message'
                        placeholder='Max 1000 characters'
                        style={{ width: '70%', height: '200px', borderRadius: '10px', padding: '5px', marginLeft: 'auto', color: 'black' }}
                        value={message}
                        onChange={handleChangeMessage}
                    />
                </Flex>

                <Center>
                    <Button bg="#beef00" w="30%" color="black" px="4" onClick={handleSubmit}>
                        Send
                    </Button>
                </Center>
            </Box>
            <ToastContainer />
        </div>
    )
}

export default ContactUs