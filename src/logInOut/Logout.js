import React from 'react';
// import {
//   destroySession
// } from '../api/logInOutApiInterface.js'

function LogoutButton(props) {
  return (
    <button
      className="loginButton"
      onClick={ () => {
        // destroySession();
        destroyToken();
        props.onClick()
      }}
    >
      Logout
    </button>
  )
}

function destroyToken() {
  localStorage.removeItem('token');
}

export { LogoutButton };
