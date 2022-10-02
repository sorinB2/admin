import React from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router-dom';

// Components
import { LoadingSpinner } from '../UI/LoadingSpinner';

// Actions
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  addOrderItem,
  discardData,
  discardOrder,
  removeOrderItem,
  setCustomer,
  setDate,
  setIncome,
  setProductType,
  setProductUnits,
  setSelectedProducts,
  setStatus,
  setStock,
  setTotalIncome,
} from '../../features/newSale/slice';

// Other resources
import { STATUS } from '../../constants/statuses';
import { ROUTES } from '../../constants/routes';
import { STRINGS } from '../../constants/strings';
import { FormProps } from '../../types/types';

export const AddNewSaleForm = ({ submitHandler, buttonTitle, title }: FormProps) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allCustomers } = useAppSelector(state => state.allCustomers);
  const { allProducts } = useAppSelector(state => state.allProducts);
  const { sale, status, selectedProducts } = useAppSelector(state => state.newSale);
  const isLoading = status === STATUS.PENDING;

  const cancelHandler = () => {
    navigate(ROUTES.SALES);
    dispatch(discardData());
  };

  const setProductListId = (e: React.MouseEvent, i: number) => {
    const value = e.currentTarget.id;
    if (sale.order[i].product.id) {
      const arr = selectedProducts.filter(item => item !== sale.order[i].product.id);
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
    <form className={classes.form} onSubmit={submitHandler}>
      {isLoading && <LoadingSpinner />}
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <FormControl>
        <InputLabel id="customer">Customer</InputLabel>
        <Select label={STRINGS.CUSTOMER} labelId="customer" name="customer" required value={sale.customer.name}>
          {allCustomers.map(customer => {
            return (
              <MenuItem
                key={customer.id}
                id={customer.id}
                value={customer.name}
                onClick={() => {
                  dispatch(setCustomer(customer));
                  dispatch(discardOrder());
                }}
              >
                {customer.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box className={classes.orders}>
        <Typography>{STRINGS.ORDER}</Typography>
        <Box className={classes.saleForm}>
          <Box className={classes.saleWrapper}>
            {sale.order.map((orderItem, i) => {
              return (
                <Box className={classes.saleBox} key={i}>
                  <FormControl>
                    <InputLabel id="product">{STRINGS.PRODUCT}</InputLabel>
                    <Select
                      label={STRINGS.PRODUCT}
                      labelId="product"
                      name="product"
                      required
                      value={sale.order[i].product.product}
                    >
                      {sale.customer.products.map(product => {
                        return (
                          <MenuItem
                            key={product.id}
                            id={product.id}
                            value={product.product}
                            disabled={selectedProducts.includes(product.id)}
                            onClick={e => {
                              setProductListId(e, i);
                              dispatch(setProductType({ value: product, i }));
                              const prod = allProducts.filter(item => item.id === e.currentTarget.id);
                              dispatch(setStock({ i, value: prod[0].stock }));
                              dispatch(setIncome(i));
                              dispatch(setTotalIncome());
                            }}
                          >
                            {product.product}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <TextField
                    type="text"
                    label={STRINGS.PRICE}
                    value={sale.order[i].product.price}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mdl</InputAdornment>,
                    }}
                  />
                  <Box>
                    <TextField
                      type="number"
                      label={STRINGS.UNITS}
                      required
                      autoComplete="off"
                      value={sale.order[i].units}
                      helperText={
                        sale.order[i].product.product &&
                        `${STRINGS.STOCK} ${+sale.order[i].product.stock - +sale.order[i].units}`
                      }
                      onChange={e => {
                        dispatch(setProductUnits({ value: e.target.value, i }));
                        dispatch(setIncome(i));
                        dispatch(setTotalIncome());
                      }}
                    />
                  </Box>
                  <TextField
                    type="text"
                    label={STRINGS.INCOME}
                    value={sale.order[i].income.toFixed(2)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mdl</InputAdornment>,
                    }}
                  />
                  <IconButton
                    className={classes.deleteSale}
                    onClick={() => {
                      removeProductListId(orderItem.product.id);
                      dispatch(removeOrderItem(i));
                      dispatch(setTotalIncome());
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
          <IconButton className={classes.addSale} onClick={() => dispatch(addOrderItem())}>
            <AddOutlinedIcon />
          </IconButton>
        </Box>
        <TextField type="text" label={STRINGS.TOTAL_INCOME} value={sale.totalIncome.toFixed(2)} />
        <FormControl>
          <InputLabel id="status">Status</InputLabel>
          <Select label={STRINGS.STATUS} labelId="status" name="status" required value={sale.status}>
            <MenuItem value="Delivered" onClick={() => dispatch(setStatus('Delivered'))}>
              {STRINGS.DELIVERED}
            </MenuItem>
            <MenuItem value="Pending" onClick={() => dispatch(setStatus('Pending'))}>
              {STRINGS.PENDING}
            </MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={STRINGS.DATE}
            value={sale.date}
            inputFormat="DD.MM.YYYY"
            onChange={newValue => {
              dispatch(setDate(newValue?.toString()));
            }}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Button variant="contained" type="submit" disabled={isLoading}>
        {buttonTitle}
      </Button>
      <Button variant="outlined" onClick={cancelHandler}>
        {STRINGS.CANCEL}
      </Button>
    </form>
  );
};

const useStyles = makeStyles()(theme => ({
  form: {
    display: 'grid',
    gridGap: theme.spacing(2),
    margin: theme.spacing(2),
  },
  orders: {
    display: 'grid',
    gridGap: theme.spacing(2),
  },
  saleForm: {
    display: 'grid',
    gridTemplateColumns: `1fr ${theme.spacing(6.75)}`,
  },
  saleWrapper: {
    display: 'grid',
    gridGap: theme.spacing(2),
  },
  saleBox: {
    display: 'grid',
    gridTemplateColumns: `2fr 1fr 1fr 1fr ${theme.spacing(6.75)}`,
    gridGap: theme.spacing(2),
  },
  addSale: {
    height: theme.spacing(6.75),
    alignSelf: 'start',
  },
  deleteSale: {
    height: theme.spacing(6.75),
  },
  title: {
    fontWeight: '600',
    paddingBottom: '15px',
  },
}));
