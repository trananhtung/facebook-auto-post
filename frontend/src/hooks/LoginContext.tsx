// create Info Context

import React, {
  createContext,
  useReducer,
  useState,
  useMemo,
  useCallback,
} from "react";

interface User {
  username: string;
  password: string;
  cookie: string;
  loading: boolean;
  isLogin: boolean;
  isError: boolean;
  errorMess: string;
}

export enum DispatchType {
  USERNAME = "USERNAME",
  PASSWORD = "PASSWORD",
  COOKIE = "COOKIE",
  LOADING_TOGGLER = "LOADING_TOGGLER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  ERROR = "ERROR",
}

interface Action {
  type: DispatchType;
  payload?: string;
}

const initialState: User = {
  username: "",
  password: "",
  cookie: "",
  loading: false,
  isLogin: false,
  isError: false,
  errorMess: "",
};

const reducer = (state: User, action: Action): User => {
  switch (action.type) {
    case DispatchType.LOADING_TOGGLER:
      return {
        ...state,
        loading: !state.loading,
      };
    case DispatchType.LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case DispatchType.LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case DispatchType.ERROR:
      return {
        ...state,
        isError: !!action.payload,
        errorMess: action.payload || "",
      };
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

interface UserContextType {
  status: {
    loading: boolean;
    login: boolean;
    error: boolean;
    errorMess: string;
  };
  dispatch: React.Dispatch<Action>;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const loginFn = () => new Promise((resolve) => setTimeout(resolve, 2000));

const validate = (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("Username or password is empty");
  }
};

export const InfoContext = createContext<UserContextType>({
  status: {
    loading: false,
    login: false,
    error: false,
    errorMess: "",
  },
  dispatch: () => {},
  login: () => {},
  logout: () => {},
});

export const InfoProvider: React.FC<Props> = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  const login = useCallback(async (username: string, password: string) => {
    dispatch({ type: DispatchType.LOADING_TOGGLER });
    dispatch({ type: DispatchType.ERROR, payload: "" });
    try {
      validate(username, password);
      await loginFn();
      dispatch({ type: DispatchType.LOGIN });
      dispatch({ type: DispatchType.USERNAME, payload: username });
    } catch (error) {
      let message = "Something went wrong";
      if (error instanceof Error) message = error.message;
      dispatch({ type: DispatchType.ERROR, payload: message });
    } finally {
      dispatch({ type: DispatchType.LOADING_TOGGLER });
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: DispatchType.LOGOUT });
  }, []);

  const value = useMemo(
    () => ({
      dispatch,
      login,
      logout,
      status: {
        loading: user.loading,
        login: user.isLogin,
        error: user.isError,
        errorMess: user.errorMess,
      },
    }),
    [dispatch, login, user]
  );

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};

// export useInfo hook
export const useUserContext = () => React.useContext(InfoContext);
