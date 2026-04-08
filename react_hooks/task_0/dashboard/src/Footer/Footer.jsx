import React, { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import NewContext from '../Context/context';
import './Footer.css';

const Footer = () => {
  const { user } = useContext(NewContext);

  return (
    <div className='App-footer'>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user && user.isLoggedIn && (
        <p>
          <a href="mailto:contact@holbertonschool.com">Contact us</a>
        </p>
      )}
    </div>
  );
};

export default Footer;