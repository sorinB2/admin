import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';

// Actions
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { login, resetFields, setEmail, setPassword } from '../features/login/slice';
import { validateEmail } from '../utils/validateEmail';
import { errorSnackBar } from '../features/snackBar/slice';

// Other resources
import { STATUS } from '../constants/statuses';

export const LoginPage = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, password, status, error } = useAppSelector(state => state.login);
  const isAdmin = useAppSelector(state => state.admin.isAdmin);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const isLoading = status === STATUS.PENDING;
  const failed = status === STATUS.FAILED;

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      dispatch(resetFields());
      navigate('/');
    }
  }, [status]);

  useEffect(() => {
    if (failed) dispatch(errorSnackBar(error));
    if (isAdmin) navigate('/');
  }, [status]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !validateEmail(email) ? setEmailIsValid(false) : setEmailIsValid(true);
    password.trim().length <= 0 ? setPasswordIsValid(false) : setPasswordIsValid(true);

    if (validateEmail(email) && password.trim().length > 0) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <Box className={classes.wrapper}>
      {isLoading && <CircularProgress className={classes.spinner} />}
      <form className={classes.form} onSubmit={submitHandler}>
        <Box className={classes.formFields}>
          <Typography variant="h1" className={classes.title}>
            Sign In
          </Typography>
          <TextField
            label="Email"
            type={'email'}
            required
            error={!emailIsValid || failed}
            helperText={!emailIsValid ? 'Enter a valid email' : ''}
            value={email}
            onChange={event => dispatch(setEmail(event.target.value))}
            InputProps={{ classes: { root: classes.inputProps } }}
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
          />
          <TextField
            label="Password"
            type={'password'}
            required
            error={!passwordIsValid || failed}
            helperText={!passwordIsValid ? 'Password should not be empty' : ''}
            value={password}
            onChange={event => dispatch(setPassword(event.target.value))}
            InputProps={{ classes: { root: classes.inputProps } }}
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
          />
          <Button className={classes.button} variant="contained" type="submit" disabled={isLoading}>
            <Typography variant="h5">Sign In</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    height: '100vh',
    width: '100vw',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    background: 'radial-gradient(circle, rgba(55,150,131,1) 0%, rgba(5,56,107,1) 100%)',
  },
  form: {
    background: theme.palette.common.white,
    position: 'relative',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    height: theme.spacing(65),
    width: theme.spacing(60),
    borderRadius: '10px',
  },
  formFields: {
    display: 'grid',
    gridTemplateRows: '90px 75px 60px 80px',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
  },
  button: {
    width: theme.spacing(47),
    height: theme.spacing(5.5),
    alignSelf: 'end',
  },
  spinner: {
    zIndex: '10',
    position: 'absolute',
    bottom: 'calc(50vh - 20px)',
    right: 'calc(50vw - 20px)',
  },
  inputProps: {
    fontSize: '15px',
  },
  helperText: {
    textAlign: 'center',
    margin: '0',
  },
}));
