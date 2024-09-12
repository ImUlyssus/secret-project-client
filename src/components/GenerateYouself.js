import React, { CSSProperties } from 'react';
import { Divider, Input, Container, Box, Flex, HStack, Text, Center, Button, Link, LinkBox, SimpleGrid, Image, ButtonGroup, IconButton, Grid, GridItem, useMediaQuery, InputGroup, InputRightElement, FormControl, Select } from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons';
import StepIndicator from './StepIndicater';
import { FiChevronDown } from "react-icons/fi";

const GenerateYourself = () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');
    const [value4, setValue4] = React.useState('');
    const [value5, setValue5] = React.useState('');
    const [value6, setValue6] = React.useState('');
    const [value7, setValue7] = React.useState('');
    const [value8, setValue8] = React.useState('');
    const [value9, setValue9] = React.useState('');

    const handleChangeLetter = (event) => {
        const result = event.target.value.replace(/[^a-z]/gi, '');
        if (event.target.id === 'value1') {
            setValue1(result);
        } else if (event.target.id === 'value2') {
            setValue2(result);
        } else if (event.target.id === 'value3') {
            setValue3(result);
        }
    };

    const handleChangeNumber = (event) => {
        let result = event.target.value;
        if (result.length > 1) {
            result = result.slice(0, 1);
        }
        if (event.target.id === 'value4') {
            setValue4(result);
        } else if (event.target.id === 'value5') {
            setValue5(result);
        } else if (event.target.id === 'value6') {
            setValue6(result);
        } else if (event.target.id === 'value7') {
            setValue7(result);
        } else if (event.target.id === 'value8') {
            setValue8(result);
        } else if (event.target.id === 'value9') {
            setValue9(result);
        }
    };
    return (
        <div style={{ marginTop: '1rem' }}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={{ sm: '2', md: '1', lg: '4' }} mt='4' bg='#1A202C' color='white'>
                {/* First Row - Title */}
                <Text fontWeight="bold" fontSize="2xl" mb="2" p={['2', '0']}>Generates Yourself</Text>
                <Divider border='1px solid #7E8C9A' />
                {/* Second Row - Left and Right Texts */}
                <Flex justifyContent='space-between' alignItems="center" mb="4" mx={['2', '4']} mt='2' flexWrap='wrap'>
                    <Box width={['100%', '50%']} mb={[4, 0]}>
                        <Flex alignItems='center'>
                            <Text fontSize={{ base: 'sm', md: 'sm', lg: 'lg' }} mx={['1', '3']} pt={['1', '2']}>Your ticket amount</Text>
                            <Text p='2' border='1px solid #F6E05E' borderRadius='md' fontWeight='bold' fontSize={['sm', 'lg']}>1000</Text>
                        </Flex>
                    </Box>
                    <Box width={['100%', '50%']}>
                        <Flex alignItems='center' float={['left', 'right']}>
                            <Text fontSize={{ base: 'sm', md: 'sm', lg: 'lg' }} mx={['1', '3']} pt={['1', '2']}>You still have</Text>
                            <Text p='2' border='1px solid #F6E05E' borderRadius='md' fontWeight='bold' fontSize={['sm', 'lg']}>234</Text>
                            <Text fontSize={{ base: 'sm', md: 'sm', lg: 'lg' }} mx={['1', '3']} pt={['1', '2']}>tickets to generate.</Text>
                        </Flex>
                    </Box>
                </Flex>

                <Box>
                    <Grid templateColumns='repeat(7, 1fr)' mb='3'>
                        <GridItem colSpan={{ base: 7, md: 2 }} justifyContent="center" ml='4'>
                            <Flex flexDirection="row" ml={['8%', '0%']} mb={['2', '0']}>
                                {[1, 2, 3].map((num) => (
                                    <FormControl key={`value${num}`}>
                                        <Select
                                            id={`value${num}`}
                                            placeholder=""
                                            value={num === 1 ? value1 : num === 2 ? value2 : value3}
                                            onChange={handleChangeLetter}
                                            w={{ base: '61px', md: '63px', lg: '70px' }}
                                            h='3rem'
                                            border='2px solid #beef00'
                                            _focus={{ boxShadow: "none", borderColor: "blue.500" }}
                                        >
                                            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                                                <option key={letter} value={letter}><Text as='b'>{letter}</Text></option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ))}
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={{ base: 7, md: 4 }} justifyItems="center" ml='4'>
                            <Flex flexDirection="row" ml={['-7%', '0%']} mb={['2', '0']}>
                                {[4, 5, 6, 7, 8, 9].map((num) => (
                                    <FormControl key={`value${num}`}>
                                        <Select
                                            id={`value${num}`}
                                            placeholder=""
                                            value={
                                                num === 4 ? value4 :
                                                    num === 5 ? value5 :
                                                        num === 6 ? value6 :
                                                            num === 7 ? value7 :
                                                                num === 8 ? value8 : value9
                                            }
                                            onChange={handleChangeNumber}
                                            w={{ base: '61px', md: '63px', lg: '70px' }}
                                            h='3rem'
                                            border='2px solid #beef00'
                                            _focus={{ boxShadow: "none", borderColor: "blue.500" }}
                                        >
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                                                <option key={number} value={number} style={{ fontWeight: 'bold' }}>{number}</option>
                                            ))}
                                        </Select>

                                    </FormControl>
                                ))}
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={{ base: 7, md: 1 }} ml={['0', 'auto']} mr='4'>
                            <Grid justifyContent={{ base: 'center', md: 'flex-end' }}>
                                <Button style={{}} px={'2.5rem'} m={['0.5%', '1%']} h={['48px', '48px']} bg='black' border='3px solid #beef00' fontSize={['sm', 'lg']} boxShadow='md'>Generate</Button>
                            </Grid>
                        </GridItem>
                    </Grid>

                </Box>

                <Box borderWidth="1px" borderRadius="lg" h="300px" overflowY="scroll" border='2px solid #beef00' m={['0.5rem','0']}>
                    <Flex justifyContent="space-between" alignItems="center" mb='1rem' bg='#F6E05E' py='2' px='4' position="sticky" top="0" zIndex='1'>
                        <Text color='black'>Below are the tickets you have generated.</Text>
                        <Button colorScheme="red" variant='outline' bg="#B7C4CF" h={['35px', '40px']}>Remove All</Button>
                    </Flex>

                    <Grid
                        templateColumns={{
                            base: "repeat(2, 1fr)",
                            md: "repeat(4, 1fr)",
                            lg: "repeat(6, 1fr)",
                        }}
                        gap={4}
                        m='3'
                    >
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                        <CustomInputGroup placeholder="XXXabcdef" />
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}
function CustomInputGroup({ placeholder }) {
    return (
        <InputGroup>
            <Input placeholder={placeholder} mr="0" roundedRight="0" fontWeight="bold" userSelect="none" pointerEvents="none" textAlign="center" />
            <InputRightElement bg='#1A202C'>
                <Button size="md" roundedLeft="0" colorScheme={"red"}>
                    X
                </Button>
            </InputRightElement>
        </InputGroup>

    );
}

export default GenerateYourself;