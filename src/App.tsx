import { Route, Routes } from 'react-router-dom';

import { useAuth } from './context/authContext';
import { Buttons } from './pages/Buttons';
import { List } from './pages/List';
import { Navigation } from './pages/Navigation';
import { Note } from './pages/Note';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Toaster } from './pages/Toaster';
import { User } from './pages/User';

import './styles/App.scss';

function App() {
  const { authenticated } = useAuth();

  return (
    <div id="app">
      <div id="container">
        {authenticated && (
          <aside id="aside_container">
            <Navigation />
          </aside>
        )}

        <Routes>
          <Route path={'/'} element={<User />} />
          <Route path={'user/'} element={<User />} />
          <Route path={'user/signin'} element={<Signin />} />
          <Route path={'user/signup'} element={<Signup />} />
          <Route path={'todolist/:id'} element={<List />} />
          <Route path={'note/:id'} element={<Note />} />
          <Route path={'components/buttons'} element={<Buttons />} />
          <Route path={'components/toaster'} element={<Toaster />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
