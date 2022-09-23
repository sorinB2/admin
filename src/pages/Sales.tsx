import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Components
import { SaleCard } from '../components/Sales/SaleCard';

// Other resources
import { ROUTES } from '../constants/routes';
import { STRINGS } from '../constants/strings';

export const Sales = () => {
  const navigate = useNavigate();

  const addNewSaleHandler = () => {
    navigate(ROUTES.ADD_NEW_SALE);
  };

  return (
    <Card>
      <Typography>{STRINGS.ALL_SALES}</Typography>
      <SaleCard />
      <Button onClick={addNewSaleHandler} variant="outlined">
        {STRINGS.ADD_NEW_SALE}
      </Button>
    </Card>
  );
};
