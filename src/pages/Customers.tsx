import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Other resources
import { ROUTES } from '../constants/routes';

export const Customers = () => {
  const navigate = useNavigate();

  const addNewCustomerHandler = () => {
    navigate(ROUTES.ADD_NEW_CUSTOMER);
  };
  return (
    <Card>
      <Typography>This is the customers page</Typography>
      <Button onClick={addNewCustomerHandler} variant="outlined">
        Add new customer
      </Button>
    </Card>
  );
};
