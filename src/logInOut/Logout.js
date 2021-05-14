import React, { Component } from 'react';

function LogoutButton(props) {
  return (
    <button
      className="loginButton"
      onClick={props.onClick}
    >
      Logout
    </button>
  )
}

export { LogoutButton };
