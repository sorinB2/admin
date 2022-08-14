import React from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Counter } from '../components/counter/Counter';

export const CounterPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <p>Welcome to the counter page</p>
      <Counter />
      <button onClick={() => navigate('/')}>Go back to home page</button>
    </>
  );
};
