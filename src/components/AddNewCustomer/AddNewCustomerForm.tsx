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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { makeStyles } from 'tss-react/mui';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getProducts } from '../../features/allProducts/slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const AddNewCustomerForm = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allProducts } = useAppSelector(state => state.allProducts);
  const [inputList, setInputList] = useState<ProductData[]>([{ product: '', price: '' }]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const cancelHandler = () => {
    navigate(ROUTES.CUSTOMERS);
  };

  const selectChangeHandler = (e: SelectChangeEvent, index: number) => {
    const { value } = e.target;
    const list: ProductData[] = [...inputList];
    list[index].product = value;
    setInputList(list);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = e.currentTarget.value;
    const list: ProductData[] = [...inputList];
    list[index].price = value;
    setInputList(list);
  };

  const removeProductHandler = (index: number) => {
    const list: ProductData[] = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const addProductHandler = () => {
    setInputList([...inputList, { product: '', price: '' }]);
  };

  useEffect(() => {
    console.log(inputList);
  }, [inputList]);

  return (
    <form className={classes.form}>
      <Typography variant="h1" className={classes.title}>
        Add new customer
      </Typography>
      <TextField type="text" label="Name" required />
      <TextField type="text" label="Location" required />
      <TextField type="text" label="Phone number" required />
      <TextField
        type="number"
        label="Receivables"
        required
        InputProps={{
          endAdornment: <InputAdornment position="end">mdl</InputAdornment>,
        }}
      />
      <Box className={classes.productsForm}>
        <Box className={classes.productsWrapper}>
          {inputList.map((item, i) => {
            return (
              <Box key={Math.random()} className={classes.productsBox}>
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
                        <MenuItem key={product.id} value={`${product.brand} ${product.name}`}>
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
                <IconButton onClick={() => removeProductHandler(i)}>
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            );
          })}
        </Box>
        <IconButton className={classes.addProduct} onClick={addProductHandler}>
          <AddOutlinedIcon />
        </IconButton>
      </Box>
      <Button variant="contained" type="submit">
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

interface ProductData {
  product: string;
  price: string;
}
