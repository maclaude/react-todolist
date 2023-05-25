import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { useAuth } from './context/authContext';
import { ON_GOING } from './data/constant';
import { List } from './pages/List';
import { Navigation } from './pages/Navigation';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { User } from './pages/User';
import { Status, TodoList } from './types';
import { getOnGoingTodoLists } from './utils/helpers';

import './App.scss';

function App() {
  const { authenticated, login, logout } = useAuth();

  const [todoLists, setTodoLists] = useState<TodoList[]>(
    JSON.parse(localStorage.getItem('todoLists')!) || [],
  );

  console.log(authenticated, login, logout);

  const navigate = useNavigate();

  useEffect(() => {
    const storedTodoLists = localStorage.getItem('todoLists');

    if (storedTodoLists) {
      setTodoLists(JSON.parse(storedTodoLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
  }, [todoLists]);

  const addTodoList = () => {
    const newTodoList: TodoList = {
      id: v4(),
      title: 'New Todo',
      status: ON_GOING,
      items: [],
    };

    setTodoLists((currentTodoLists) => [...currentTodoLists, newTodoList]);

    navigate(`/lists/${newTodoList.id}`);
  };

  const updateTodoListStatus = (listId: string, status: Status) => {
    setTodoLists((currentTodoLists) =>
      currentTodoLists.map((todoList) =>
        todoList.id === listId
          ? {
              ...todoList,
              status,
            }
          : todoList,
      ),
    );
  };

  const addTodo = (listId: string, newTodo: string) => {
    setTodoLists((currentTodoLists) =>
      currentTodoLists.map((todoList) =>
        todoList.id === listId
          ? {
              ...todoList,
              items: [
                ...todoList.items,
                { id: v4(), title: newTodo.trim(), status: ON_GOING },
              ],
            }
          : todoList,
      ),
    );
  };

  const updateTodoStatus = (listId: string, itemId: string, status: Status) => {
    setTodoLists((currentTodoLists) =>
      currentTodoLists.map((todoList) =>
        todoList.id === listId
          ? {
              ...todoList,
              items: todoList.items.map((item) =>
                item.id === itemId ? { ...item, status } : item,
              ),
            }
          : todoList,
      ),
    );
  };

  const updateTodoTitle = (listId: string, itemId: string, title: string) => {
    setTodoLists((currentTodoLists) =>
      currentTodoLists.map((todoList) =>
        todoList.id === listId
          ? {
              ...todoList,
              items: todoList.items.map((item) =>
                item.id === itemId ? { ...item, title } : item,
              ),
            }
          : todoList,
      ),
    );
  };

  const updateTodoListTitle = (listId: string, title: string) => {
    setTodoLists((currentTodoLists) =>
      currentTodoLists.map((todoList) =>
        todoList.id === listId
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
        <aside className="aside-container">
          <Navigation
            todoLists={getOnGoingTodoLists(todoLists)}
            addTodoList={addTodoList}
            updateTodoListStatus={updateTodoListStatus}
          />
        </aside>
        <main className="main-container">
          <Routes>
            <Route
              path={'lists/:id'}
              element={
                <List
                  todoLists={todoLists}
                  addTodo={addTodo}
                  updateTodoStatus={updateTodoStatus}
                  updateTodoTitle={updateTodoTitle}
                  updateTodoListTitle={updateTodoListTitle}
                />
              }
            ></Route>
            <Route path={'/'} element={<User />}></Route>
            <Route path={'user/'} element={<User />}></Route>
            <Route path={'user/signup'} element={<Signup />}></Route>
            <Route path={'user/signin'} element={<Signin />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
