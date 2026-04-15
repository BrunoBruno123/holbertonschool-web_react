import axios from "axios";
import { useCallback, useEffect, useReducer, useRef } from "react";
import CourseList from "../CourseList/CourseList";
import "../CourseList/CourseList.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Notifications from "../Notifications/Notifications";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import { getLatestNotification } from "../utils/utils";
import { appReducer, initialState, APP_ACTIONS } from "./appReducer";
import "./App.css";

function normalizeNotifications(data) {
  const nextNotifications = Array.isArray(data)
    ? data
    : Array.isArray(data?.notifications)
      ? data.notifications
      : [];

  return nextNotifications.map((notification) =>
    notification.html
      ? {
          ...notification,
          html: { __html: getLatestNotification() },
        }
      : notification
  );
}

function normalizeCourses(data) {
  return Array.isArray(data)
    ? data
    : Array.isArray(data?.courses)
      ? data.courses
      : [];
}

function logDevelopmentError(error) {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    console.error(error);
  }
}

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { displayDrawer, user, notifications, courses } = state;
  const removedNotificationIdsRef = useRef(new Set());

  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get("/notifications.json");

        if (isMounted) {
          const normalized = normalizeNotifications(data).filter(
            (notification) =>
              !removedNotificationIdsRef.current.has(notification.id)
          );
          dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: normalized });
        }
      } catch (error) {
        logDevelopmentError(error);
      }
    };

    fetchNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/courses.json");

        if (isMounted) {
          dispatch({
            type: APP_ACTIONS.SET_COURSES,
            payload: normalizeCourses(data),
          });
        }
      } catch (error) {
        logDevelopmentError(error);
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: true });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: false });
  }, []);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    removedNotificationIdsRef.current.add(id);
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
  }, []);

  return (
    <div className="notifications-header">
      <Header user={user} logOut={logOut} />
      <div className="root-notifications">
        <Notifications
          notifications={notifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
      </div>

      {user.isLoggedIn ? (
        <BodySectionWithMarginBottom title="Course list">
          <CourseList courses={courses} />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login logIn={logIn} />
        </BodySectionWithMarginBottom>
      )}

      <BodySection title="News from the School">
        <p>Holberton School News goes here</p>
      </BodySection>

      <Footer user={user} />
    </div>
  );
};

export default App;