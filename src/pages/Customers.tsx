import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

// Components
import { CustomersTable } from '../components/Customers/CustomersTable';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

// Actions
import { useAppSelector } from '../hooks/reduxHooks';

// Other resources
import { ROUTES } from '../constants/routes';
import { STRINGS } from '../constants/strings';
import { STATUS } from '../constants/statuses';

export const Customers = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { status: getCustomersStatus } = useAppSelector(state => state.allCustomers);
  const { status: deleteCustomerStatus } = useAppSelector(state => state.deleteCustomer);
  const isLoading = getCustomersStatus === STATUS.PENDING || deleteCustomerStatus === STATUS.PENDING;

  const addNewCustomerHandler = () => {
    navigate(ROUTES.ADD_NEW_CUSTOMER);
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Card className={classes.wrapper}>
        <Typography variant="h1" className={classes.title}>
          {STRINGS.ALL_CUSTOMERS}
        </Typography>
        <CustomersTable />
        <Button onClick={addNewCustomerHandler} variant="contained" className={classes.addCustomer}>
          {STRINGS.ADD_NEW_CUSTOMER}
        </Button>
      </Card>
    </>
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
