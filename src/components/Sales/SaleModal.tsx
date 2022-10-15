import React from 'react';
import {
  Box,
  Button,
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
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

// Actions
import { formatNumber } from '../../utils/formatNumber';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateDeliveryStatus, updateStatus } from '../../features/allSales/slice';
import { formatDate } from '../../utils/formatDate';

// Other resources
import { SaleModalProps } from '../../types/types';
import { STRINGS } from '../../constants/strings';
import { STATUS } from '../../constants/statuses';

export const SaleModal = ({ open, onClose, sale, index }: SaleModalProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { allSales, status } = useAppSelector(state => state.allSales);
  const isLoading = status === STATUS.PENDING;

  const setDeliveredStatusHandler = () => {
    dispatch(updateDeliveryStatus({ uid: sale?.id, data: 'Delivered' }));
    dispatch(updateStatus({ index, value: 'Delivered' }));
  };

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
          <Box>
            <Box className={classes.deliveryStatus}>
              <LocalShippingOutlinedIcon className={classes.deliveryIcon} />
              <Typography className={classes.saleStatus}>{allSales[index]?.status}</Typography>
            </Box>
            <Typography variant="h5" className={classes.orderDate}>
              {sale && formatDate(new Date(sale?.date))}
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.totalIncomeTitle}>{STRINGS.TOTAL_INCOME}</Typography>
            <Typography variant="h1" className={classes.orderTotalIncome}>
              {sale && `${formatNumber(+sale.totalIncome.toFixed(2))} lei`}
            </Typography>
          </Box>
        </Box>
        {allSales[index]?.status === 'Pending' && (
          <Button
            className={classes.deliveredButton}
            onClick={setDeliveredStatusHandler}
            variant="outlined"
            disabled={isLoading}
            endIcon={<LocalShippingOutlinedIcon />}
          >
            {STRINGS.MARK_AS_DELIVERED}
          </Button>
        )}
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
    overflowY: 'scroll',
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
  deliveredButton: {
    display: 'flex',
    margin: 'auto',
  },
  deliveryStatus: {
    display: 'grid',
    gridTemplateColumns: '30px auto',
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
  deliveryIcon: {
    fill: theme.palette.primary.main,
  },
  saleStatus: {
    color: theme.palette.primary.main,
  },
}));
