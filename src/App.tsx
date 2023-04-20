import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.scss";
import { CompleteList } from "./Components/CompleteList";
import { NewTodoForm } from "./Components/NewTodoForm";
import { OnGoingList } from "./Components/OnGoingList";
import { ON_GOING } from "./constant";
import { getCompleteTodos, getOnGoingTodos } from "./helpers";
import { Status, Todo } from "./types";

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

  return (
    <div className="app">
      <div className="container">
        <div className="title">
          <h1>Todo list</h1>
          <p>
            {`${getOnGoingTodos(todos).length} ${
              getOnGoingTodos(todos).length === 1 ? "rappel" : "rappels"
            }`}
          </p>
        </div>
        <NewTodoForm onSubmit={addTodo} />
        <OnGoingList
          onGoingTodos={getOnGoingTodos(todos)}
          onCheckboxClick={updateTodoStatus}
        />
        {getCompleteTodos(todos).length > 0 && (
          <CompleteList
            completeTodos={getCompleteTodos(todos)}
            onCheckboxClick={updateTodoStatus}
          />
        )}
      </div>
    </div>
  );
}

export default App;
