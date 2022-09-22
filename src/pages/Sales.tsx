import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const Sales = () => {
  const navigate = useNavigate();

  const addNewSaleHandler = () => {
    navigate(ROUTES.ADD_NEW_SALE);
  };

  return (
    <Card>
      <Typography>This is the sales page</Typography>
      <Button onClick={addNewSaleHandler} variant="outlined">
        Add new sale
      </Button>
    </Card>
  );
};
