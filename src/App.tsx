import { useState } from "react";
import { IconContext } from "react-icons";
import { MdAddCircle } from "react-icons/md";
import { v4 } from "uuid";

import "./App.scss";
import { ON_GOING } from "./data/constant";
import { List } from "./pages/List";
import { Status, TodoList } from "./types";

function App() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([
    { id: v4(), title: "New Todo list", items: [] },
  ]);

  const addTodoList = () => {
    setTodoLists((currentTodoLists) => {
      return [...currentTodoLists, { id: v4(), title: "New Todo", items: [] }];
    });
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
          <nav className="navigation">
            <div className="navigation-title">
              <h3>Mes listes</h3>
              <IconContext.Provider value={{ className: "icon" }}>
                <MdAddCircle onClick={addTodoList} />
              </IconContext.Provider>
            </div>
            <ul>
              {todoLists.map(({ id, title }) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="lists-container">
          {todoLists.map(({ id, title, items }) => (
            <div key={id} className="list-container">
              <List
                listId={id}
                title={title}
                todos={items}
                addTodo={addTodo}
                updateTodoStatus={updateTodoStatus}
                updateTodoTitle={updateTodoTitle}
                updateTodoListTitle={updateTodoListTitle}
              />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
