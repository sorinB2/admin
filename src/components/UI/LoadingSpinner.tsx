import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const LoadingSpinner = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.backDrop}>
      <CircularProgress className={classes.spinner} />
    </Box>
  );
};

const useStyles = makeStyles()(() => ({
  backDrop: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(5, 56, 107, 0.05)',
    zIndex: '1000000',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
  },
  spinner: {
    zIndex: '1000001',
  },
}));
