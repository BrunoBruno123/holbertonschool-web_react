import { getCurrentYear, getFooterCopy } from '../utils/utils';
import Notifications from '../Notifications/Notifications';
import image3 from '../assets/holberton-logo.jpg';
import './App.css';


function App() {

  return (
    <>
      <div>
        <Notifications />
      </div>
      <div className='App-header'>
        <img src={image3} alt='holberton logo' />
        <h1 style={{ color: "#e1003c" }}>School dashboard</h1>
      </div>

      <div className='App-body'>
        <p> Login to access the full dashboard</p>
        <label htmlFor="email">email</label>
        <input type="email" id="email"></input>

        <label htmlFor="password">password</label>
        <input type="password" id="password"></input>

        <button type="submit">OK</button>
      </div>
      <div className='App-footer'>
        <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      </div>
    </>
  )
}

export default App