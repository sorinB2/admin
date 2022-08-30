import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// Components
import { CustomersTableRow } from './CustomersTableRow';

// Actions
import { getCustomers } from '../../features/allCustomers/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

export const CustomersTable = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { allCustomers } = useAppSelector(state => state.allCustomers);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center" className={classes.tableHeader}>
              Name
            </TableCell>
            <TableCell align="center" className={classes.tableHeader}>
              Location
            </TableCell>
            <TableCell align="center" className={classes.tableHeader}>
              Phone
            </TableCell>
            <TableCell align="center" className={classes.tableHeader}>
              Receivables
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCustomers.map(customer => (
            <CustomersTableRow customerData={customer} key={customer.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles()(theme => ({
  tableHeader: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: '600',
    color: '#000000DE',
  },
}));
