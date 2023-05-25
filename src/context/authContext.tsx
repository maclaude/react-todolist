import { ReactNode, createContext, useContext, useState } from 'react';

type AuthContextType = {
  authenticated: boolean;
  login: () => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const initialAuthContext: AuthContextType = {
  authenticated: false,
  login: () => {},
  logout: () => {},
};

// Create the authentication context
export const AuthContext = createContext(initialAuthContext);

// Create the authentication provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  const setUserId = (userId: string) => {
    setId(userId);
  };

  const setUserToken = (userToken: string) => {
    setToken(userToken);
  };

  // Pass the authentication state and methods to the context
  const authContextValue = {
    authenticated,
    id,
    token,
    login,
    logout,
    setUserId,
    setUserToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
