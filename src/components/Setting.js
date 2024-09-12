import React, {useState} from 'react'
import { Text, Divider, Box, Flex, Image, Center, Button, Grid, FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Link, Switch } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function isValidName(name) {
  const namePattern = /^[a-zA-Z\s]+$/;
  return namePattern.test(name);
}
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

function isValidPassword(password) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordPattern.test(password);
}

const Setting = () => {
  const { auth } = useAuth();
  const [isPrivate, setIsPrivate] = useState(auth.user.isPrivate);
  // const [isWalletReady, setIsWalletReady] = useState(auth.user.isWalletReady);
  const axiosPrivate = useAxiosPrivate();
  const profilePictures = [ProfilePicture1, ProfilePicture2, ProfilePicture3, ProfilePicture4, ProfilePicture5, ProfilePicture6, ProfilePicture7, ProfilePicture8, ProfilePicture9, ProfilePicture10, ProfilePicture11, ProfilePicture12, ProfilePicture13, ProfilePicture14, ProfilePicture15, ProfilePicture16];
  const profilePictureIndex = auth.user.randomizedProfilePicture - 1;

  const handleSwitchChange = () => {
    const userId = auth.user.userId;
      try{
        axiosPrivate.post('/users/updateuser', {userId, isPrivate: (!isPrivate)})
        .then((response) => {
          if(response.data.success){
            setIsPrivate(!isPrivate);
            if(!isPrivate) toast.success("Your profile is private now.");
            if(isPrivate) toast.success("Your profile is public now.");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }else{
            toast.error("Updating user information failed!");
          }
        })
        .catch(console.log)
      }catch(error){
        console.log(error);
        toast.error(error);
      }
  };
  // const handleWalletReadySwitchChange = () => {
  //   const userId = auth.user.userId;
  //     try{
  //       axiosPrivate.post('/users/updateuser', {userId, isWalletReady: (!isWalletReady)})
  //       .then((response) => {
  //         if(response.data.success){
  //           setIsWalletReady(!isWalletReady);
  //           if(!isWalletReady) toast.success("Your wallet is ready now.");
  //           if(isWalletReady) toast.success("Wallet was set to 'Not Ready Mode'.");
  //           setTimeout(() => {
  //             window.location.reload();
  //           }, 3000);
  //         }else{
  //           toast.error("Updating wallet information failed!");
  //         }
  //       })
  //       .catch(console.log)
  //     }catch(error){
  //       console.log(error);
  //       toast.error(error);
  //     }
  // };
  return (
    <div>
      <Center fontSize={['30px', '35px']} as='b' color='white' mb='3'>
      Setting
      </Center>
      <Divider />
      <Box>
        <Center>
      <Image
              src={(auth.user.picturePath === null || auth.user.picturePath === '') ? profilePictures[profilePictureIndex]: auth.user.picturePath}
              alt='User Profile'
              w={['180px', '300px']}
              h={['180px', '300px']}
              borderRadius='10%'
              border='#beef00 solid 3px'
              mt='2rem'
              objectFit="cover" // Crop the image to fit the container
              objectPosition="center" />
              </Center>
              <Center>
              <Link href="./changeprofilepicture">
      <Button w={['180px','300px']} bg='#beef00' color='black' mt='2'>
        Change Profile Picture
      </Button>
      </Link>
      </Center>
      </Box>
      <Center>
      <Flex w={['250px','300px']} mt='4' p='4' bg="#1A202C" justifyContent='space-between' borderRadius='md' color='white'>
        <Text>Turn on private profile</Text>
      <Switch size='md' isChecked={isPrivate} onChange={handleSwitchChange} />
      </Flex>
      </Center>
      <Center>
      {/* <Flex w={['250px','300px']} mt='4' p='4' bg="#1A202C" justifyContent='space-between' borderRadius='md' color='white'>
        <Text>Wallet is ready</Text>
      <Switch size='md' isChecked={isWalletReady} onChange={handleWalletReadySwitchChange} />
      </Flex> */}
      </Center>
      <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
      gap="1rem"
      mt="4"
    >
      {ChangeName({ userId: auth.user.userId, userName: auth.user.userName })}
      {ChangeBirthday({ userId: auth.user.userId, birthday: auth.user.birthday })}
      {ChangeEmail({ userId: auth.user.userId, email: auth.user.email })}
      {ChangePassword({ userId: auth.user.userId, email: auth.user.email})}
      </Grid>
      {ChangeSocialMedia({ userId: auth.user.userId, facebook: auth.user.facebook,instagram: auth.user.instagram, twitter: auth.user.twitter })}
      {ChangeWalletAddress({ userId: auth.user.userId, email: auth.user.email, walletAddress: auth.user.walletAddress, network: auth.user.network })}
    </div>
  )
}

const ChangeName = ({ userId, userName }) => {
  const [newName, setNewName] = useState('');
  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = () => {
    if(!isValidName(newName)) return toast.error("User name must only contains letters and space(' ')");
    if(newName.length < 3) return toast.error("User name must have at least 3 characters.");
    if(newName.length > 20) return toast.error("User name must not exceed 20 characters.")
    try{
      axiosPrivate.post('/users/updateuser', {userId, userName: newName})
      .then((response) => {
        if(response.data.success){
          setNewName('');
          toast.success("Updated user name successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }else{
          toast.error("Update user name failed!");
        }
      })
      .catch(console.log)
    }catch(error){
      console.log(error);
      toast.error(error);
    }
  };
  return(
    <Box bg='#1A202C' borderRadius='lg' p='1rem' color='white' mt={['1','1rem']}>
        <Center  mb='1rem'>
        <Box>
          <Text as='b' fontSize='lg' pb='2'>Change Name</Text>
          <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
        </Box>
        </Center>
        <Flex bg='#2D3748' borderRadius='md' mb='4'>
          <Text p='2' mr='1rem'>Current Name:</Text>
          <Box borderRadius='md' p='2'><Center>{userName}</Center></Box>
        </Flex>
        <Flex borderRadius='md' mb='4'>
          <input type='text' placeholder='Enter a new name' style={{width:'100%', borderRadius:'10px', padding: '5px', marginRight: 'auto', color: 'black'}} value={newName} onChange={handleChange} />
        </Flex>
        <Center>
    <Button bg="#beef00" w="40%" color="black" px="4"  onClick={handleSubmit}>
        Update
      </Button>
    </Center>
    <ToastContainer />
      </Box>
  )
}
const ChangeBirthday = ({ userId, birthday }) =>{
  const [newDate, setNewDate] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const handleChange = (e) => {
    setNewDate(e.target.value);
  };

  const handleSubmit = () => {
    if(newDate == null) return toast.error("Invalid date!");
    try{
      axiosPrivate.post('/users/updateuser', {userId, birthday: newDate})
      .then((response) => {
        if(response.data.success){
          setNewDate(null);
          toast.success("Updated user birthday successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }else{
          toast.error("Update user birthday failed!");
        }
      })
      .catch(console.log)
    }catch(error){
      console.log(error);
      toast.error(error);
    }
  };
  return(
    <Box bg='#1A202C' borderRadius='lg' p='1rem' color='white' mt={['1','1rem']}>
        <Center  mb='1rem'>
        <Box>
          <Text as='b' fontSize='lg' pb='2'>Change Birthday</Text>
          <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
        </Box>
        </Center>
        <Flex bg='#2D3748' borderRadius='md' mb='4'>
          <Text p='2' mr='1rem'>Current Birthday:</Text>
          <Box borderRadius='md' p='2'><Center>{birthday ? birthday:"NA"}</Center></Box>
        </Flex>
        <Flex borderRadius="md" mb='4'>
        <label htmlFor="dateInput" style={{padding: '5px'}}>Choose Birthday:</label>
      <input
        type="date"
        id="dateInput"
        value={newDate}
        onChange={handleChange}
        style={{ width: '50%', borderRadius: '10px', padding: '5px', marginLeft: 'auto', color: 'black' }}
      />
    </Flex>
    <Center>
    <Button bg="#beef00" w="40%" color="black" px="4"  onClick={handleSubmit}>
        Update
      </Button>
    </Center>
    <ToastContainer />
      </Box>
  )
}

const ChangeEmail = ({ userId, email }) =>{
  const [newEmail, setNewEmail] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [code, setCode] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [otp, setOtp] = useState();
  let attempts = 0;
  const handleChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleChangeCode = (e) =>{
    setCode(e.target.value);
  }

  const handleChangePassword = (e) =>{
    setEnteredPassword(e.target.value);
  }

  const handleEmail = () => {
    if(!isValidEmail(newEmail)) return toast.error("Invalid Email!");
    axiosPrivate
    .post("/checkemail", { email: newEmail })
    .then((response) => {
      if (response.data.emailExists) {
        return toast.error("Email already exists!");
      }

      // Generate OTP if email does not exist
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let OTP = '';
      for (let i = 0; i < 8; i++) {
        OTP += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      setOtp(OTP);

      // Send recovery email
      axiosPrivate
        .post("/send_recovery_email", {
          OTP,
          recipient_email: newEmail,
        })
        .then(() => setIsPasswordModalOpen(true))
        .catch(console.log);
    })
    .catch((error) => {
      console.error(error);
      toast.error("An error occurred while checking the email!");
    });
};
  const passwordCheck = () => {
    axiosPrivate.post('users/checkpassword', { userId, password: enteredPassword})
    .then((response) => {
      const { isPasswordValid } = response.data;
      if(!isPasswordValid) return toast.error("Incorrect Passowrd!");
      setIsPasswordModalOpen(false);
      setIsModalOpen(true);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const handleSubmit = () => {
    if(code === otp){
      setCode("");
      try{
        axiosPrivate.post('/users/updateuser', {userId, email: newEmail})
        .then((response) => {
          if(response.data.success){
            setNewEmail(null);
            toast.success("Email was updated successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }else{
            toast.error("Update user email failed!");
          }
        })
        .catch(console.log)
      }catch(error){
        console.log(error);
        toast.error(error);
      }
      setIsModalOpen(false);
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
  };
  return(
    <>
    <Modal isOpen={isModalOpen}>
      <ModalOverlay />
      <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
        <ModalHeader>Enter Verification Code</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text>We sent you an email with 8 verification codes to your new email {newEmail}. If you cannot find it, please check in spam mails.</Text>
          <FormControl mt='3'>
            {/* <FormLabel>Enter a value:</FormLabel> */}
            <Input value={code} onChange={handleChangeCode} placeholder='Enter your verification code here' />
          </FormControl>
        </ModalBody>

        <ModalFooter color='black'>
          <Button mr={3} onClick={handleSubmit} bg='#beef00'>
            Confirm
          </Button>
          <Button bg="#F0EEED" onClick={()=>{setIsModalOpen(false)}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Modal isOpen={isPasswordModalOpen}>
      <ModalOverlay />
      <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
        <ModalHeader>Enter Verification Code</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text>Please enter your password to change your email.</Text>
          <FormControl mt='3'>
            {/* <FormLabel>Enter a value:</FormLabel> */}
            <Input type='password' value={enteredPassword} onChange={handleChangePassword} placeholder='Enter your password here' />
          </FormControl>
        </ModalBody>

        <ModalFooter color='black'>
          <Button mr={3} onClick={passwordCheck} bg='#beef00'>
            Change
          </Button>
          <Button bg="#F0EEED" onClick={()=>{setIsPasswordModalOpen(false)}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Box bg='#1A202C' borderRadius='lg' p='1rem' color='white' mt={['1','1rem']}>
        <Center  mb='1rem'>
        <Box>
          <Text as='b' fontSize='lg' pb='2'>Change Email</Text>
          <br />
          <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
        </Box>
        </Center>
        <Flex bg='#2D3748' borderRadius='md' mb='4'>
          <Text p='2' mr='1rem'>Your Email:</Text>
          <Box borderRadius='md' p='2'><Center>{email}</Center></Box>
        </Flex>
        <Flex borderRadius='md' mb='4'>
          <input type='text' placeholder='Enter a new email' style={{width:'100%', borderRadius:'10px', padding: '5px', marginRight: 'auto', color: 'black'}} value={newEmail} onChange={handleChange} />
        </Flex>
        <Center>
    <Button bg="#beef00" w="40%" color="black" px="4" onClick={handleEmail}>
        Update
      </Button>
    </Center>
    <ToastContainer />
      </Box>
    </>
  )
}

const ChangePassword = ({ userId, email }) =>{
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [otp, setOtp] = useState();
  let attempts = 0;
  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };
  const handlePassword = () => {
    if(!isValidPassword(newPassword)) return toast.error("Password must have at least 8 characters with one uppercase letter, one lowercase letter and one digit.");
    if(confirmPassword !== newPassword) return toast.error("Passwords do not match.");
    const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOtp(OTP);

      axiosPrivate
        .post("/send_change_password_email", {
          OTP,
          recipient_email: email,
        })
        .then(()=>setIsModalOpen(true))
        .catch(console.log);
  }
  const handleSubmit = () => {
    if(code === otp){
      try{
        axiosPrivate.post('/users/updateuser', {userId, password: newPassword})
        .then((response) => {
          if(response.data.success){
            setNewPassword('');
            setConfirmPassword('');
            toast.success("Updated user password successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }else{
            toast.error("Update user password failed!");
          }
        })
        .catch(console.log)
      }catch(error){
        console.log(error);
        toast.error(error);
      }
      setIsModalOpen(false);
    }else{
      attempts++;
      if(attempts === 5){
        setOtp();
        setCode();
        setIsModalOpen(false);
        attempts = 0;
        return toast.error("You attempted 5 times and failed. Please try again.");
      }
      toast.error("Wrong verification code!");
    }
  };
  return(
    <>
    <Modal isOpen={isModalOpen}>
      <ModalOverlay />
      <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
        <ModalHeader>Enter Verification Code</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text>We sent you an email with 4 verification codes to your email {email}. If you cannot find it, please check in spam mails.</Text>
          <FormControl mt='3'>
            {/* <FormLabel>Enter a value:</FormLabel> */}
            <Input value={code} onChange={handleChangeCode} placeholder='Enter your verification code here' />
          </FormControl>
        </ModalBody>

        <ModalFooter color='black'>
          <Button mr={3} onClick={handleSubmit} bg='#beef00'>
            Confirm
          </Button>
          <Button bg="#F0EEED" onClick={()=>{setIsModalOpen(false)}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Box bg='#1A202C' borderRadius='lg' p='1rem' color='white' mt={['1','1rem']}>
        <Center  mb='1rem'>
        <Box>
          <Text as='b' fontSize='lg' pb='2'>Change Password</Text>
          <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
        </Box>
        </Center>
        <Flex borderRadius='md' mb='4'>
          <input type='password' placeholder='Enter a new password' style={{width:'100%', borderRadius:'10px', padding: '5px', marginRight: 'auto', color: 'black'}} value={newPassword} onChange={handleChange} />
        </Flex>
        <Flex borderRadius='md' mb='4'>
          <input type='password' placeholder='Re-enter password' style={{width:'100%', borderRadius:'10px', padding: '5px', marginRight: 'auto', color: 'black'}} value={confirmPassword} onChange={handleChangeConfirmPassword} />
        </Flex>
        <Center>
    <Button bg="#beef00" w="40%" color="black" px="4"  onClick={handlePassword}>
        Update
      </Button>
    </Center>
      </Box>
      </>
  )
}

const ChangeSocialMedia = ({ userId, facebook,instagram, twitter }) => {
  const [newFacebook, setNewFacebook] = useState(facebook===null?'':facebook);
  const [newInstagram, setNewInstagram] = useState(instagram===null?'':instagram);
  const [newTwitter, setNewTwitter] = useState(twitter===null?'':twitter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleChangeFacebook = (e) => {
    setNewFacebook(e.target.value);
  };

  const handleChangeInstagram = (e) => {
    setNewInstagram(e.target.value);
  };

  const handleChangeTwitter = (e) => {
    setNewTwitter(e.target.value);
  };

  const isLinksValid = ()=>{
    if(!(newFacebook.length === 0 || (newFacebook.length>24 && (newFacebook.startsWith('https://m.facebook.com/') || newFacebook.startsWith('https://web.facebook.com/'))))) return toast.error("Invalid facebook profile link.\n It should start with https://web.facebook.com/");
    if (!(newTwitter.length === 0 || (newTwitter.length > 21 && newTwitter.startsWith('https://twitter.com/')))) return toast.error("Invalid Twitter profile link.\n It should start with https://twitter.com/");
    if (!(newInstagram.length === 0 || (newInstagram.length > 26 && newInstagram.startsWith('https://www.instagram.com/')))) return toast.error("Invalid Instagram profile link.\n It should start with https://www.instagram.com/");
    setIsModalOpen(true);
  }

  const handleSubmit = () => {
    if(newFacebook.length === 0) setNewFacebook("nothing");
    if(newInstagram.length === 0) setNewInstagram("nothing");
    if(newTwitter.length === 0) setNewTwitter("nothing");
    try{
        axiosPrivate.post('/users/updateuser', {userId, facebook: newFacebook, instagram: newInstagram, twitter: newTwitter})
        .then((response) => {
          if(response.data.success){
            // setNewName('');
            toast.success("Updated social media links successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }else{
            toast.error("Update social media links failed!");
          }
        })
        .catch(console.log)
      }catch(error){
        console.log(error);
        toast.error(error);
      }
  };
  return(
    <>
    <Modal isOpen={isModalOpen}>
      <ModalOverlay />
      <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
        <ModalHeader>Confirm Update</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          { newFacebook.length ===0 && newTwitter.length === 0 && newInstagram.length === 0 &&
          <Text>You did not enter any social media links, which means your social media connection will all be deleted. Do you want to continue update?</Text>}
          { newFacebook.length > 26 &&
          <Box m='3'>
          <Box mb='2'>Facebook link:</Box>
          <Box p='3' bg='#F0EEED' borderRadius='10px' color='black'>{newFacebook}</Box>
          </Box>}
          { newTwitter.length > 25 &&
          <Box m='3'>
          <Box mb='2'>Twitter link:</Box>
          <Box p='3' bg='#F0EEED' borderRadius='10px' color='black'>{newTwitter}</Box>
          </Box>}
          { newInstagram.length > 26 &&
          <Box m='3'>
          <Box mb='2'>Instagram link:</Box>
          <Box p='3' bg='#F0EEED' borderRadius='10px' color='black'>{newInstagram}</Box>
          </Box>}
        </ModalBody>

        <ModalFooter color='black'>
          <Button mr={3} onClick={handleSubmit} bg='#beef00'>
            Update
          </Button>
          <Button bg="#F0EEED" onClick={()=>{setIsModalOpen(false)}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Box bg='#1A202C' borderRadius='lg' p='1rem' color='white' mt='1.2rem'>
        <Center mb='1rem'>
        <Box>
          <Text as='b' fontSize='lg' pb='2'>Change Social Media Links</Text>
          <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
        </Box>
        </Center>
        <Flex borderRadius='md' mb='4' mx={{md:'3rem'}}>
          <label htmlFor='instagram' style={{padding: "5px", fontWeight: 'bold'}}>Instagram: </label>
          <input type='text' placeholder='Enter your Instagram profile link' style={{width:'70%', borderRadius:'10px', padding: '5px', marginLeft: 'auto', color: 'black'}} value={newInstagram} onChange={handleChangeInstagram} />
        </Flex>
        <Flex borderRadius='md' mb='4' mx={{md:'3rem'}}>
          <label htmlFor='facebook' style={{padding: "5px", fontWeight: 'bold'}}>Facebook: </label>
          <input type='text' placeholder='Enter your Facebook profile link' style={{width:'70%', borderRadius:'10px', padding: '5px', marginLeft: 'auto', color: 'black'}} value={newFacebook} onChange={handleChangeFacebook} />
        </Flex>
        <Flex borderRadius='md' mb='4' mx={{md:'3rem'}}>
          <label htmlFor='twitter' style={{padding: "5px", fontWeight: 'bold'}}>Twitter: </label>
          <input type='text' placeholder='Enter your Twitter profile link' style={{width:'70%', borderRadius:'10px', padding: '5px', marginLeft: 'auto', color: 'black'}} value={newTwitter} onChange={handleChangeTwitter} />
        </Flex>
        <Center>
    <Button bg="#beef00" w="40%" color="black" px="4"  onClick={isLinksValid}>
        Update
      </Button>
    </Center>
    <ToastContainer />
      </Box>
    </>
  )
}

const ChangeWalletAddress = ({ userId, email ,walletAddress, network }) =>{
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [newNetworkType, setNewNetworkType] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [code, setCode] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [otp, setOtp] = useState();
  let attempts = 0;
  const handleChange = (e) => {
    setNewWalletAddress(e.target.value);
  };
  const handleChangeNetwork = (e) => {
    setNewNetworkType(e.target.value);
  };

  const handleChangeCode = (e) =>{
    setCode(e.target.value);
  }

  const handleChangePassword = (e) =>{
    setEnteredPassword(e.target.value);
  }

  const handleWalletAddress = () => {
    const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOtp(OTP);

      axiosPrivate
        .post("/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(()=>setIsPasswordModalOpen(true))
        .catch(console.log);
  }
  const passwordCheck = () => {
    axiosPrivate.post('users/checkpassword', { userId, password: enteredPassword})
    .then((response) => {
      const { isPasswordValid } = response.data;
      if(!isPasswordValid) return toast.error("Incorrect Password!");
      setEnteredPassword('');
      setIsPasswordModalOpen(false);
      setIsModalOpen(true);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const handleSubmit = () => {
    if(code === otp){
      try{
        axiosPrivate.post('/users/updateuser', {userId, walletAddress: newWalletAddress, network: newNetworkType})
        .then((response) => {
          if(response.data.success){
            setNewWalletAddress('');
            setNewNetworkType('');
            toast.success("Updated wallet address successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }else{
            toast.error("Update wallet address failed!");
          }
        })
        .catch(console.log)
      }catch(error){
        console.log(error);
        toast.error(error);
      }
      setIsModalOpen(false);
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
  };
  return(
    <>
    <Modal isOpen={isModalOpen}>
      <ModalOverlay />
      <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
        <ModalHeader>Enter Verification Code</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text>We sent you an email with 4 verification codes to your email {email}. If you cannot find it, please check in spam mails.</Text>
          <FormControl mt='3'>
            {/* <FormLabel>Enter a value:</FormLabel> */}
            <Input value={code} onChange={handleChangeCode} placeholder='Enter your verification code here' />
          </FormControl>
        </ModalBody>

        <ModalFooter color='black'>
          <Button mr={3} onClick={handleSubmit} bg='#beef00'>
            Confirm
          </Button>
          <Button bg="#F0EEED" onClick={()=>{setIsModalOpen(false)}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Modal isOpen={isPasswordModalOpen}>
      <ModalOverlay />
      <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
        <ModalHeader>Enter your account password</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text>To do this operation. You need to pass two security checks. First, enter your password to change your wallet address. Then, enter OTP from your email in the next step.</Text>
          <FormControl mt='3'>
            {/* <FormLabel>Enter a value:</FormLabel> */}
            <Input type='password' value={enteredPassword} onChange={handleChangePassword} placeholder='Enter your password here' />
          </FormControl>
        </ModalBody>

        <ModalFooter color='black'>
          <Button mr={3} onClick={passwordCheck} bg='#beef00'>
            Change
          </Button>
          <Button bg="#F0EEED" onClick={()=>{setIsPasswordModalOpen(false)}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Box bg='#1A202C' borderRadius='lg' p='1rem' color='white' mt='1.2rem'>
        <Center  mb='1rem'>
        <Box>
          <Text as='b' fontSize='lg' pb='2'>Change Wallet Address</Text>
          <br />
          <Divider w='120%' h='2px' bg='#beef00' ml='-10%' />
        </Box>
        </Center>
        {/* <Flex bg='#2D3748' borderRadius='md' mb='4'> */}
        <Box mb='4'>
          <Box mb='2' as='b'>Current network:</Box>
          <Box mb='2' p='3' bg='#2D3748' borderRadius='10px' color='white'>{network?network:"You do not have any network set up."}</Box>
          <Box mb='2' as='b'>Current wallet address:</Box>
          <Box p='3' bg='#2D3748' borderRadius='10px' color='white'>{walletAddress?walletAddress:"You do not have any wallet address."}</Box>
          </Box>
        {/* </Flex> */}
        <Flex borderRadius='md' mb='4'>
          <input type='text' placeholder='Enter a new network type' style={{width:'100%', borderRadius:'10px', padding: '8px', marginRight: 'auto', color: 'black'}} value={newNetworkType} onChange={handleChangeNetwork} />
        </Flex>
        <Flex borderRadius='md' mb='4'>
          <input type='text' placeholder='Enter a new wallet address' style={{width:'100%', borderRadius:'10px', padding: '8px', marginRight: 'auto', color: 'black'}} value={newWalletAddress} onChange={handleChange} />
        </Flex>
        <Center>
    <Button bg="#beef00" w="40%" color="black" px="4" onClick={handleWalletAddress}>
        Update
      </Button>
    </Center>
    <ToastContainer />
      </Box>
    </>
  )
}

export default Setting;