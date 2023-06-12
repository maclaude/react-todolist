import { Route, Routes } from 'react-router-dom';

import { useAuth } from './context/authContext';
import { List } from './pages/List';
import { Navigation } from './pages/Navigation';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { User } from './pages/User';

import './App.scss';

function App() {
  const { authenticated } = useAuth();

  return (
    <div id="app">
      <div id="container">
        {authenticated && (
          <aside id="aside-container">
            <Navigation />
          </aside>
        )}
        <main id="main-container">
          <Routes>
            <Route path={'/'} element={<User />}></Route>
            <Route path={'user/'} element={<User />}></Route>
            <Route path={'user/signin'} element={<Signin />}></Route>
            <Route path={'user/signup'} element={<Signup />}></Route>
            <Route path={'todolist/:id'} element={<List />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
