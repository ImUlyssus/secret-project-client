import { Box, Heading, Text, Stack } from '@chakra-ui/react';
function HowItWorks() {
  return (
    <Box boxShadow='xl' borderRadius="xl" bg='#00FF7F' p={6}>
      <Heading as='h2' size='md' mb={4}>How It Works?</Heading>
      <Stack spacing={4}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        <Text>
        It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </Stack>
    </Box>
  );
}

export default HowItWorks;
