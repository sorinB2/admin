import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Components
import { ActionConfirmModal } from '../UI/ActionConfirmModal';

// Actions
import { formatNumber } from '../../utils/formatNumber';
import { formatDate } from '../../utils/formatDate';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { deleteSale, setDeletedSaleId } from '../../features/deleteSale/slice';
import { addReceivables, updateProduct } from '../../features/newSale/slice';

// Other resources
import { SaleCardProps } from '../../types/types';
import { STRINGS } from '../../constants/strings';

export const SaleCard = ({ sale, onClick }: SaleCardProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { customer, date, totalIncome, status, id } = sale;
  const [actionModalVisible, setActionModalVisible] = useState<boolean>(false);
  const { allCustomers } = useAppSelector(state => state.allCustomers);
  const { allProducts } = useAppSelector(state => state.allProducts);

  const deleteSaleHandler = (event: React.MouseEvent) => {
    const saleId = event.currentTarget.id;
    dispatch(deleteSale(saleId as string));
    dispatch(setDeletedSaleId(saleId));

    const saleCustomer = allCustomers.find(item => item.id === customer.id);
    const receivables = ((saleCustomer?.receivables as number) - totalIncome).toFixed(2);
    dispatch(addReceivables({ uid: customer.id as string, data: receivables }));

    sale.order.forEach(product => {
      const saleProduct = allProducts.find(item => item.id === product.product.id);
      const stock = (+(saleProduct?.stock as number) + +product.units).toFixed();
      dispatch(updateProduct({ uid: product.product.id, data: stock }));
    });
    setActionModalVisible(false);
  };

  return (
    <>
      <ActionConfirmModal
        id={id}
        isVisible={actionModalVisible}
        title={STRINGS.DELETE_SALE_TITLE}
        description={STRINGS.DELETE_SALE_DESCRIPTION}
        confirmHandler={deleteSaleHandler}
        closeHandler={() => setActionModalVisible(false)}
      />
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
        <IconButton
          onClick={event => {
            event.stopPropagation();
            setActionModalVisible(true);
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </>
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
