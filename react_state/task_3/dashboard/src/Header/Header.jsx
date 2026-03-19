import React, { Component } from 'react';
import logo from '../assets/holberton-logo.jpg';
import './Header.css';
import newContext from '../Context/context';

class Header extends Component {
  render() {
    const { user, logOut } = this.context;

    return (
      <div className='App-header'>
        <img src={logo} alt="holberton logo" />
        <h1 style={{ color: '#e1003c' }}>School dashboard</h1>
        {user && user.isLoggedIn && (
          <section id="logoutSection">
            Welcome {user.email}{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); logOut(); }}>
              (logout)
            </a>
          </section>
        )}
      </div>
    );
  }
}

Header.contextType = newContext;

export default Header;