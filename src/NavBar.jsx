import React, {Component} from 'react';

function NavBar(props) {
  const singularOrPlural = (props.userCount - 1 === 1) ? "user" : "users";
  return (
    <nav className="navbar">
      <img src={'../crab.svg'} /><a href="/" className="navbar-brand">CrabbyApp</a><em style={{ lineHeight: 60 + 'px' }}>Let it all out</em>
      <span style={{ lineHeight: 60 + 'px' }}>{props.userCount - 1} other {singularOrPlural} online</span>
    </nav>
  );
}

export default NavBar;