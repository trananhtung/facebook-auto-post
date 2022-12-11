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
}

export enum DispatchType {
  USERNAME = "USERNAME",
  PASSWORD = "PASSWORD",
  COOKIE = "COOKIE",
  LOADING_TOGGLER = "LOADING_TOGGLER",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
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
  };
  dispatch: React.Dispatch<Action>;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const loginFn = () => new Promise((resolve) => setTimeout(resolve, 2000));

export const InfoContext = createContext<UserContextType>({
  status: {
    loading: false,
    login: false,
  },
  dispatch: () => {},
  login: () => {},
  logout: () => {},
});

export const InfoProvider: React.FC<Props> = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  const login = useCallback(async (username: string, password: string) => {
    dispatch({ type: DispatchType.LOADING_TOGGLER });
    try {
      await loginFn();
      dispatch({ type: DispatchType.LOGIN });
      dispatch({ type: DispatchType.USERNAME, payload: username });
    } catch (e) {
      console.log(e);
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
      status: { loading: user.loading, login: user.isLogin },
    }),
    [dispatch, login, user]
  );

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};

// export useInfo hook
export const useUserContext = () => React.useContext(InfoContext);
