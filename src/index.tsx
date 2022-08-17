import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';

// Components
import { App } from './App';

// Other resources
import { store } from './store/store';
import './index.css';
import { theme } from './themes/theme';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
);
