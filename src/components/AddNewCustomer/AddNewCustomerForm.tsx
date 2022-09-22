import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { makeStyles } from 'tss-react/mui';

// Actions
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getProducts } from '../../features/allProducts/slice';
import {
  addProduct,
  createNewCustomer,
  discardData,
  removeProduct,
  setLocation,
  setName,
  setPhone,
  setProductId,
  setProductPrice,
  setProductType,
  setReceivables,
} from '../../features/newCustomer/slice';
import { errorSnackBar, successSnackBar } from '../../features/snackBar/slice';

// Other resources
import { ROUTES } from '../../constants/routes';
import { STATUS } from '../../constants/statuses';
import { STRINGS } from '../../constants/strings';

export const AddNewCustomerForm = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allProducts } = useAppSelector(state => state.allProducts);
  const { customer, status, error } = useAppSelector(state => state.newCustomer);
  const [selectedProducts, setSelectedProducts] = useState<(string | undefined)[]>([]);
  const isLoading = status === STATUS.PENDING;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (status === STATUS.FAILED) dispatch(errorSnackBar(error));
    if (status === STATUS.FULFILLED) {
      dispatch(successSnackBar(STRINGS.CUSTOMER_SUCCESS));
      navigate(ROUTES.CUSTOMERS);
      setTimeout(() => dispatch(discardData()), 1000);
    }
  }, [status]);

  const cancelHandler = () => {
    navigate(ROUTES.CUSTOMERS);
    dispatch(discardData());
  };

  const selectChangeHandler = (e: SelectChangeEvent, i: number) => {
    const { value } = e.target;
    dispatch(setProductType({ value, i }));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    const value = e.currentTarget.value;
    dispatch(setProductPrice({ value, i }));
  };

  const setProductListId = (e: React.MouseEvent, i: number) => {
    const value = e.currentTarget.id;
    dispatch(setProductId({ value, i }));
    if (customer.products[i].id) {
      const arr = selectedProducts.filter(item => item !== customer.products[i].id);
      setSelectedProducts([...arr, value]);
    } else {
      setSelectedProducts(prev => [...prev, value]);
    }
  };

  const removeProductListId = (id: string) => {
    const list = selectedProducts.filter(item => item !== id);
    setSelectedProducts(list);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createNewCustomer(customer));
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {isLoading && <CircularProgress className={classes.spinner} />}
      <Typography variant="h1" className={classes.title}>
        {STRINGS.ADD_NEW_CUSTOMER}
      </Typography>
      <TextField type="text" label={STRINGS.NAME} required onChange={e => dispatch(setName(e.target.value))} />
      <TextField type="text" label={STRINGS.LOCATION} required onChange={e => dispatch(setLocation(e.target.value))} />
      <TextField type="text" label={STRINGS.PHONE_NUMBER} required onChange={e => dispatch(setPhone(e.target.value))} />
      <TextField
        type="number"
        label={STRINGS.RECEIVABLES}
        required
        onChange={e => dispatch(setReceivables(e.target.value))}
        InputProps={{
          endAdornment: <InputAdornment position="end">mdl</InputAdornment>,
        }}
      />
      <Box className={classes.productsForm}>
        <Box className={classes.productsWrapper}>
          {customer.products.map((item, i) => {
            return (
              <Box key={i} className={classes.productsBox}>
                <FormControl>
                  <InputLabel id="product">{STRINGS.PRODUCT}</InputLabel>
                  <Select
                    label={STRINGS.PRODUCT}
                    labelId="product"
                    name="product"
                    required
                    value={item.product}
                    onChange={e => selectChangeHandler(e, i)}
                  >
                    {allProducts.map(product => {
                      return (
                        <MenuItem
                          key={product.id}
                          id={product.id}
                          disabled={selectedProducts.includes(product.id)}
                          value={`${product.brand} ${product.name}`}
                          onClick={e => setProductListId(e, i)}
                        >
                          {`${product.brand} ${product.name}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  label={STRINGS.PRICE}
                  name="price"
                  required
                  value={item.price}
                  onChange={e => inputChangeHandler(e, i)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mdl</InputAdornment>,
                  }}
                />
                <IconButton
                  onClick={() => {
                    removeProductListId(customer.products[i].id);
                    dispatch(removeProduct(i));
                  }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            );
          })}
        </Box>
        <IconButton className={classes.addProduct} onClick={() => dispatch(addProduct())}>
          <AddOutlinedIcon />
        </IconButton>
      </Box>
      <Button variant="contained" type="submit" disabled={isLoading}>
        {STRINGS.ADD_CUSTOMER}
      </Button>
      <Button variant="outlined" onClick={cancelHandler}>
        {STRINGS.CANCEL}
      </Button>
    </form>
  );
};

const useStyles = makeStyles()(theme => ({
  form: {
    width: '700px',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    display: 'grid',
    gridGap: '15px',
  },
  productsForm: {
    display: 'grid',
    gridTemplateColumns: `auto ${theme.spacing(6.75)}`,
  },
  productsWrapper: {
    display: 'grid',
    gridGap: '15px',
  },
  productsBox: {
    display: 'grid',
    gridTemplateColumns: `1fr 1fr ${theme.spacing(6.75)}`,
    gridGap: '15px',
  },
  addProduct: {
    height: theme.spacing(6.75),
    alignSelf: 'start',
  },
  title: {
    fontWeight: '600',
    paddingBottom: '15px',
  },
  spinner: {
    zIndex: '10',
    position: 'absolute',
    bottom: 'calc(50vh - 20px)',
    right: 'calc(50vw - 20px)',
  },
}));
