import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';

// Components
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

// Actions
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { login, resetFields, setEmail, setPassword } from '../features/login/slice';
import { validateEmail } from '../utils/validateEmail';
import { errorSnackBar } from '../features/snackBar/slice';
import { checkAdmin } from '../features/admin/slice';

// Other resources
import { STATUS } from '../constants/statuses';
import { ROUTES } from '../constants/routes';
import { STRINGS } from '../constants/strings';

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
    if (authToken && isAdmin) {
      dispatch(resetFields());
      navigate(ROUTES.HOME);
    }
  }, [status, isAdmin]);

  useEffect(() => {
    if (failed) dispatch(errorSnackBar(error));
    if (isAdmin) navigate(ROUTES.HOME);
  }, [status]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !validateEmail(email) ? setEmailIsValid(false) : setEmailIsValid(true);
    password.trim().length <= 0 ? setPasswordIsValid(false) : setPasswordIsValid(true);

    if (validateEmail(email) && password.trim().length > 0) {
      await dispatch(login({ email, password }));
      const authToken = sessionStorage.getItem('authToken');
      await dispatch(checkAdmin(authToken));
    }
  };

  if (isAdmin) return <></>;

  return (
    <Box className={classes.wrapper}>
      {isLoading && <LoadingSpinner />}
      <form className={classes.form} onSubmit={submitHandler}>
        <Box className={classes.formFields}>
          <Typography variant="h1" className={classes.title}>
            {STRINGS.SIGN_IN}
          </Typography>
          <TextField
            label={STRINGS.EMAIL}
            type={'email'}
            required
            error={!emailIsValid || failed}
            helperText={!emailIsValid ? `${STRINGS.ENTER_VALID_EMAIL}` : ''}
            value={email}
            onChange={event => dispatch(setEmail(event.target.value))}
            InputProps={{ classes: { root: classes.inputProps } }}
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
          />
          <TextField
            label={STRINGS.PASSWORD}
            type={'password'}
            required
            error={!passwordIsValid || failed}
            helperText={!passwordIsValid ? `${STRINGS.PASSWORD_NOT_EMPTY}` : ''}
            value={password}
            onChange={event => dispatch(setPassword(event.target.value))}
            InputProps={{ classes: { root: classes.inputProps } }}
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
          />
          <Button className={classes.button} variant="contained" type="submit" disabled={isLoading}>
            <Typography variant="h5">{STRINGS.SIGN_IN}</Typography>
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
  inputProps: {
    fontSize: '15px',
  },
  helperText: {
    textAlign: 'center',
    margin: '0',
  },
}));
