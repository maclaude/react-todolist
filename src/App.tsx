import { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import "./App.scss";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [finishedTodos, setFinishedTodos] = useState<string[]>([]);
  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(false);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setNewTodo("");
      setTodos([...todos, newTodo.trim()]);
    }
  };

  const handleFinishedTodo = (index: number) => {
    const newTodos = [...todos];
    const finishedTodo = todos[index];
    const newFinishedTodos = [...finishedTodos, finishedTodo];

    setTodos(newTodos);
    setFinishedTodos(newFinishedTodos);
    newTodos.splice(index, 1);
  };

  const handleUnfinishedTodo = (index: number) => {
    const unFinishedTodo = finishedTodos[index];

    setTodos([...todos, unFinishedTodo]);
    finishedTodos.splice(index, 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleChevronToogle = () => {
    setIsChevronToogle(!isChevronToogle);
  };

  return (
    <div className="app">
      <div className="container">
        {/* Todo title
            Props:
            - todos
        */}
        <div className="title">
          <h1>Todo list</h1>
          <p>{todos.length} rappels en cours</p>
        </div>
        {/* Todo input
            Props:
            - newTodo
            - setNewTodo
            - handleKeyDown
            - handleAddTodo
        */}
        <div className="input">
          <input
            className="input-field"
            placeholder="Ajouter un rappel"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="input-button" onClick={handleAddTodo}>
            OK
          </button>
        </div>
        {/* Todo ongoing
            Props:
            - todos
            - handleFinishedTodo
        */}
        <div className="list">
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="list-item">
                <button
                  onClick={() => handleFinishedTodo(index)}
                  className="list-item-checkbox"
                />
                <p>{todo}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* Todo finished
            Props:
            - finishedTodos
            - isChevronToogle
            - handleChevronToogle
            - handleUnfinishedTodo
        */}
        {finishedTodos.length > 0 && (
          <div className="list section-delete">
            <div className="list-title">
              <p>{finishedTodos.length} terminés</p>
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
                {finishedTodos.map((todo, index) => (
                  <li key={index} className="list-item">
                    <button
                      className=" list-item-checkbox list-item-checkbox--checked"
                      onClick={() => handleUnfinishedTodo(index)}
                    />
                    <p>{todo}</p>
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
