import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { LoginProvider } from './utils/context';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    padding: 0px;
    background-color: #E5E5E5;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
        <GlobalStyle />
        {/* <Header />
        <Body /> */}
        <Switch>
          <Route exact path={`/login`}>
            <Login />
          </Route>
          <Route path={`/`}>
            <Admin />
          </Route>
        </Switch>
      </LoginProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
