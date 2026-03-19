import React, { Component } from 'react';
import './Login.css';
import WithLogging from '../HOC/WithLogging';

class Login extends Component {
  constructor(props) {
    super(props);
    const { email = '', password = '' } = props;
    this.state = {
      email,
      password,
      enableSubmit: false,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const { logIn } = this.props;
    if (logIn) {
      logIn(this.state.email, this.state.password);
    }
  }

  validateFields(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
  }

  handleChangeEmail(e) {
    const email = e.target.value;
    this.setState((prevState) => ({
      email,
      enableSubmit: this.validateFields(email, prevState.password),
    }));
  }

  handleChangePassword(e) {
    const password = e.target.value;
    this.setState((prevState) => ({
      password,
      enableSubmit: this.validateFields(prevState.email, password),
    }));
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleChangePassword}
          />
          <button
            type="submit"
            disabled={!enableSubmit}
          >
            OK
          </button>
        </form>
      </div>
    );
  }
}

Login.defaultProps = {
  logIn: () => {},
  email: '',
  password: '',
};

const LoginWithLogging = WithLogging(Login);

export default LoginWithLogging;