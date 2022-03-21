import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import Header from './components/Header'
import { createGlobalStyle } from 'styled-components';
import Body from './components/Body';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    padding: 0px;
    background-color: #E5E5E5;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Header />
    <Body />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
