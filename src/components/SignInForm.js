import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Flex, Button, Text, Center, Link } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { auth, setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errors, setErrors] = useState({});

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
      validationErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const { email, password } = formData;
      const payload = { email, password };
      try {
        const response = await axios.post("/users/login", JSON.stringify(payload), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        if (response.data.success) {
          const accessToken = response.data.accessToken;
          const user = response.data.result;
          const authNewTickets = response.data.newTickets;
          const roundNumber = response.data.roundNumber;
          setAuth({ accessToken, user, authNewTickets, roundNumber });
          // setAuthNewTickets(newTickets);
          toast.success("Successfully logged in!");
          navigate(from, { replace: true });
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        if (!err?.response) {
          toast.error('No Server Response');
        } else if (err.response?.status === 400) {
          toast.error('Missing username or password');
        } else if (err.response?.status === 401) {
          toast.error('Unauthorized!');
        } else {
          toast.error("Login Failed!");
        }
      }
    }
  };

  const isValidEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div>
      <Center style={{ backgroundColor: "#2D3748", marginTop: '10vh' }}>
        <Box bg='#1A202C' borderRadius='md' p='3'>
          <Center fontSize={'xl'} as='b' color='white'>Welcome Back</Center>
          <Center fontSize={'xl'} as='b' color='white'>Please sign in here</Center>
          <Box>
            <form onSubmit={handleSubmit}>
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
                    margin: '1rem',
                  }}
                  placeholder="Please enter your email"
                />
                {errors.email && <div style={{ color: 'red', marginLeft: '1rem' }}>{errors.email}</div>}
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
                    margin: '1rem',
                  }}
                  placeholder="Please enter your password"
                />
                {errors.password && <div style={{ color: 'red', marginLeft: '1rem' }}>{errors.password}</div>}
                <Flex color='white' mx='1rem' justifyContent='space-between'>
                  <Box>
                    <input style={{ marginRight: '10px' }} type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
                    <label htmlFor="persist">Remember me</label>
                  </Box>
                  <Link href="./forgotpassword">
                    <Text as='u' size='md'>Forgot password?</Text>
                  </Link>
                </Flex>
              </div>
              <Flex mt='3' mr='1rem' justifyContent='center'>
                <Button type="submit" m={['0.5%', '1%']} bg="#beef00" fontSize={['lg', 'xl']} color="black">Sign In</Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Center>
      <Box mt='4' mb='8rem' color='white'>
        <Center>
          <Text>Don't have an account?</Text>
          <Link href="./register">
            <Text as='u' size='md' color='#beef00' mx='2'>Create Account</Text>
          </Link>
        </Center>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default SignInForm;
