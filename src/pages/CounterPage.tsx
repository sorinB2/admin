import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Components
import { Counter } from '../components/counter/Counter';

export const CounterPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography>Welcome to the counter page</Typography>
      <Counter />
      <Button onClick={() => navigate('/')}>Go back to home page</Button>
    </>
  );
};
