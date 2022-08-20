import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

export const MainLayout = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.sideBar} />
      <Box className={classes.outlet}>
        <Outlet />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.common.lightBackground,
    display: 'grid',
    gridTemplateColumns: '220px auto',
  },
  sideBar: {
    width: '220px',
    height: '100vh',
  },
  outlet: {
    height: 'calc(100vh - 40px)',
    boxSizing: 'border-box',
    margin: `${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(2.5)}`,
    padding: theme.spacing(3.125),
    backgroundColor: '#FEFEFE',
    borderRadius: '15px',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.08)',
  },
}));
