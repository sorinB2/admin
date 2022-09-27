import React, { MouseEvent, useEffect, useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

// Components
import { SaleCard } from '../components/Sales/SaleCard';
import { SaleModal } from '../components/Sales/SaleModal';

// Actions
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getSales } from '../features/allSales/slice';

// Other resources
import { ROUTES } from '../constants/routes';
import { STRINGS } from '../constants/strings';
import { SaleFetchData } from '../types/types';

export const Sales = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { allSales } = useAppSelector(state => state.allSales);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<SaleFetchData>(allSales[0]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(getSales());
  }, []);

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
