import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from '@store/store';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </Provider>
);
