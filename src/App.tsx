import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import "./App.scss";

const ON_GOING = "ongoing";
const COMPLETE = "conplete";
type Status = typeof ON_GOING | typeof COMPLETE;

interface Todo {
  id: string;
  title: string;
  status: Status;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(false);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: uuidv4(), title: newTodo.trim(), status: ON_GOING },
    ]);
    setNewTodo("");
  };

  const updateTodoStatus = (id: string, status: Status) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, status } : todo)),
    );
  };

  const handleChevronToogle = () => {
    setIsChevronToogle(!isChevronToogle);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="title">
          <h1>Todo list</h1>
          <p>{todos.length} rappels en cours</p>
        </div>
        <form onSubmit={handleAddTodo} className="input">
          <input
            className="input-field"
            placeholder="Ajouter un rappel"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className="input-button">OK</button>
        </form>
        <div className="list">
          <ul>
            {todos
              .filter((todo) => todo.status === ON_GOING)
              .map((todo) => (
                <li key={todo.id} className="list-item">
                  <button
                    onClick={() => updateTodoStatus(todo.id, COMPLETE)}
                    className="list-item-checkbox"
                  />
                  <p>{todo.title}</p>
                </li>
              ))}
          </ul>
        </div>
        {todos.filter((todo) => todo.status === COMPLETE).length > 0 && (
          <div className="list section-delete">
            <div className="list-title">
              <p>
                {todos.filter((todo) => todo.status === COMPLETE).length}{" "}
                terminés
              </p>
              {isChevronToogle ? (
                <GoChevronDown
                  className="chevron"
                  onClick={handleChevronToogle}
                />
              ) : (
                <GoChevronRight
                  className="chevron"
                  onClick={handleChevronToogle}
                />
              )}
            </div>
            {isChevronToogle && (
              <ul>
                {todos
                  .filter((todo) => todo.status === COMPLETE)
                  .map((todo) => (
                    <li key={todo.id} className="list-item">
                      <button
                        className=" list-item-checkbox list-item-checkbox--checked"
                        onClick={() => updateTodoStatus(todo.id, ON_GOING)}
                      />
                      <p>{todo.title}</p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
