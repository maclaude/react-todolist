import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 } from "uuid";

import "./App.scss";
import { ON_GOING } from "./data/constant";
import { List } from "./pages/List";
import { Navigation } from "./pages/Navigation";
import { Status, TodoList } from "./types";
import { getOnGoingTodoLists } from "./utils/helpers";

function App() {
  const [todoLists, setTodoLists] = useState<TodoList[]>(
    JSON.parse(localStorage.getItem("todoLists")!) || [],
  );

  useEffect(() => {
    const storedTodoLists = localStorage.getItem("todoLists");

    if (storedTodoLists) {
      setTodoLists(JSON.parse(storedTodoLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  }, [todoLists]);

  const addTodoList = () => {
    setTodoLists((currentTodoLists) => [
      ...currentTodoLists,
      { id: v4(), title: "New Todo", status: ON_GOING, items: [] },
    ]);
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
        <main>
          <div className="list-container">
            <Routes>
              <Route
                path={"lists/:id"}
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
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
