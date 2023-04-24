import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.scss";
import { MdAddCircle } from "react-icons/md";
import { IconContext } from "react-icons";
import { ListComplete } from "./Components/ListComplete";
import { ListForm } from "./Components/ListForm";
import { ListOnGoing } from "./Components/ListOnGoing";
import { ON_GOING } from "./constant";
import { getCompleteTodos, getOnGoingTodos } from "./helpers";
import { Status, Todo } from "./types";
import { ListTitle } from "./Components/ListTitle";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: string) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: uuidv4(), title: newTodo.trim(), status: ON_GOING },
    ]);
  };

  const updateTodoStatus = (id: string, status: Status) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, status } : todo)),
    );
  };

  const updateTodoTitle = (id: string, title: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
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
                <MdAddCircle />
              </IconContext.Provider>
            </div>
            <ul>
              <li>Todo</li>
              <li>Sport</li>
              <li>Courses</li>
              <li>Envies</li>
            </ul>
          </nav>
        </aside>
        <main className="list-container">
          <ListTitle onGoingTodo={getOnGoingTodos(todos)} />
          <ListForm onSubmit={addTodo} />
          <ListOnGoing
            onGoingTodos={getOnGoingTodos(todos)}
            onCheckboxClick={updateTodoStatus}
            onDeleteClick={updateTodoStatus}
            onTextChange={updateTodoTitle}
          />
          {getCompleteTodos(todos).length > 0 && (
            <ListComplete
              completeTodos={getCompleteTodos(todos)}
              onCheckboxClick={updateTodoStatus}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
