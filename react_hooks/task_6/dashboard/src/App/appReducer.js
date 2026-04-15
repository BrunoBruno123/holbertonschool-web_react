export const APP_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  TOGGLE_DRAWER: "TOGGLE_DRAWER",
  MARK_NOTIFICATION_READ: "MARK_NOTIFICATION_READ",
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  SET_COURSES: "SET_COURSES",
};

export const initialState = {
  displayDrawer: true,
  user: {
    email: "",
    password: "",
    isLoggedIn: false,
  },
  notifications: [],
  courses: [],
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.LOGIN: {
      const email =
        action.payload !== undefined ? action.payload.email : action.email;

      const password =
        action.payload !== undefined ? action.payload.password : action.password;

      return {
        ...state,
        user: {
          ...initialState.user, 
          email: email ?? "",
          password: password ?? "",
          isLoggedIn: true,
        },
      };
    }

    case APP_ACTIONS.LOGOUT:
      return {
        ...state,
        user: { ...initialState.user }, 
      };

    case APP_ACTIONS.TOGGLE_DRAWER:
      return {
        ...state,
        displayDrawer:
          action.payload !== undefined
            ? action.payload
            : !state.displayDrawer,
      };

    case APP_ACTIONS.MARK_NOTIFICATION_READ: {
      const id =
        action.payload !== undefined ? action.payload : action.id;

      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== id
        ),
      };
    }

    case APP_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload ?? action.notifications ?? [],
      };

    case APP_ACTIONS.SET_COURSES:
      return {
        ...state,
        courses: action.payload ?? action.courses ?? [],
      };

    default:
      return state; 
  }
}