import { Box, Card, CardContent, Typography } from "@mui/material";
import { IBlockchainProps } from "../../interfaces";

export const BlockchainComponent = ({ blockchain }: IBlockchainProps) => {

  return (
    <Box sx={{display: 'grid', gap: 2}}>
      {blockchain.map((block, index) => (
        <Card key={index}>
          <CardContent>
            <Typography variant='h5'>Block {block.index}</Typography>
            <Typography variant='subtitle1'>Timestamp: {block.timestamp}</Typography>
            <Typography variant='subtitle1'>Data: {block.data}</Typography>
            <Typography variant='subtitle1'>Hash: {block.hash}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};