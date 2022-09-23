import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// Actions
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getSales } from '../../features/allSales/slice';
import { formatNumber } from '../../utils/formatNumber';
import { formatDate } from '../../utils/formatDate';

export const SaleCard = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { allSales } = useAppSelector(state => state.allSales);

  useEffect(() => {
    dispatch(getSales());
  }, []);

  return (
    <Box className={classes.wrapper}>
      {allSales.map(sale => {
        return (
          <Box key={sale.id} className={classes.saleCard}>
            <Box className={classes.nameWrapper}>
              <ShoppingCartOutlinedIcon className={classes.cartIcon} />
              <Typography className={classes.name} variant="h4">
                {sale.customer.name}
              </Typography>
            </Box>
            <Typography className={classes.income} variant="h1">
              {`${formatNumber(+sale.totalIncome.toFixed(2))} lei`}
            </Typography>
            <Typography className={classes.date} variant="h5">
              {formatDate(new Date(sale.date))}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gridGap: theme.spacing(2.5),
  },
  saleCard: {
    borderRadius: '10px',
    width: '240px',
    height: '110px',
    padding: theme.spacing(1.5),
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateRows: '1fr 1fr 1fr',
    backgroundColor: '#dcfce8',
  },
  nameWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    justifySelf: 'center',
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
    paddingTop: theme.spacing(1),
  },
  date: {
    color: theme.palette.common.black,
    fontWeight: '400',
    justifySelf: 'end',
    alignSelf: 'end',
  },
}));
