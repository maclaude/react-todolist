import { useAuth } from '../context/authContext';
import { Connexion } from './Connexion';
import { HomePage } from './Homepage';

import '../styles/User.scss';

export const User = () => {
  const { authenticated } = useAuth();

  return authenticated ? <HomePage /> : <Connexion />;
};
