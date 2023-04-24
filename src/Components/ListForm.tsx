import { useState } from "react";

interface ListFormProps {
  onSubmit: (newTodo: string) => void;
}

export const ListForm = ({ onSubmit }: ListFormProps) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim()) onSubmit(newTodo);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="input">
      <input
        className="input-field"
        placeholder="Ajouter un rappel"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="input-button">OK</button>
    </form>
  );
};
