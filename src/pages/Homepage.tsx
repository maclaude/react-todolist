import '../styles/Homepage.scss';
import { Account } from './Account';
import { Summary } from './Summary';

export const HomePage = () => {
  return (
    <main id="main_container">
      <Summary />
      <Account />
    </main>
  );
};
