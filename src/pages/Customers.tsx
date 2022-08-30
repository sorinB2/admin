import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

// Components
import { CustomersTable } from '../components/Customers/CustomersTable';

// Other resources
import { ROUTES } from '../constants/routes';

export const Customers = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const addNewCustomerHandler = () => {
    navigate(ROUTES.ADD_NEW_CUSTOMER);
  };
  return (
    <Card className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        All customers
      </Typography>
      <CustomersTable />
      <Button onClick={addNewCustomerHandler} variant="contained" className={classes.addCustomer}>
        Add new customer
      </Button>
    </Card>
  );
};

const useStyles = makeStyles()(theme => ({
  title: {
    fontWeight: '600',
    color: '#000000DE',
    paddingBottom: '15px',
  },
  wrapper: {
    padding: theme.spacing(2),
    position: 'relative',
  },
  addCustomer: {
    position: 'absolute',
    right: '14px',
    top: '14px',
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}));
