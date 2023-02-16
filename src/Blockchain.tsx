import { Box, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { createBlock } from "./blockchain/createBlock"
import { createBlockchain } from "./blockchain/createBlockchain"
import { BlockchainComponent } from "./shared/components"
import { BlockchainAdd } from "./shared/components/blockchain-components/BlockchainAdd"
import { IBlockProps } from "./shared/interfaces"


export const Blockchain = () => {

  const [blockchain, setBlockchain] = useState<IBlockProps[]>(createBlockchain(''));

  const handleAddBlock = (data: string) => {
    const previousBlock = blockchain[blockchain.length - 1];
    const block = createBlock(previousBlock.index + 1, data, previousBlock.hash);
    setBlockchain([...blockchain, block]);
  }

  return (
    <Box width='100vw' height='100vh' sx={{ backgroundColor: '#9c9c9c', overflow: 'scroll' }}>
      <Box sx={{ backgroundColor: '#0000003d' }}>
        <Typography component='h1' sx={{ display: 'flex', justifyContent: 'center', color: 'white', fontSize: 30 }}>
          Blockchain
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <BlockchainAdd onAddBlock={handleAddBlock} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', margin: 2, gap: 2 }}>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(1)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <BlockchainComponent blockchain={[...blockchain]} />
              </Box>
            </Grid>
          ))}
        </Grid>

      </Box>
    </Box>
  )
}