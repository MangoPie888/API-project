import React from 'react';
import { createRoot } from 'react-dom/client';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';

import configureStore from './store/index'

const store = configureStore();

if(process.env.NODE_ENV !== 'production') {
  window.store = store
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
