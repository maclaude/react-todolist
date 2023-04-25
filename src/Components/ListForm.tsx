import { useState } from "react";

interface ListFormProps {
  listId: string;
  onSubmit: (listId: string, newTodo: string) => void;
}

export const ListForm = ({ listId, onSubmit }: ListFormProps) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim()) onSubmit(listId, newTodo);
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
