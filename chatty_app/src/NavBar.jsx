// jshint ignore: start

import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    const singularOrPlural = (this.props.userCount === 1) ? 'user' : 'users';
    return (
      <nav className='navbar'>
        <div id='logo-bar'>
          <img id='logo' src={'../build/crab.svg'} /><a href='/' className='navbar-brand'>CrabbyApp</a>
        </div>
        <span style={{ lineHeight: 75 + 'px' }}>{this.props.userCount} {singularOrPlural} online</span>
      </nav>
    );
  }
}

export default NavBar;