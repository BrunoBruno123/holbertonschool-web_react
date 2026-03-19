import React, { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import NewContext from '../Context/context';
import './Footer.css';

const Footer = () => {
  const { user } = useContext(NewContext);

  return (
    <div className='App-footer'>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user.isLoggedIn && (
        <p>
          <a href="/contact">Contact us</a>
        </p>
      )}
    </div>
  );
};

export default Footer;