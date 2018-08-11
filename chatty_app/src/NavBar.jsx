// jshint ignore: start

import React, {Component} from 'react';

function NavBar(props) {
  const singularOrPlural = (props.userCount === 1) ? "user" : "users";
  return (
    <nav className="navbar">
      <div id="logo-bar">
        <img id="logo" src={'../images/crab.svg'} /><a href="/" className="navbar-brand">CrabbyApp</a>
      </div>
      <span style={{ lineHeight: 75 + 'px' }}>{props.userCount} {singularOrPlural} online</span>
    </nav>
  );
}

export default NavBar;