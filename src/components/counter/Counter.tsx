import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// Actions
import { decrement, increment } from '../../features/counter/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

export const Counter = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(state => state.counter.value);
  return (
    <Card>
      <Typography>This is a counter</Typography>
      <Button className={classes.button} onClick={() => dispatch(decrement())}>
        Decrement
      </Button>
      {counterValue}
      <Button className={classes.button} onClick={() => dispatch(increment())}>
        Increment
      </Button>
    </Card>
  );
};

const useStyles = makeStyles()(theme => ({
  button: {
    fontSize: theme.typography.h3.fontSize,
  },
}));
