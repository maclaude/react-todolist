interface ListInputProps {
  id: string;
  title: string;
  onTextChange: (id: string, title: string) => void;
}

export const ListInput = ({ id, title, onTextChange }: ListInputProps) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    onTextChange(id, event.currentTarget.value);
  };

  const handleOnEnterBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <input
      className="list-item-input"
      onChange={(e) => handleChange(e)}
      onKeyDown={(e) => handleOnEnterBlur(e)}
      value={title}
    />
  );
};
