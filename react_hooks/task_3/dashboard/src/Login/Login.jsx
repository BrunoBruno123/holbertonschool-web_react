import React, { useState } from 'react';
import './Login.css';
import WithLogging from '../HOC/WithLogging';

const Login = ({ logIn, email = '', password = '' }) => {
  const [formData, setFormData] = useState({
    email,
    password,
  });

  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateFields = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;

    setFormData((prev) => {
      const updated = { ...prev, email: newEmail };
      setEnableSubmit(validateFields(updated.email, updated.password));
      return updated;
    });
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;

    setFormData((prev) => {
      const updated = { ...prev, password: newPassword };
      setEnableSubmit(validateFields(updated.email, updated.password));
      return updated;
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (logIn) {
      logIn(formData.email, formData.password);
    }
  };

  return (
    <div className='App-body'>
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChangeEmail}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChangePassword}
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
};

Login.defaultProps = {
  logIn: () => {},
  email: '',
  password: '',
};

const LoginWithLogging = WithLogging(Login);

export default LoginWithLogging;