import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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

// Other resources
import { ROUTES } from '../../constants/routes';
import { STATUS } from '../../constants/statuses';
import { errorSnackBar, successSnackBar } from '../../features/snackBar/slice';

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
      dispatch(successSnackBar('Customer added successfully'));
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
    console.log(e);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    const value = e.currentTarget.value;
    dispatch(setProductPrice({ value, i }));
  };

  const setProductListId = (e: React.MouseEvent, i: number) => {
    const value = e.currentTarget.id;
    dispatch(setProductId({ value, i }));
    setSelectedProducts(prev => [...prev, value]);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createNewCustomer(customer));
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Typography variant="h1" className={classes.title}>
        Add new customer
      </Typography>
      <TextField type="text" label="Name" required onChange={e => dispatch(setName(e.target.value))} />
      <TextField type="text" label="Location" required onChange={e => dispatch(setLocation(e.target.value))} />
      <TextField type="text" label="Phone number" required onChange={e => dispatch(setPhone(e.target.value))} />
      <TextField
        type="number"
        label="Receivables"
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
              <Box key={item.product} className={classes.productsBox}>
                <FormControl>
                  <InputLabel id="product">Product</InputLabel>
                  <Select
                    label="Product"
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
                  label="Price"
                  name="price"
                  required
                  value={item.price}
                  onChange={e => inputChangeHandler(e, i)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mdl</InputAdornment>,
                  }}
                />
                <IconButton onClick={() => dispatch(removeProduct(i))}>
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
        Add customer
      </Button>
      <Button variant="outlined" onClick={cancelHandler}>
        Cancel
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
    alignSelf: 'end',
  },
  title: {
    fontWeight: '600',
    paddingBottom: '15px',
  },
}));
