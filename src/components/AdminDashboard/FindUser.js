import React, { useState } from 'react'
import { Box, Flex, Button, Grid, GridItem, Center } from '@chakra-ui/react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
const FindUser = () => {
  const [userId, setUserId] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [newTickets, setNewTickets] = useState([]);
  const [oldTickets, setOldTickets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [currentTable, setCurrentTable] = useState('User Details');
  const axiosPrivate = useAxiosPrivate();
  const [isSearch, setIsSearch] = useState(false);

  const handleChangeUserId = (e) => {
    setUserId(e.target.value);
  }

  const getUserInfo = async () => {
    if (!userId) {
      return setIsSearch(false);
    }
    try {
      const userDetails = await axiosPrivate.get(`/users/byIdSearch/${userId}`);
      if (userDetails.status === 200) {
        // console.log(userDetails.data)
       setUserDetails(userDetails.data);
      } else {
        console.log("Failed to fetch user details:", userDetails.statusText);
      }

      const newTickets = await axiosPrivate.get(`/newtickets/byIdSearch/${userId}`);
      if (newTickets.status === 200) {
        // console.log(newTickets.data.tickets)
        setNewTickets(newTickets.data.tickets);
       } else {
         console.log("Failed to fetch user details:", newTickets.statusText);
       }

       const oldTickets = await axiosPrivate.get(`/oldtickets/byIdSearch/${userId}`);
       if (oldTickets.status === 200) {
        // console.log(oldTickets.data.tickets)
        setOldTickets(oldTickets.data.tickets);
       } else {
         console.log("Failed to fetch user details:", oldTickets.statusText);
       }

       const orders = await axiosPrivate.get(`/orders/byIdSearch/${userId}`);
       if(orders.status === 200){
        // console.log(orders.data)
        setOrders(orders.data)
       } else {
        console.log("Failed to fetch user details:", orders.statusText);
      }

      const refunds = await axiosPrivate.get(`/refunds/byIdSearch/${userId}`);
       if(refunds.status === 200){
        // console.log(refunds.data)
        setRefunds(refunds.data)
       } else {
        console.log("Failed to fetch user details:", refunds.statusText);
      }
      setIsSearch(true);
    } catch (err) {
      console.log("Error fetching user details:", err);
    }
  };

  const tableConfig = {
    'User Details': {
      columns: ['userName', 'email', 'network', 'walletAddress', 'isWalletReady', 'isPrivate', 'birthday', 'facebook', 'instagram', 'twitter', 'emailVarified', 'notifications'], // Add other columns
      data: userDetails,
    },
    'New Tickets': {
      columns: ['paid', 'prize', 'purchaseDate', 'status', 'ticketId'], // Add other columns
      data: newTickets,
    },
    'Old Tickets': {
      columns: ['paid', 'prize', 'purchaseDate', 'status', 'ticketId'], // Add other columns
      data: oldTickets,
    },
    'Orders': {
      columns: ['id', 'purchaseDate', 'totalTickets', 'userId'], // Add other columns
      data: orders,
    },
    'Refunds': {
      columns: ['id', 'orderId', 'paid', 'requestDate', 'status'], // Add other columns
      data: refunds,
    },
  };

  const renderTable = () => {
    const selectedTable = tableConfig[currentTable];
  
    return (
      <table style={{marginBottom: '300px'}}>
        <thead>
          <tr>
            {selectedTable.columns.map((column, index) => (
              <th key={index} style={{ width: '100px', border: '1px solid #000', padding: '8px', textAlign: 'left' }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedTable.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {selectedTable.columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  style={{
                    width: '100px',
                    border: '1px solid #000',
                    padding: '8px',
                    textAlign: 'left',
                    paddingLeft: '10px',
                  }}
                >
                  {row[column] === null || row[column] === '' ? 'NULL' : typeof row[column] === 'boolean' ? row[column] ? 'TRUE' : 'FALSE' : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  return (
    <div>
      <Box border='#beef00 solid 2px' h="350px" overflow='hidden' borderRadius='md'>
        <Center p='3' bg='#F6E05E' as='b' mb='2'>Find User</Center>
        <Flex justifyContent="space-around" position="sticky" top="0" p='3'>
          {/* <input type='text' placeholder='Enter your Instagram profile link' style={{width:'70%', borderRadius:'10px', padding: '5px', marginLeft: 'auto', color: 'black'}} value={newInstagram} onChange={handleChangeInstagram} /> */}
          <input type='text' placeholder='User ID' style={{ width: '75%', borderRadius: '10px', paddingTop: '3px',paddingBottom: '3px',paddingLeft: '10px', marginRight: 'auto', color: 'black' }} value={userId} onChange={handleChangeUserId} />
          <Button bg='#beef00' w='20%' onClick={getUserInfo}>Search</Button>
        </Flex>
        <Grid
          templateRows={['repeat(2, 1fr)','repeat(1, 1fr)']}
          templateColumns={['repeat(6, 1fr)','repeat(5, 1fr)']}
          gap={4}
          my='2'
          px='3'
          overflowY="scroll"
          fontSize={['xs','md']}
        >
          <GridItem colSpan={['2', '1']} rowSpan='1' cursor='pointer' onClick={()=>setCurrentTable('User Details')}>
            <Box overflowY="scroll" mt='0'>
              <Center as='b' p='3' bg={currentTable==='User Details'?'black':'white'} color={currentTable==='User Details'?'white':'black'} borderRadius='md' position="sticky" top="0">User Details</Center>
            </Box>
          </GridItem>
          <GridItem colSpan={['2', '1']} rowSpan='1' cursor='pointer' onClick={()=>setCurrentTable('New Tickets')}>
            <Box overflowY="scroll" mt='0'>
              <Center as='b' p='3' bg={currentTable==='New Tickets'?'black':'white'} color={currentTable==='New Tickets'?'white':'black'} borderRadius='md' position="sticky" top="0">New Tickets</Center>
            </Box>
          </GridItem>
          <GridItem colSpan={['2', '1']} rowSpan='1' cursor='pointer' onClick={()=>setCurrentTable('Old Tickets')}>
            <Box overflowY="scroll" mt='0'>
              <Center as='b' p='3' bg={currentTable==='Old Tickets'?'black':'white'} color={currentTable==='Old Tickets'?'white':'black'} borderRadius='md' position="sticky" top="0">Old Tickets</Center>
            </Box>
          </GridItem>
          <GridItem colSpan={['3', '1']} rowSpan='1' cursor='pointer' onClick={()=>setCurrentTable('Orders')}>
            <Box overflowY="scroll" mt='0'>
              <Center as='b' p='3' bg={currentTable==='Orders'?'black':'white'} color={currentTable==='Orders'?'white':'black'} borderRadius='md' position="sticky" top="0">Orders</Center>
            </Box>
          </GridItem>
          <GridItem colSpan={['3', '1']} rowSpan='1' cursor='pointer' onClick={()=>setCurrentTable('Refunds')}>
            <Box overflowY="scroll" mt='0'>
              <Center as='b' p='3' bg={currentTable==='Refunds'?'black':'white'} color={currentTable==='Refunds'?'white':'black'} borderRadius='md' position="sticky" top="0">Refunds</Center>
            </Box>
          </GridItem>
        </Grid>
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '400px', color: 'white', paddingLeft:'20px' }}>
  {isSearch && renderTable()}
</div>
      </Box>
    </div>
  )
}

export default FindUser