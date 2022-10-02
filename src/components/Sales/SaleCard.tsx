import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';

// Components
import { Options } from '../UI/Options';

// Actions
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setCustomer, setSale } from '../../features/newSale/slice';
import { formatNumber } from '../../utils/formatNumber';
import { formatDate } from '../../utils/formatDate';
import { getProducts } from '../../features/allProducts/slice';
import { getCustomers } from '../../features/allCustomers/slice';
import { setSaleId } from '../../features/editSale/slice';

// Other resources
import { SaleCardProps } from '../../types/types';
import { ROUTES } from '../../constants/routes';

export const SaleCard = ({ sale, onClick }: SaleCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customer, order, date, totalIncome, paid, status, id } = sale;
  const { classes } = useStyles();

  const editSaleHandler = async () => {
    await dispatch(getCustomers());
    await dispatch(getProducts());
    dispatch(setSale({ customer, order, date, totalIncome, paid, status }));
    dispatch(setCustomer(customer));
    dispatch(setSaleId(id));
    navigate(ROUTES.EDIT_SALE);
  };

  const deleteSaleHandler = () => {
    console.log('delete');
  };

  return (
    <Box id={id} className={classes.saleCard} onClick={onClick}>
      <Box className={classes.nameWrapper}>
        <ShoppingCartOutlinedIcon className={classes.cartIcon} />
        <Typography className={classes.name} variant="h3">
          {customer.name}
        </Typography>
      </Box>
      <Typography className={classes.income} variant="h2">
        {`${formatNumber(+totalIncome.toFixed(2))} lei`}
      </Typography>
      <Typography className={classes.date} variant="h5">
        {formatDate(new Date(date))}
      </Typography>
      <Typography className={status === 'Pending' ? classes.statusPending : classes.statusDelivered}>
        {status}
      </Typography>
      <Box onClick={e => e.stopPropagation()}>
        <Options id={id} onEdit={editSaleHandler} onDelete={deleteSaleHandler} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles()(theme => ({
  saleCard: {
    borderRadius: '5px',
    '&:nth-of-type(2n+1)': {
      backgroundColor: theme.palette.common.lightBackground,
    },
    width: '550px',
    height: 'auto',
    padding: theme.spacing(1.5),
    paddingRight: '0',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1.5fr 1fr 0.8fr 40px',
    gridGap: theme.spacing(1),
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.005)',
    },
  },
  nameWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    justifySelf: 'start',
  },
  cartIcon: {
    fill: theme.palette.common.black,
    paddingRight: theme.spacing(0.5),
    alignSelf: 'center',
  },
  name: {
    color: theme.palette.common.black,
    fontWeight: '500',
  },
  income: {
    color: theme.palette.common.black,
    fontWeight: '600',
    justifySelf: 'end',
  },
  date: {
    color: theme.palette.common.black,
    fontWeight: '400',
    justifySelf: 'end',
  },
  statusPending: {
    justifySelf: 'end',
    color: '#EE3349',
  },
  statusDelivered: {
    justifySelf: 'end',
    color: theme.palette.secondary.main,
  },
}));
