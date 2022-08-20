import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

// Components
import { Sidebar } from '../components/Sidebar/Sidebar';

export const MainLayout = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.sideBar}>
        <Sidebar />
      </Box>
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
    gridTemplateColumns: '250px auto',
  },
  sideBar: {
    width: '250px',
    height: '100vh',
    display: 'grid',
    justifyContent: 'center',
  },
  outlet: {
    height: 'calc(100vh - 40px)',
    boxSizing: 'border-box',
    margin: `${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(2.5)} 0`,
    padding: theme.spacing(3.125),
    backgroundColor: '#FEFEFE',
    borderRadius: '15px',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.08)',
  },
}));
