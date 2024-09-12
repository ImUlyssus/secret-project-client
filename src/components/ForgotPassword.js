import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Flex, Button, Text, Center, Input, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormControl, ModalFooter } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/axios';

import LoadingModal from './LoadingModal';

function isValidPassword(password) {
    // Regular expression pattern to match valid password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Check if the password matches the pattern
    return passwordPattern.test(password);
}
const ForgotPassword = () => {

    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState();
    const [otp, setOtp] = useState();
    let attempts = 0;

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    // Function to toggle the loading modal
    const toggleLoadingModal = () => {
        setIsLoading((prev) => !prev);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            validationErrors.email = 'Enter a valid email';
        }
        if (!formData.newPassword) {
            validationErrors.newPassword = 'Please enter new password';
        } else if (!isValidPassword(formData.newPassword)) {
            validationErrors.newPassword = 'Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter and one number';
        }
        if (!formData.confirmPassword) {
            validationErrors.confirmPassword = 'Please enter confirm password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Password does not match';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            toggleLoadingModal();
            try {
                axios.post('/users/updateuser', { email: formData.email })
                    .then((response) => {
                        if (response.data.success) {
                            try {
                                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                                let OTP = '';
                                for (let i = 0; i < 8; i++) {
                                    OTP += characters.charAt(Math.floor(Math.random() * characters.length));
                                }
                                setOtp(OTP);
                                axios.post("/send_recovery_email_not_secure", { OTP, recipient_email: formData.email }, {
                                    headers: { 'Content-Type': 'application/json' },
                                    withCredentials: true
                                })
                                    .then(() => setIsModalOpen(true))
                                    .catch(console.log);
                            } catch (err) {
                                console.log(err);
                                toast.error('No Server Response');
                            }
                        } else {
                            return
                        }
                    })
                    .catch(() => {
                        toast.error('Email does not exist.');
                      });
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
            toggleLoadingModal();
        }
    };

    const handleVerificationSubmit = () => {
        if (code === otp) {
            try {
                axios.post('/users/updateuser', { password: formData.newPassword, email: formData.email })
                    .then((response) => {
                        if (response.data.success) {
                            toast.success("Updated password successfully. \n Please login again.");
                            setTimeout(() => {
                                navigate('/login')
                            }, 3000);
                        } else {
                            toast.error("Updating password failed!");
                        }
                    })
                    .catch(console.log)
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
            setIsModalOpen(false);
        } else {
            attempts++;
            if (attempts === 5) {
                setOtp();
                setCode();
                setIsModalOpen(false);
                attempts = 0;
                return toast.error("You attempted 5 times and failed. Please try again.");
            }
            toast.error("Wrong verification code!");
        }
    };

    const isValidEmail = (email) => {
        // Email validation logic
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div>
            <Modal isOpen={isModalOpen}>
                <ModalOverlay />
                <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
                    <ModalHeader>Enter Verification Code</ModalHeader>
                    <ModalBody>
                        <Text>We sent you an email a verification code to your email {formData.email}. If you cannot find it, please check in spam mails.</Text>
                        <FormControl mt='3'>
                            {/* <FormLabel>Enter a value:</FormLabel> */}
                            <Input value={code} onChange={handleChangeCode} placeholder='Enter your verification code here' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter color='black'>
                        <Button mr={3} onClick={handleVerificationSubmit} bg='#beef00'>
                            Confirm
                        </Button>
                        <Button bg="#F0EEED" onClick={() => { setIsModalOpen(false) }}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <LoadingModal isOpen={isLoading} />
            <Center style={{ backgroundColor: "#2D3748", marginTop: '10vh' }}>
                <Box bg='#1A202C' borderRadius='md' p='3'>
                    <Center fontSize={'xl'} as='b' color='white'>Reset Password</Center>
                    <Box>
                        <form onSubmit={handleSubmit}>
                            {/* <form> */}
                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: '0.25rem',
                                        width: '300px',
                                        height: '40px',
                                        padding: '1rem',
                                        margin: '1rem'
                                    }}
                                    placeholder="Please enter your email"
                                />
                                {errors.email && <div style={{ color: 'red', marginLeft: '1rem' }}>{errors.email}</div>}
                            </div>
                            <div>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: '0.25rem',
                                        width: '300px',
                                        height: '40px',
                                        padding: '1rem',
                                        margin: '1rem',
                                    }}
                                    placeholder="New password"
                                />
                                {errors.newPassword && <div style={{ color: 'red', marginLeft: '1rem' }}>{errors.newPassword}</div>}
                            </div>
                            <div>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: '0.25rem',
                                        width: '300px',
                                        height: '40px',
                                        padding: '1rem',
                                        margin: '1rem',
                                    }}
                                    placeholder="Confirm password"
                                />
                                {errors.confirmPassword && <div style={{ color: 'red', marginLeft: '1rem' }}>{errors.confirmPassword}</div>}
                            </div>
                            <Flex mt='3' justifyContent='center'>
                                <Button type="submit" m={['0.5%', '1%']} bg="#beef00" fontSize={['lg', 'xl']} color="black">
                                    Submit
                                </Button>
                            </Flex>
                            <Flex mt='3' color='white' justifyContent='center'>
                                {/* <Center> */}
                                <Link href="./login">
                                    <Text as='u' size='md' >
                                        Back to Login
                                    </Text>
                                </Link>
                                {/* </Center> */}
                            </Flex>
                        </form>
                    </Box>
                </Box>
            </Center>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;