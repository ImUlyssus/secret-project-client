import { Center, Box, useBreakpointValue } from "@chakra-ui/react";
import Header from './components/Header';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import { useLayoutEffect, useState } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderPaths = ['/buyticket2', '/buyticket3', '/notification', '/profile', '/otherprofile', '/buyticket', '/privacypolicy', '/setting', '/changeprofilepicture', '/orderhistory', '/faq', '/admindashboard', '/login', '/register', '/forgotpassword', '/useragreement'];
  const showHeader = !hideHeaderPaths.some(path => location.pathname.startsWith(path));
  const isFullWidth = location.pathname.startsWith('/profile') || location.pathname.startsWith('/otherprofile');
  
  const [height, setHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    function updateHeight() {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const minHeight = useBreakpointValue({
    base: '100vh', // Small devices
    // md: '100vh',   // Medium devices
    // lg: '100vh',   // Large devices
    xl: '50vh'    // Extra large devices
  });

  return (
    <div style={{ backgroundColor: "#2D3748" }}>
      <NavBar />
      {showHeader &&
      <Center>
      <Box pt={{base:'20%', md:'12%',lg:'7%'}} w={{base:'95%', md: '94%'}}>
        <Header />
      </Box>
      </Center>}
      <Box style={{ minHeight: minHeight, display: 'flex', flexDirection: 'column' }}>
        <Center>
        <Box w={isFullWidth ? '100%' : {base:'95%', md: '85%'}} color='#262626' pt={showHeader ? '' : { base:'20%', md:'12%', lg:'7%' }}>
          {children}
        </Box>
        </Center>
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
