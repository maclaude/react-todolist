import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  authenticated: boolean;
  id: string;
  token: string;
  login: (userId: string, token: string) => void;
  logout: () => void;
  setUserId: (userId: string) => void;
  setUserToken: (userToken: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const initialAuthContext: AuthContextType = {
  authenticated: false,
  id: '',
  token: '',
  login: () => {},
  logout: () => {},
  setUserId: () => {},
  setUserToken: () => {},
};

// Create the authentication context
export const AuthContext = createContext(initialAuthContext);

// Create the authentication provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const storedAuthCredentials = JSON.parse(
    sessionStorage.getItem('authCredentials')!,
  );

  const getAuthenticated = () => storedAuthCredentials?.authenticated || false;
  const getId = () => storedAuthCredentials?.id || '';
  const getToken = () => storedAuthCredentials?.token || '';

  const [authenticated, setAuthenticated] = useState(getAuthenticated());
  const [id, setId] = useState(getId());
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    // INFO: For dev purpose store auth credentials in session storage
    //       -> TODO: find a more secure way for production
    sessionStorage.setItem(
      'authCredentials',
      JSON.stringify({ authenticated, id, token }),
    );
  }, [authenticated]);

  const login = (userId: string, userToken: string) => {
    setAuthenticated(true);
    setId(userId);
    setToken(userToken);
  };

  const logout = () => {
    setAuthenticated(false);
    setId('');
    setToken('');
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
