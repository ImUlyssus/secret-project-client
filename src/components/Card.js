import {  Box, Flex, Image, Text, Divider } from "@chakra-ui/react";

const Card = ({ imageUrl, userName, ticketNumber, prize }) => {
    return (
        <Box
            maxW="md"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            bg="#1A202C"
            color='white'
            borderColor="#beef00"
        >
            <Flex alignItems="center" p="2">
                <Image borderRadius='full' src={imageUrl} alt={userName} w="25%" />
                <Text ml="4" fontSize="lg" fontWeight="bold">
                    {userName}
                </Text>
            </Flex>
            <Divider />
            <Box p='2'>
                <Flex justifyContent='space-between'>
                    <Box as='b'>Ticket Number: </Box>
                    <Box as='b'>{ticketNumber}</Box>
                </Flex>
                <Flex justifyContent='space-between'>
                    <Box as='b'>Prize: </Box>
                    <Box as='b'>${prize}</Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Card
export { }