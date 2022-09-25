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
        <Typography className={classes.name} variant="h4">
          {sale.customer.name}
        </Typography>
      </Box>
      <Typography className={classes.income} variant="h2">
        {`${formatNumber(+sale.totalIncome.toFixed(2))} lei`}
      </Typography>
      <Typography className={classes.date} variant="h5">
        {formatDate(new Date(sale.date))}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles()(theme => ({
  saleCard: {
    borderRadius: '10px',
    width: '450px',
    height: 'auto',
    padding: theme.spacing(1.5),
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '2fr auto 1fr',
    backgroundColor: '#dcfce8',
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
  },
  name: {
    color: theme.palette.common.black,
    fontSize: '18px',
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
}));
