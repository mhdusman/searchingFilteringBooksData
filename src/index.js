import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
import { store } from './store'//persistor
import './static/index.css';
// import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <Routes />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
