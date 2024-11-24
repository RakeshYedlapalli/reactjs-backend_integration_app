// keycloak.js
import Keycloak from 'keycloak-js';

// const keycloakConfig = {
//   url: 'http://localhost:3400/',
//   realm: 'keycloak-sso',
//   clientId: 'spring-end-to-end-2',
//   clientSecret: '3Cvlye6zH1PyxZqpCNOSETHsatxJHuBy',
//   grant_type: 'password'
// };


const keycloakInst = new Keycloak({
  url: 'http://localhost:3400/',
  realm: 'keycloak-sso',
  clientId: 'spring-react-end-to-end',
  clientSecret: 'J3M3KwmGHUEdj0L7eMXFDOU2B8JEz3Xi',
    grant_type: 'password'
});

const initKeycloak = async () => {
  try {
    const authenticated = await keycloakInst.init({
      onLoad: 'login-required', // Automatically log in if not authenticated
      checkLoginIframe: false, // Improves performance
    });

    if (authenticated) {
      console.log('User authenticated');

      // Store the token in localStorage
      localStorage.setItem('keycloakToken', keycloakInst.token);

      // Set up periodic token refresh
      setInterval(async () => {
        try {
          const refreshed = await keycloakInst.updateToken(30); // Refresh token if it expires in less than 30 seconds
          if (refreshed) {
            console.log('Token refreshed');
            localStorage.setItem('keycloakToken', keycloakInst.token);
          }
        } catch (error) {
          console.error('Failed to refresh token', error);
        }
      }, 60000); // Check every minute
    } else {
      console.warn('User is not authenticated');
      keycloakInst.login(); // Redirect to Keycloak login page
    }
  } catch (error) {
    console.error('Keycloak initialization failed', error);
  }
};

export default keycloakInst;

// export default keycloakConfig;
