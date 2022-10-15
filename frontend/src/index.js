import React from 'react';
import { createRoot } from 'react-dom/client';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import * as sessionActions from './store/session';

import configureStore from './store/index';
import { restoreCSRF, csrfFetch } from './store/csrf';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

const Root = ()=>{
  return (
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);
