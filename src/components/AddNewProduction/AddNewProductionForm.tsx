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
  Modal,
  Button,
  Typography,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// Actions
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getProducts } from '../../features/allProducts/slice';
import {
  addProduct,
  createNewProduction,
  discardData,
  removeProduct,
  setProductId,
  setProductType,
  setProductUnits,
  setSelectedProducts,
} from '../../features/newProduction/slice';
import { errorSnackBar, successSnackBar } from '../../features/snackBar/slice';

// Other resources
import { STRINGS } from '../../constants/strings';
import { STATUS } from '../../constants/statuses';

export const AddNewProductionForm = ({ isVisible, hideModal }: { isVisible: boolean; hideModal: () => void }) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector(state => state.allProducts);
  const { production, selectedProducts, status, error } = useAppSelector(state => state.newProduction);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (status === STATUS.FAILED) dispatch(errorSnackBar(error));
    if (status === STATUS.FULFILLED) {
      dispatch(successSnackBar(STRINGS.PRODUCTION_SUCCESS));
      hideModal();
      setTimeout(() => dispatch(discardData()), 1000);
    }
  }, [status]);

  const selectChangeHandler = (e: SelectChangeEvent, i: number) => {
    const { value } = e.target;
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

  const cancelHandler = () => {
    hideModal();
    dispatch(discardData());
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createNewProduction(production));
  };

  return (
    <Modal open={isVisible} className={classes.modal} onClose={hideModal}>
      <Box className={classes.formWrapper}>
        <form className={classes.form} onSubmit={submitHandler}>
          <Typography variant="h1" className={classes.title}>
            {STRINGS.ADD_NEW_PRODUCTION}
          </Typography>
          <Box className={classes.productsForm}>
            <Box>
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
                              {`${product.brand} ${product.name} (${product.wipes} buc)`}
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
                      className={classes.removeProduct}
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
          <Box className={classes.buttonsBox}>
            <Button variant="outlined" onClick={cancelHandler} className={classes.cancelButton}>
              {STRINGS.CANCEL}
            </Button>
            <Button variant="contained" className={classes.submitButton} type="submit">
              {STRINGS.ADD_NEW_PRODUCTION}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles()(theme => ({
  modal: {
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
  },
  formWrapper: {
    width: '800px',
    minHeight: '300px',
    maxHeight: '500px',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    paddingBottom: '0',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    outline: 'none',
  },
  form: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '50px auto 72px',
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: '600',
  },
  productsForm: {
    display: 'grid',
    gridTemplateColumns: `auto ${theme.spacing(6.75)}`,
  },
  productsBox: {
    display: 'grid',
    gridTemplateColumns: `1fr 1fr ${theme.spacing(6.75)}`,
    gridGap: '15px',
    marginBottom: theme.spacing(2),
  },
  addProduct: {
    height: theme.spacing(6.75),
    alignSelf: 'start',
  },
  removeProduct: {
    height: theme.spacing(6.75),
  },
  buttonsBox: {
    display: 'grid',
    gridTemplateColumns: '125px auto',
    gridGap: theme.spacing(2),
    justifyContent: 'end',
    alignContent: 'end',
  },
  cancelButton: {
    marginBottom: theme.spacing(4),
  },
  submitButton: {
    marginBottom: theme.spacing(4),
  },
}));
