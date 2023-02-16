import { Box, Button, TextField, Typography } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import { IFormBlockchain } from "../../interfaces";

export const BlockchainAdd: FC<IFormBlockchain> = ({ onAddBlock }: IFormBlockchain) => {
  const [data, setData] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAddBlock(data);
    setData('');
  }
  return (
    <Box sx={{
      margin: 2,
      padding: 2,
      gap: '20px',
      width: '530px',
      display: 'flex',
      borderRadius: 2,
      minWidth: '530px',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '2px solid #fff',
    }}>
      <Typography sx={{ color: 'white', display: 'flex', justifyContent: 'center' }}>Adicione um novo bloco.</Typography>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }} onSubmit={handleSubmit}>
        <TextField
          placeholder='Identificador do bloco...'
          variant='outlined'
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <Button
          type='submit'
          variant='contained'
          color='inherit'
        >
          Adicionar Bloco
        </Button>
      </form>
    </Box>
  );
};