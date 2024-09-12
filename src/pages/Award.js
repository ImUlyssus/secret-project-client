import { useEffect, useState } from 'react'
import { Divider, Center, Box } from "@chakra-ui/react"
import BigPrize from '../components/BigPrize'
import SmallPrize from '../components/SmallPrize'
import axios from '../api/axios';

const Award = () => {
  const [round, setRound] = useState();
  const [totalPrizeMoney, setTotalPrizeMoney] = useState();
  useEffect(() => {
    axios.get("/winningtickets/getround").then(
      (response) => {
        setRound(response.data);
      }
    ).catch(console.log)
  })
  useEffect(() => {
    if (round !== 0) {
      axios.get(`/winningtickets/totalprizemoney/${round}`)
        .then((response) => {
          if (response.data.totalTicketsCount) {
            setTotalPrizeMoney(response.data.totalTicketsCount * 2 * 0.6);
          }
        })
        .catch((error) => {
          console.error("Error fetching tickets:", error);
        });
    }
  }, [round]); // Make sure to include 'round' in the dependency array to trigger the effect when 'round' changes
  return (
    <div>
      <Divider my='3' />
      {round === 0 ?
        <Center mb={{ base: '1rem', lg: '2rem' }} my={{base:'30vh',xl:'20vh'}}>
          <Box bg='black' color='white' as='b' fontSize={{ base: '1rem', md: '2rem' }} px={['1rem', '2rem']} py={{ base: '1rem', md: '1rem', lg: '0rem' }} borderRadius='md' textAlign={'center'}>
            NONE
          </Box>
        </Center> :
        <>
          <BigPrize round={round} totalPrizeMoney={totalPrizeMoney} />
          <SmallPrize round={round} totalPrizeMoney={totalPrizeMoney} />
        </>}
    </div>
  )
}

export default Award;