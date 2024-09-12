import React from 'react';
import { Flex, Text, Link } from "@chakra-ui/react"
import { SocialIcon } from 'react-social-icons';
function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A202C', padding: '1rem', marginTop: '1rem' }}>
      <Flex justifyContent="center" alignItems="center">
        <Flex justifyContent="space-evenly" mb="1rem" w={["100%", "60%"]} color='#666'>
          <Link href="/faq">
            <Text>FAQ</Text>
          </Link>
          <Text>|</Text>
          <Link href="/useragreement">
            <Text>User Agreement</Text>
          </Link>
          <Text>|</Text>
          <Link href="/privacypolicy">
            <Text>Privacy Policy</Text>
          </Link>
          <Text>|</Text>
          <Link href="/contactus">
            <Text>Contact Us</Text>
          </Link>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Flex justifyContent="space-evenly" my="1rem" w={["100%", "60%"]} color='#666'>
          <SocialIcon url="https://twitter.com/jaketrent" style={{ width: '40px', height: '40px', marginRight: '1rem' }} />
          <SocialIcon url="https://facebook.com/jaketrent" style={{ width: '40px', height: '40px', marginRight: '1rem' }} />
          <SocialIcon url="https://instagram.com/jaketrent" style={{ width: '40px', height: '40px', marginRight: '1rem' }} />
          <SocialIcon url="https://youtube.com/jaketrent" style={{ width: '40px', height: '40px', marginRight: '1rem' }} />
          <SocialIcon url="https://tiktok.com/jaketrent" style={{ width: '40px', height: '40px', marginRight: '1rem' }} />
        </Flex>
      </Flex>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          &copy; 2024 NA, Inc. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
export default Footer;



