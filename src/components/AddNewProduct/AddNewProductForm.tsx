import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

// Actions
import {
  createNewProduct,
  discard,
  setBrand,
  setDensity,
  setFragrance,
  setMaterial,
  setName,
  setStock,
  setWidth,
  setWipes,
} from '../../features/newProduct/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { errorSnackBar, successSnackBar } from '../../features/snackBar/slice';

// Other resources
import { STATUS } from '../../constants/statuses';
import { ROUTES } from '../../constants/routes';

export const AddNewProductFrom = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productData, status, error } = useAppSelector(state => state.newProduct);

  useEffect(() => {
    if (status === STATUS.FAILED) dispatch(errorSnackBar(error));
    if (status === STATUS.FULFILLED) {
      dispatch(successSnackBar('Product added successfully'));
      navigate(ROUTES.PRODUCTS);
    }
    setTimeout(() => dispatch(discard()), 1000);
  }, [status]);

  const handleMaterialChange = (event: SelectChangeEvent) => {
    dispatch(setMaterial(event.target.value));
  };

  const handleFragranceChange = (event: SelectChangeEvent) => {
    dispatch(setFragrance(event.target.value));
  };

  const cancelHandler = () => {
    navigate(ROUTES.PRODUCTS);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createNewProduct(productData));
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Typography variant="h1" className={classes.title}>
        Add new product
      </Typography>
      <TextField type="text" label="Brand" required onChange={e => dispatch(setBrand(e.target.value))} />
      <TextField type="text" label="Name" required onChange={e => dispatch(setName(e.target.value))} />
      <Box className={classes.inputBox}>
        <TextField label="Number of wipes" type="number" required onChange={e => dispatch(setWipes(e.target.value))} />
        <TextField label="Stock" type="number" required onChange={e => dispatch(setStock(e.target.value))} />
      </Box>
      <Box className={classes.inputBox}>
        <TextField
          label="Density"
          type="number"
          required
          onChange={e => dispatch(setDensity(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">gsm</InputAdornment>,
          }}
        />
        <TextField
          label="Width"
          type="number"
          required
          onChange={e => dispatch(setWidth(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
        />
      </Box>
      <Box className={classes.inputBox}>
        <FormControl>
          <InputLabel id="fragrance">Fragrance</InputLabel>
          <Select
            label="Fragrance"
            labelId="fragrance"
            value={productData.fragrance}
            required
            onChange={handleFragranceChange}
          >
            <MenuItem value="ocean">Ocean</MenuItem>
            <MenuItem value="weekend">Weekend</MenuItem>
            <MenuItem value="sunset">Sunset</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="type-of-material">Type of material</InputLabel>
          <Select
            label="Type of material"
            labelId="type-of-material"
            value={productData.material}
            required
            onChange={handleMaterialChange}
          >
            <MenuItem value="plain">Plain</MenuItem>
            <MenuItem value="embossed">Embossed</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.inputBox}>
        <Button variant="contained" type="submit">
          Add product
        </Button>
        <Button variant="outlined" onClick={cancelHandler}>
          Cancel
        </Button>
      </Box>
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
  title: {
    fontWeight: '600',
    paddingBottom: '15px',
  },
  inputBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px',
  },
}));
