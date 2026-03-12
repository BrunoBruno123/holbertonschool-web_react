import holbertonLogo from './assets/holberton-logo.jpg'
import Notifications from './Notifications'
import './App.css'

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>

      <div className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1 style={{ color: "#e1003c" }}>School dashboard</h1>
      </div>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <div className="App-footer">
        <p>Copyright {new Date().getFullYear()} - holberton School</p>
      </div>
    </>
  )
}

export default App