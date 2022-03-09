/* eslint-disable no-console */
import {
  LOGIN, GET_LAST_USER, LOGOUT, saveUserInfo, sendForm,
  GET_NEW_PASSWORD,
} from 'src/actions/authenticationActions';
import axiosInstance from 'src/axiosInstance';

const authenticationMiddleware = (store) => (next) => (action) => {
  const authenticationState = store.getState().authentication;
  switch (action.type) {
    case LOGIN: {
      const { email: stateEmail, password } = authenticationState;
      axiosInstance
        .post('login_check', {
          username: stateEmail,
          password,
        })
        .then((response) => {
          console.log(response);

          // Store JWT token in local storage to use it later
          localStorage.setItem('token', response.data.token);
          const { email, firstname, lastname } = response.data.data;

          store.dispatch(saveUserInfo(email, firstname, lastname));
        })
        .catch((error) => {
          console.log(error);
          store.dispatch(sendForm(true));
        });
      next(action);
      break;
    }

    case GET_LAST_USER:
      // If there is a token in local storage, then pick it up
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');

        // Retrieve user info from api thanks to jwt token
        axiosInstance
          .get('user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
            // const { email, firstname, lastname } = response.data;
            store.dispatch(saveUserInfo('email', 'firstname', 'lastname'));
          })
          .catch((error) => {
            console.log(error);
          });
      }
      next(action);
      break;

    case GET_NEW_PASSWORD:
      axiosInstance
        .post('user/reset-password', {
          email: store.getState().authentication.email,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;

    case LOGOUT:
      localStorage.removeItem('token');
      next(action);
      break;
    default:
      next(action);
  }
};

export default authenticationMiddleware;
