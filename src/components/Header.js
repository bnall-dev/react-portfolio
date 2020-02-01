import React from 'react';

function Header({ user, handleChangeUser }) {
  return (
    <div id="header">
      <a href="#">
        <img id="avatar" src={user.avatar} alt="User's Avatar"></img>
      </a>
      <div id="welcomeText">
        <h2 id="welcome">Welcome</h2>
        <h1 id="userEmail">{user.email}</h1>
      </div>

      <button id="changeUser" onClick={handleChangeUser}>
        Change User
      </button>
    </div>
  );
}

export default Header;
