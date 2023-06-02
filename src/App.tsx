/* eslint-disable no-underscore-dangle */

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from './context/authContext';
import { List } from './pages/List';
import { Navigation } from './pages/Navigation';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { User } from './pages/User';
import { useFetchTodolistsQuery } from './queries/user';
import { Status, Todolist } from './types';
import { getOnGoingTodolists } from './utils/helpers';

import './App.scss';

function App() {
  const { authenticated, token } = useAuth();
  const [todolists, setTodolists] = useState<Todolist[]>([]);

  const { data } = useFetchTodolistsQuery({
    authenticated,
    token,
  });

  useEffect(() => {
    if (data && data.length) {
      setTodolists(data);
    }
  }, [data]);

  const updateTodoStatus = (listId: string, itemId: string, status: Status) => {
    setTodolists((currentTodoLists) =>
      currentTodoLists.map((todoList) =>
        todoList._id === listId
          ? {
              ...todoList,
              items: todoList.items.map((item) =>
                item._id === itemId ? { ...item, status } : item,
              ),
            }
          : todoList,
      ),
    );
  };

  const updateTodoTitle = (listId: string, itemId: string, title: string) => {
    setTodolists((currentTodoLists) =>
      currentTodoLists.map((todoList) =>
        todoList._id === listId
          ? {
              ...todoList,
              items: todoList.items.map((item) =>
                item._id === itemId ? { ...item, title } : item,
              ),
            }
          : todoList,
      ),
    );
  };

  const updateTodoListTitle = (listId: string, title: string) => {
    setTodolists((currentTodoLists) =>
      currentTodoLists.map((todoList) =>
        todoList._id === listId
          ? {
              ...todoList,
              title,
            }
          : todoList,
      ),
    );
  };

  return (
    <div className="app">
      <div className="container">
        {authenticated && (
          <aside className="aside-container">
            <Navigation todolists={getOnGoingTodolists(todolists)} />
          </aside>
        )}
        <main className="main-container">
          <Routes>
            <Route path={'/'} element={<User />}></Route>
            <Route path={'user/'} element={<User />}></Route>
            <Route path={'user/signin'} element={<Signin />}></Route>
            <Route path={'user/signup'} element={<Signup />}></Route>
            <Route
              path={'todolist/:id'}
              element={
                <List
                  todolists={todolists}
                  updateTodoStatus={updateTodoStatus}
                  updateTodoTitle={updateTodoTitle}
                  updateTodoListTitle={updateTodoListTitle}
                />
              }
            ></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
