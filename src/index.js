import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
// import keycloakInst from './security/keycloak';

// const initOptions = { onLoad: 'login-required' };
// const initOptions = { 
//   onLoad: 'login-required',
//   promiseType: 'native', 
//   checkLoginIframe: false, 
//   clientSecret: 'J3M3KwmGHUEdj0L7eMXFDOU2B8JEz3Xi',
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ReactKeycloakProvider authClient={keycloakInst} initOptions={initOptions}>
//   <App /> 
// </ReactKeycloakProvider>,
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ReactKeycloakProvider
  //   authClient={keycloakInst}
  //   initOptions={initOptions}
  //   onEvent={(event, error) => {
  //     console.log(`Keycloak event: ${event}`);
  //     if (event === 'onAuthSuccess') {
  //       // Store token in localStorage on successful authentication
  //       localStorage.setItem('keycloakToken', keycloakInst.token);
  //     }
  //   }}
  //   onTokens={(tokens) => {
  //     console.log('Tokens updated:', tokens);
  //     // Store updated tokens
  //     localStorage.setItem('keycloakToken', tokens.token);
  //     localStorage.setItem('keycloakRefreshToken', tokens.refreshToken);
  //   }}
  // >
    <App />
  // </ReactKeycloakProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
