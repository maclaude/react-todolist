interface ListInputProps {
  listId: string;
  id: string;
  title: string;
  onTextChange: (listId: string, id: string, title: string) => void;
}

export const ListInput = ({
  listId,
  id,
  title,
  onTextChange,
}: ListInputProps) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    onTextChange(listId, id, event.currentTarget.value);
  };

  const handleOnEnterBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
