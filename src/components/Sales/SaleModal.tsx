import React from 'react';
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// Actions
import { formatNumber } from '../../utils/formatNumber';

// Other resources
import { SaleModalProps } from '../../types/types';
import { formatDate } from '../../utils/formatDate';
import { STRINGS } from '../../constants/strings';

export const SaleModal = ({ open, onClose, sale }: SaleModalProps) => {
  const { classes } = useStyles();
  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Box className={classes.wrapper}>
        <Typography variant="h1" className={classes.customer}>
          {sale?.customer.name}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>{STRINGS.PRODUCT}</TableCell>
                <TableCell align="right">{STRINGS.UNITS}</TableCell>
                <TableCell align="right">{STRINGS.PRICE}</TableCell>
                <TableCell align="right">{STRINGS.INCOME}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sale?.order.map(item => (
                <TableRow key={item.product.id} className={classes.bodyTableRow}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {item.product.product}
                  </TableCell>
                  <TableCell align="right" className={classes.tableCell}>
                    {item.units}
                  </TableCell>
                  <TableCell align="right" className={classes.tableCell}>{`${item.product.price} lei`}</TableCell>
                  <TableCell align="right" className={classes.tableCell}>{`${formatNumber(
                    +item.income.toFixed(2)
                  )} lei`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className={classes.bottomWrapper}>
          <Typography variant="h5" className={classes.orderDate}>
            {sale && formatDate(new Date(sale?.date))}
          </Typography>
          <Box>
            <Typography className={classes.totalIncomeTitle}>Total Income</Typography>
            <Typography variant="h1" className={classes.orderTotalIncome}>
              {sale && `${formatNumber(+sale.totalIncome.toFixed(2))} lei`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles()(theme => ({
  modal: {
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
  },
  wrapper: {
    outline: 'none',
    width: '800px',
    maxHeight: '600px',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    boxSizing: 'border-box',
    overflowX: 'scroll',
  },
  bodyTableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
  },
  customer: {
    fontWeight: '600',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  orderDate: {
    color: theme.palette.primary.main,
    alignSelf: 'end',
  },
  totalIncomeTitle: {
    color: theme.palette.primary.main,
  },
  orderTotalIncome: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
  bottomWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  },
  tableCell: {
    fontSize: '14px',
  },
}));
