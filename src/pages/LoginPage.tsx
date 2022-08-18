import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const LoginPage = () => {
  const { classes } = useStyles();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Box className={classes.wrapper}>
      <form className={classes.form} onSubmit={submitHandler}>
        <Box className={classes.formFields}>
          <Typography variant="h1" className={classes.title}>
            Sign In
          </Typography>
          <TextField size="small" label="Email" type={'email'} />
          <TextField size="small" label="Password" type={'password'} />
          <Button className={classes.button} variant="contained" type="submit">
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
    height: theme.spacing(60),
    width: theme.spacing(55),
    borderRadius: '10px',
  },
  formFields: {
    display: 'grid',
    gridTemplateRows: '90px 60px 60px 70px',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
  },
  button: {
    width: theme.spacing(40),
    height: theme.spacing(5),
    alignSelf: 'end',
  },
}));
