import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, Link, ModalBody, Text, FormControl, Input, ModalFooter, Center } from "@chakra-ui/react";
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generateUserId = () => {
  const userId = uuidv4();
  return userId;
};

function isValidName(name) {
  // Regular expression pattern to match valid name
  const namePattern = /^[a-zA-Z\s]+$/;

  // Check if the name matches the pattern
  return namePattern.test(name);
}

const isValidEmail = (email) => {
  // Email validation logic
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

function isValidPassword(password) {
  // Regular expression pattern to match valid password
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  // Check if the password matches the pattern
  return passwordPattern.test(password);
}


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    password: '',
    userName: '',
    confirmPassword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState();
  const [otp, setOtp] = useState();
  const [agree, setAgree] = useState(false);
  const userId = generateUserId();
  const [errors, setErrors] = useState({});
  let attempts = 0;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.userName) {
      validationErrors.userName = 'User name is required';
    }
    else if (formData.userName.length > 20) {
      validationErrors.userName = 'User name must not be longer than 20 Characters';
    } else if (formData.userName.length < 3) {
      validationErrors.userName = 'User name must have at least 3 characters';
    }
    else if (!isValidName(formData.userName)) {
      validationErrors.userName = 'Enter a valid user name';
    }

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Enter a valid email';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      validationErrors.password =
        'Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, and one number.';
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Password does not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
        if (!agree) {
            toast.error("You must agree to the Terms of Service and Privacy Policy before signing up.");
            return; // You might want to return or handle the error here
          }
          const OTP = Math.random().toString(36).substring(2, 12);
          setOtp(OTP);
          
      axios
        .post("/send_recovery_email_not_secure", {
          OTP,
          recipient_email: formData.email,
        })
        .then(()=>setIsModalOpen(true))
        .catch(console.log);
    }
  };
  const handleChangeCode = (e) =>{
    setCode(e.target.value);
  }
  const toggleAgree = () => {
    setAgree(prev => !prev);
  }

  const handleVerification = async () => {
    // const { email } = formData;
    if(code == otp){
      const { email, password, userName } = formData;
      const insertPayload = { userId, email, password, userName };

      try {
        const response = await axios.post("/users", JSON.stringify(insertPayload), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

        if (response.status === 200) {
          toast.success("Verification sccessful! please login to your account.");
            setTimeout(() => {
              navigate("/login")
            }, 2500);
        }else{
          setOtp();
          setCode();
          toast.error("Registration failed!");
        }
      } catch (err) {
        if (!err?.response) {
          toast.error('No Server Response');
        } else {
          setOtp();
          setCode();
          toast.error('Registration failed: ' + err.response.data.message);
        }
      }
    }else{
      attempts++;
      if(attempts === 5){
        setOtp();
        setIsModalOpen(false);
        attempts = 0;
        return toast.error("You attempted 5 times and failed. Please try again.");
      }
      toast.error("Wrong verification code!");
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen}>
      <ModalOverlay />
      <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
        <ModalHeader>Enter Verification Code</ModalHeader>
        <ModalBody>
        <Text>We sent you an email with a 10-character verification code to your email {formData.email}. If you cannot find it, please check in spam mails.</Text>
          <FormControl mt='3'>
            <Input value={code} onChange={handleChangeCode} placeholder='Enter your verification code here' />
          </FormControl>
        </ModalBody>

        <ModalFooter color='black'>
          <Button mr={3} onClick={handleVerification} bg='#beef00'>
            Confirm
          </Button>
          <Button bg="#F0EEED" onClick={()=>{setIsModalOpen(false)}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Center style={{ backgroundColor: "#2D3748", marginTop: '10vh' }}>
    <Box bg='#1A202C' borderRadius='md' p='3'>
      <Center fontSize={'xl'} as='b' color='white'>Create an account</Center>
      <Box>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            style={{
              borderRadius: '0.25rem',
              width: '300px',
              height: '40px',
              padding: '1rem',
              margin: '1rem'
            }}
            placeholder="Please enter your name"
          />
          {errors.userName && <div style={{ color: 'red' }}>{errors.userName}</div>}
        </div>
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
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              borderRadius: '0.25rem',
              width: '300px',
              height: '40px',
              padding: '1rem',
              margin: '1rem'
            }}
            placeholder="Please enter your password"
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
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
              margin: '1rem'
            }}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
        </div>
        <Box color='white' mx='1rem' w='300px'>
          <input style={{marginRight: '10px'}}type="checkbox" id="agree" onChange={toggleAgree} checked={agree} />
        <label htmlFor="agree">I have read and agree to the Terms of Service and Privacy Policy.</label>
        </Box>
        <Flex mt='3' mr='1rem' justifyContent='center'>
          {/* <Link href="#"> */}
          <Button type="submit" m={['0.5%', '1%']} bg='#beef00' fontSize={['lg', 'xl']} color='black'>Sign Up</Button>
          {/* </Link> */}
        </Flex>
      </form>
      </Box>
      </Box>
      </Center>
      <Box mt='4' color='white'>
        <Center>
            <Text>Already have an account?</Text>
            <Link href="./login">
      <Text as='u' size='md' color='#beef00' mx='2'>
        Login
      </Text>
      </Link>
        </Center>
      </Box>
      <ToastContainer />
    </>
  );
};

export default SignUpForm;