import { Component } from 'react'
import CourseList from '../CourseList/CourseList'
import '../CourseList/CourseList.css'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Notifications from '../Notifications/Notifications'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.notificationsList = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      {
        id: 3,
        type: "urgent",
        html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
      },
    ];
    this.coursesList = [
      { id: 1, name: "ES6", credit: "60" },
      { id: 2, name: "Webpack", credit: "20" },
      { id: 3, name: "React", credit: "40" },
    ];

    // Key combo property
    this.handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        alert("Logging you out");

        this.props.logOut();
      }
    }
  }

  componentDidMount() {
    // listen for keyboard clicks
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <>
        <div className="notifications-header">
          <Header />
          <div className="root-notifications">
            <Notifications notifications={this.notificationsList} />
          </div>
        </div>
        {isLoggedIn ? (
          <div className="courses-body">
            <CourseList courses={this.coursesList} />
          </div>
        ) : (
          <Login />
        )}
        <Footer />
      </>
    );
  }

}

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => { }
};

export default App;