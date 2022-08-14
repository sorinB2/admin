import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>This is the home page</p>
      <button onClick={() => navigate('/counter')}>Go to the counter page</button>
    </div>
  );
};
