import React from 'react';
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import './Footer.css';
// eslint-disable-next-line no-unused-vars
import newContext from '../Context/context';

const Footer = () => {
  return (
    <newContext.Consumer>
      {({ user }) => (
        <div className='App-footer'>
          <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
          {user && user.isLoggedIn && (
            <p><a href="#">Contact us</a></p>
          )}
        </div>
      )}
    </newContext.Consumer>
  );
};

export default Footer;