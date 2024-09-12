

import React, { useState } from "react";
import {
    Box,
    Flex,
    Image,
    Spacer,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Center,
    Modal,
    ModalOverlay,
    ModalFooter,
    ModalBody,
    Button,
    ModalContent
} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleQuestion, faArrowRightFromBracket, faUser, faHistory } from '@fortawesome/free-solid-svg-icons';
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
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


import RenderNotificaton from "./Notification";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const logout = useLogout();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const profilePictures = [ProfilePicture1, ProfilePicture2, ProfilePicture3, ProfilePicture4, ProfilePicture5, ProfilePicture6, ProfilePicture7, ProfilePicture8, ProfilePicture9, ProfilePicture10, ProfilePicture11, ProfilePicture12, ProfilePicture13, ProfilePicture14, ProfilePicture15, ProfilePicture16];
    
    const handleClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleLogoutModalClose = () => {
        setIsLogoutModalOpen(false);
    }


    const logoutHandler = async () => {
        try {
            await logout();
            localStorage.removeItem('userTickets');
            localStorage.removeItem('systemTickets');
            navigate("/")
            setIsLogoutModalOpen(false);
            toast.success("Logged out successfully!")
        } catch (err) {
            if (!err?.response) {
                alert('No Server Response');
            } else if (err.response?.status === 401) {
                alert('Unauthorized Access!');
            } else {
                alert('log out failed: ' + err);
            }
        }
    }

    return (
        <>
            <Modal isOpen={isLogoutModalOpen} onClose={handleLogoutModalClose} isCentered>
                <ModalOverlay />
                <ModalContent style={{ backgroundColor: '#1A202C', color: 'white', width: '95%' }}>
                    <ModalBody>
                        <Center as='b' fontSize='xl' mt='4'>Are you sure you want to logout?</Center>
                    </ModalBody>
                    <ModalFooter color='black'>
                        <Button onClick={handleLogoutModalClose} mr="2" bg="#F0EEED">
                            Cancel
                        </Button>
                        <Button
                            bg={'red'}
                            onClick={() => { logoutHandler() }}
                            color='white'
                            as='b'
                        >
                            Logout
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box bg="#1A202C" position="fixed" top="0" left="0" right="0" zIndex="4" >
                <Flex maxW="1200px" mx="auto">
                <Link to="/">
    <Flex alignItems="center" ml={4}>
        <Image src={'/'} alt="" boxSize="70px" mr={3} />
        <Text
            fontSize={["lg","2xl"]}   // Larger font size for more impact
            fontWeight="bold"
            color="white"
            textTransform="uppercase" // Make the text uppercase
            letterSpacing="wider" // Increase the spacing between letters
            fontFamily="'Angkor', sans-serif" // Use a custom font like Poppins (can include in project)
            textShadow="2px 2px 8px rgba(0, 0, 0, 0.6)" // Add a subtle shadow for a glowing effect
        >
        </Text>
    </Flex>
</Link>

                    <Spacer />
                    <Flex color="#F7FAFC" display={{ base: "none", md: "flex" }} alignItems="center">
                        {auth.user && auth.user.userRole === 7835 &&
                            <Link to="/admindashboard">
                                <Text fontWeight="bold" color='white' mr='4'>Dashboard</Text>
                            </Link>
                        }
                        <Link to="/buyticket">
                            <Text fontWeight="bold" mr="4">Buy Tickets</Text>
                        </Link>
                        <Link to="/award">
                            <Text fontWeight="bold" mr="4">Awards</Text>
                        </Link>
                        {auth.user ? (
                            <>
                                <Link to="#" onClick={handleClick}>
                                    <Text fontWeight="bold" mr="4">
                                        Notifications
                                    </Text>
                                </Link>
                                <RenderNotificaton isOpen1={isOpen} onClose1={handleClose} />
                                <Menu>
                                    <MenuButton>
                                        <Image
                                            src={(auth.user.picturePath === null || auth.user.picturePath === '') ? profilePictures[auth.user.randomizedProfilePicture - 1] : auth.user.picturePath}
                                            alt="profile"
                                            borderRadius="full"
                                            boxSize="50px"
                                            mr="4"
                                            border='#beef00 solid 2px'
                                        />
                                    </MenuButton>
                                    <MenuList bg="#1A202C" px='2.5rem'>
                                        <MenuItem as={Link} to={`/profile/${auth.user.userId}`} bg="#1A202C">
                                            <FontAwesomeIcon icon={faUser} />
                                            <Text as='b' mx='4'>
                                                Profile
                                            </Text>
                                        </MenuItem>
                                        <MenuItem as={Link} to="/setting" bg="#1A202C">
                                            <FontAwesomeIcon icon={faGear} />
                                            <Text as='b' mx='4'>
                                                Setting
                                            </Text>
                                        </MenuItem>
                                        <MenuItem as={Link} to="/faq" bg="#1A202C">
                                            <FontAwesomeIcon icon={faCircleQuestion} />
                                            <Text as='b' mx='4'>
                                                FAQ
                                            </Text>
                                        </MenuItem>
                                        <MenuItem as={Link} to="/orderhistory" bg="#1A202C">
                                            <FontAwesomeIcon icon={faHistory} />
                                            <Text as='b' mx='4'>
                                                Order history
                                            </Text>
                                        </MenuItem>
                                        <MenuItem bg="#1A202C">
                                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                            <Text as='b' mx='4' onClick={() => setIsLogoutModalOpen(true)} >
                                                Log out
                                            </Text>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Text fontWeight="bold" mr="4">Sign in</Text>
                                </Link>
                                <Link to="/register">
                                    <Text fontWeight="bold" mr="4">Register</Text>
                                </Link>
                            </>
                        )}
                    </Flex>
                    <Box display={{ base: "block", md: "none" }}>

                        <Menu>
                            <Flex p='4'>
                                {auth.user && auth.user.userRole === 7835 &&
                                    <MenuItem mr='-20%'>
                                        <Link to="/admindashboard">
                                            <Text fontWeight="bold" color='white'>Dashboard</Text>
                                        </Link>
                                    </MenuItem>
                                }
                                <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HamburgerIcon />}
                                    variant="outline"
                                    bg='#7E8C9A'
                                />
                            </Flex>
                            <MenuList bg="#1A202C" px='2.5rem' color="white">
                                {auth.user &&
                                    <MenuItem bg="#1A202C">
                                        <Link to={`/profile/${auth.user.userId}`}>
                                            <Flex>
                                                <Image
                                                    src={(auth.user.picturePath === null || auth.user.picturePath === '') ? profilePictures[auth.user.randomizedProfilePicture - 1] : auth.user.picturePath}
                                                    alt="profile"
                                                    borderRadius="full"
                                                    boxSize="50px"
                                                    mr="4"
                                                    border='#beef00 solid 2px'
                                                />
                                                <Text fontWeight="bold" mr="4" mt='3'>
                                                    {auth.user.userName}
                                                </Text>
                                            </Flex>
                                        </Link>

                                    </MenuItem>
                                }
                                <MenuItem bg="#1A202C">
                                    <Link to="/buyticket">
                                        <Text fontWeight="bold" mr="4">Buy tickets</Text>
                                    </Link>
                                </MenuItem>
                                <MenuItem bg="#1A202C">
                                    <Link to="/award">
                                        <Text fontWeight="bold" mr="4">Awards</Text>
                                    </Link>
                                </MenuItem>
                                {auth.user ? (
                                    <>
                                        <MenuItem bg="#1A202C">
                                            <Link to="/notification">
                                                <Text fontWeight="bold" mr="4">Notifications</Text>
                                            </Link>
                                        </MenuItem>

                                        <MenuItem bg="#1A202C">
                                            <Link to="/orderhistory">
                                                <Text fontWeight="bold" mr="4">Order history</Text>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem bg="#1A202C">
                                            <Link to="/setting">
                                                <Text fontWeight="bold" mr="4">Setting</Text>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem bg="#1A202C">
                                            <Link to="/faq">
                                                <Text fontWeight="bold" mr="4">FAQ</Text>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem bg="#1A202C">
                                            <button>
                                                <Text fontWeight="bold" mr="4" onClick={() => setIsLogoutModalOpen(true)}>Logout</Text>
                                            </button>
                                        </MenuItem>


                                    </>
                                ) : (
                                    <>
                                        <MenuItem bg="#1A202C">
                                            <Link to="/login">
                                                <Text fontWeight="bold" mr="4">Sign in</Text>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem bg="#1A202C">
                                            <Link to="/register">
                                                <Text fontWeight="bold" mr="4">Register</Text>
                                            </Link>
                                        </MenuItem>
                                    </>
                                )

                                }
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
                <ToastContainer />
            </Box>
        </>
    );
};

export default NavBar;
