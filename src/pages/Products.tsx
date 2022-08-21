import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Other resources
import { ROUTES } from '../constants/routes';

export const Products = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(ROUTES.ADD_NEW_PRODUCT);
  };
  return (
    <Card>
      <Typography>This is the products page</Typography>
      <Button variant="outlined" onClick={clickHandler}>
        Add new product
      </Button>
    </Card>
  );
};
