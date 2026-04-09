import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import NewContext from '../Context/context';
import './App.css';

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the JSON file on mount
  useEffect(() => {
    axios.get('/notifications.json')
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch notifications:', err);
      });
  }, []);

  // Ctrl+h keyboard shortcut to log out
  const logOut = useCallback(() => {
    setUser({ email: '', password: '', isLoggedIn: false });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ('key' in e && e.ctrlKey && e.key === 'h') {
        alert('Logging you out');
        logOut();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [logOut]);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NewContext.Provider value={{ user, logOut }}>
      <>
        <div className="root-notifications">
          <Notifications
            notifications={notifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={handleDisplayDrawer}
            handleHideDrawer={handleHideDrawer}
            markNotificationAsRead={markNotificationAsRead}
          />
        </div>
        <Header />

        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={coursesList} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} email={user.email} password={user.password} />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>

        <Footer />
      </>
    </NewContext.Provider>
  );
}

export default App;