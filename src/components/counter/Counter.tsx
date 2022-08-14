import React from 'react';
import { decrement, increment } from '../../features/counter/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

export const Counter = () => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(state => state.counter.value);
  return (
    <div>
      <div>This is a counter</div>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      {counterValue}
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
};
