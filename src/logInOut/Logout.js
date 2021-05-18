import React from 'react';
import {
  destroySession
} from '../api/logInOutApiInterface.js'

function LogoutButton(props) {
  return (
    <button
      className="loginButton"
      onClick={ () => {
        destroySession();//.then((response) => console.log(response.data));
        props.onClick()
      }}
    >
      Logout
    </button>
  )
}

export { LogoutButton };
