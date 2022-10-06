import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Other resources
import { ROUTES } from '../constants/routes';

export const Production = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Typography>This is the production page</Typography>
      <Button variant="outlined" onClick={() => navigate(ROUTES.ADD_NEW_PRODUCTION)}>
        Add new production
      </Button>
    </Card>
  );
};
