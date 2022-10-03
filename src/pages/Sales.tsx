import React, { MouseEvent, useEffect, useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

// Components
import { SaleCard } from '../components/Sales/SaleCard';
import { SaleModal } from '../components/Sales/SaleModal';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

// Actions
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getSales, setSales } from '../features/allSales/slice';
import { getProducts } from '../features/allProducts/slice';
import { getCustomers } from '../features/allCustomers/slice';

// Other resources
import { ROUTES } from '../constants/routes';
import { STRINGS } from '../constants/strings';
import { SaleFetchData } from '../types/types';
import { STATUS } from '../constants/statuses';

export const Sales = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { allSales, status } = useAppSelector(state => state.allSales);
  const { status: deleteStatus, deletedSaleId } = useAppSelector(state => state.deleteSale);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<SaleFetchData>(allSales[0]);
  const [index, setIndex] = useState<number>(0);
  const isLoading = status === STATUS.PENDING || deleteStatus === STATUS.PENDING;

  useEffect(() => {
    dispatch(getSales());
    dispatch(getProducts());
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    const sales = allSales.filter(item => item.id !== deletedSaleId);
    deleteStatus === STATUS.FULFILLED && dispatch(setSales(sales));
  }, [deleteStatus]);

  const saleCardClickHandler = (e: MouseEvent) => {
    const sale = allSales.filter(item => item.id === e.currentTarget.id);
    const i = allSales.findIndex(item => item.id === e.currentTarget.id);
    setSelectedSale(sale[0]);
    setIndex(i);
    setIsVisible(true);
  };

  const addNewSaleHandler = () => {
    navigate(ROUTES.ADD_NEW_SALE);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Card className={classes.wrapper}>
        <SaleModal open={isVisible} onClose={() => setIsVisible(false)} sale={selectedSale} index={index} />
        <Typography variant="h1" className={classes.title}>
          {STRINGS.ALL_SALES}
        </Typography>
        <Box className={classes.salesBox}>
          <Box className={classes.sales}>
            {allSales.map(sale => (
              <SaleCard key={sale.id} sale={sale} onClick={saleCardClickHandler} />
            ))}
          </Box>
        </Box>
        <Button onClick={addNewSaleHandler} variant="contained" className={classes.addSale}>
          {STRINGS.ADD_NEW_SALE}
        </Button>
      </Card>
    </>
  );
};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: theme.spacing(2),
    position: 'relative',
  },
  title: {
    fontWeight: '600',
    color: '#000000DE',
    paddingBottom: '15px',
  },
  salesBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  sales: {
    display: 'grid',
  },
  addSale: {
    position: 'absolute',
    right: '14px',
    top: '14px',
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}));
