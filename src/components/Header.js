import React from "react";

function Header({ user, handleChangeUser }) {
  return (
    <div id="header">
      <img id="avatar" src={user.avatar} alt="User's Avatar"></img>
      <h2 id="welcome">Welcome {user.email}</h2>
      <button id="changeUser" onClick={handleChangeUser}>
        Change User
      </button>
    </div>
  );
}

export default Header;
