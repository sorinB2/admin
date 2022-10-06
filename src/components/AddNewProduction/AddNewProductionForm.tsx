import React, { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Box,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// Actions
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getProducts } from '../../features/allProducts/slice';
import {
  addProduct,
  removeProduct,
  setDate,
  setProductId,
  setProductType,
  setProductUnits,
  setSelectedProducts,
} from '../../features/newProduction/slice';

// Other resources
import { STRINGS } from '../../constants/strings';

export const AddNewProductionForm = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector(state => state.allProducts);
  const { production, selectedProducts } = useAppSelector(state => state.newProduction);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const selectChangeHandler = (e: SelectChangeEvent, i: number) => {
    const { value } = e.target;
    console.log(value);
    dispatch(setProductType({ value, i }));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    const value = e.currentTarget.value;
    dispatch(setProductUnits({ value, i }));
  };

  const setProductListId = (e: React.MouseEvent, i: number) => {
    const value = e.currentTarget.id;
    dispatch(setProductId({ value, i }));
    if (production.products[i].id) {
      const arr = selectedProducts.filter(item => item !== production.products[i].id);
      dispatch(setSelectedProducts([...arr, value]));
    } else {
      dispatch(setSelectedProducts([...selectedProducts, value]));
    }
  };

  const removeProductListId = (id: string) => {
    const list = selectedProducts.filter(item => item !== id);
    dispatch(setSelectedProducts(list));
  };

  return (
    <form>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={STRINGS.DATE}
          value={production.date}
          inputFormat="DD.MM.YYYY"
          onChange={newValue => {
            dispatch(setDate(newValue?.toString()));
          }}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Box className={classes.productsForm}>
        <Box className={classes.productsWrapper}>
          {production.products.map((item, i) => {
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
                  label={STRINGS.UNITS}
                  name="units"
                  required
                  value={item.units}
                  onChange={e => inputChangeHandler(e, i)}
                />
                <IconButton
                  onClick={() => {
                    removeProductListId(production.products[i].id);
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
    </form>
  );
};

const useStyles = makeStyles()(theme => ({
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
}));
