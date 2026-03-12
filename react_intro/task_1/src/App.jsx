import holbertonLogo from './assets/holberton-logo.jpg'
import Notifications from './Notifications'  // make sure this matches
import { getCurrentYear, getFooterCopy } from './utils'
import './App.css'

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />  {/* Now renders correctly */}
      </div>

      <div className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1 style={{ color: "#e1003c" }}>School dashboard</h1>
      </div>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <div className="App-footer">
        <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      </div>
    </>
  )
}

export default App