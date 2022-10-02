import React, { useEffect, useState } from 'react';
import { IconButton, Table, TableHead, TableBody, TableRow, TableCell, Collapse, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';

// Components
import { Options } from '../UI/Options';

// Actions
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setCustomer } from '../../features/newCustomer/slice';
import { setCustomerId } from '../../features/editCustomer/slice';
import { formatNumber } from '../../utils/formatNumber';
import { getProducts } from '../../features/allProducts/slice';
import { deleteCustomer, setDeletedCustomerId } from '../../features/deleteCustomer/slice';
import { setCustomers } from '../../features/allCustomers/slice';

// Other resources
import { CustomerFetchData } from '../../types/types';
import { STRINGS } from '../../constants/strings';
import { ROUTES } from '../../constants/routes';
import { STATUS } from '../../constants/statuses';

export const CustomersTableRow = ({ customerData }: { customerData: CustomerFetchData }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes, cx } = useStyles();
  const { name, location, products, receivables, phone, id } = { ...customerData };
  const { allCustomers } = useAppSelector(state => state.allCustomers);
  const { status: deleteStatus } = useAppSelector(state => state.deleteCustomer);
  const { deletedCustomerId } = useAppSelector(state => state.deleteCustomer);
  const [open, setOpen] = useState<boolean>(false);

  const editCustomerHandler = async () => {
    dispatch(setCustomer({ name, location, phone, receivables, products }));
    dispatch(setCustomerId(id));
    await dispatch(getProducts());
    navigate(ROUTES.EDIT_CUSTOMER);
  };

  useEffect(() => {
    const customers = allCustomers.filter(item => item.id !== deletedCustomerId);
    deleteStatus === STATUS.FULFILLED && dispatch(setCustomers(customers));
  }, [deleteStatus]);

  const deleteCustomerHandler = () => {
    dispatch(deleteCustomer(id));
    dispatch(setDeletedCustomerId(id));
  };

  return (
    <>
      <TableRow className={classes.customerRow}>
        <TableCell className={classes.arrowCell}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" className={classes.tableCell}>
          {name}
        </TableCell>
        <TableCell align="right" className={classes.tableCell}>
          {location}
        </TableCell>
        <TableCell align="right" className={classes.tableCell}>
          {phone}
        </TableCell>
        <TableCell align="right" className={cx(classes.tableCell, classes.receivables)}>
          {formatNumber(receivables)}
        </TableCell>
        <TableCell align="right" className={classes.buttonCell}>
          <Options id={id} onEdit={editCustomerHandler} onDelete={deleteCustomerHandler} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} className={classes.collapseCell}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right" className={classes.collapseHeader}>
                      {STRINGS.PRODUCT}
                    </TableCell>
                    <TableCell align="right" className={classes.collapseHeader}>
                      {STRINGS.PRICE} (mdl)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(product => (
                    <TableRow key={product.id}>
                      <TableCell align="right" className={classes.collapseData}>
                        {product.product}
                      </TableCell>
                      <TableCell align="right" className={classes.collapseData}>
                        {product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const useStyles = makeStyles()(theme => ({
  customerRow: {
    '& > *': { borderBottom: 'unset' },
  },
  tableCell: {
    color: '#000000DE',
    fontSize: '14px',
  },
  receivables: {
    color: theme.palette.secondary.main,
  },
  arrowCell: {
    width: '20px',
  },
  collapseCell: {
    padding: '0',
  },
  collapseHeader: {
    fontWeight: '600',
    fontSize: '13px',
    color: '#000000DE',
  },
  collapseData: {
    fontSize: '13px',
    color: '#000000DE',
  },
  buttonCell: {
    width: '36px',
  },
}));
