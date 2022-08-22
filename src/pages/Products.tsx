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
      headerName: 'Brand',
      flex: 130,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
      disableColumnMenu: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 130,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'wipes',
      headerName: 'Nr. of wipes',
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'density',
      headerName: 'Density',
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'width',
      headerName: 'Width',
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'fragrance',
      headerName: 'Fragrance',
      flex: 100,
      disableColumnMenu: true,
      renderHeader: (params: GridColumnHeaderParams) => renderHeader(params),
    },
    {
      field: 'material',
      headerName: 'Material',
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
        All products
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
        Add new product
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
    // maxWidth: '916px',
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
  },
}));
