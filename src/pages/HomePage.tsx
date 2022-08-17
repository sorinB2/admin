import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Typography>This is the home page</Typography>
      <Button onClick={() => navigate('/counter')}>Go to the counter page</Button>
    </Card>
  );
};
