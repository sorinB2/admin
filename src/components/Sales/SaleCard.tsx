import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// Actions
import { formatNumber } from '../../utils/formatNumber';
import { formatDate } from '../../utils/formatDate';

// Other resources
import { SaleCardProps } from '../../types/types';

export const SaleCard = ({ sale, onClick }: SaleCardProps) => {
  const { classes } = useStyles();

  return (
    <Box id={sale.id} className={classes.saleCard} onClick={onClick}>
      <Box className={classes.nameWrapper}>
        <ShoppingCartOutlinedIcon className={classes.cartIcon} />
        <Typography className={classes.name} variant="h3">
          {sale.customer.name}
        </Typography>
      </Box>
      <Typography className={classes.income} variant="h2">
        {`${formatNumber(+sale.totalIncome.toFixed(2))} lei`}
      </Typography>
      <Typography className={classes.date} variant="h5">
        {formatDate(new Date(sale.date))}
      </Typography>
      <Typography className={sale.status === 'Pending' ? classes.statusPending : classes.statusDelivered}>
        {sale.status}
      </Typography>
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
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1.5fr 1fr 0.8fr',
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
