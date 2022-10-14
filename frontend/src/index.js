import React from 'react';

import './index.css';

import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf';
import App from './App';

import configureStore from './store';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}


function Root(){
  return(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render( 
<React.StrictMode>
  <Root />
</React.StrictMode>);

// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


