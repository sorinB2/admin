import React, { useEffect } from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import { makeStyles } from 'tss-react/mui';

// Components
import { CustomPagination } from '../components/UI/CustomPagination';

// Actions
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getProducts } from '../features/allProducts/slice';

// Other resources
import { ROUTES } from '../constants/routes';
import { STATUS } from '../constants/statuses';
import { STRINGS } from '../constants/strings';

export const Products = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allProducts, status } = useAppSelector(state => state.allProducts);
  const isLoading = status === STATUS.PENDING;

  const addNewProductHandler = () => {
    navigate(ROUTES.ADD_NEW_PRODUCT);
  };

  const renderHeader = (params: GridColumnHeaderParams) => (
    <Typography className={classes.headerText}>{params.colDef.headerName}</Typography>
  );

  const columns: GridColDef[] = [
    {
      field: 'brand',
      headerName: `${STRINGS.BRAND}`,
      flex: 130,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
      disableColumnMenu: true,
    },
    {
      field: 'name',
      headerName: `${STRINGS.NAME}`,
      flex: 130,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'wipes',
      headerName: `${STRINGS.NR_WIPES}`,
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'stock',
      headerName: `${STRINGS.STOCK}`,
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'density',
      headerName: `${STRINGS.DENSITY}`,
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'width',
      headerName: `${STRINGS.WIDTH}`,
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'fragrance',
      headerName: `${STRINGS.FRAGRANCE}`,
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'material',
      headerName: `${STRINGS.MATERIAL}`,
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
  ];

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Card className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        {STRINGS.ALL_PRODUCTS}
      </Typography>
      <DataGrid
        className={classes.dataGrid}
        rows={allProducts}
        columns={columns}
        pageSize={9}
        checkboxSelection
        components={{ Pagination: CustomPagination }}
        loading={isLoading}
      />
      <Button variant="contained" onClick={addNewProductHandler} className={classes.addProduct}>
        {STRINGS.ADD_NEW_PRODUCT}
      </Button>
    </Card>
  );
};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: theme.spacing(2),
    position: 'relative',
  },
  dataGrid: {
    border: 'none',
    height: '577px',
    fontSize: '14px',
    color: '#000000DE',
    fontWeight: '400',
  },
  title: {
    fontWeight: '600',
    color: '#000000DE',
    paddingBottom: '15px',
  },
  headerText: {
    fontWeight: '600',
    fontSize: '14px',
  },
  addProduct: {
    position: 'absolute',
    right: '14px',
    top: '14px',
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}));
