import { ListComplete } from "../components/ListComplete";
import { ListForm } from "../components/ListForm";
import { ListOnGoing } from "../components/ListOnGoing";
import { ListTitle } from "../components/ListTitle";
import { Status, Todo } from "../types";
import { getCompleteTodos, getOnGoingTodos } from "../utils/helpers";

interface TodoListProps {
  listId: string;
  title: string;
  todos: Todo[];
  addTodo: (listId: string, newTodo: string) => void;
  updateTodoStatus: (listId: string, itemId: string, status: Status) => void;
  updateTodoTitle: (listId: string, itemId: string, title: string) => void;
  updateTodoListTitle: (listId: string, title: string) => void;
}

export const List = ({
  listId,
  title,
  todos,
  addTodo,
  updateTodoStatus,
  updateTodoTitle,
  updateTodoListTitle,
}: TodoListProps) => {
  return (
    <>
      <ListTitle
        listId={listId}
        title={title}
        onSubmit={updateTodoListTitle}
        onGoingTodos={getOnGoingTodos(todos)}
      />
      <ListForm listId={listId} onSubmit={addTodo} />
      <ListOnGoing
        listId={listId}
        onGoingTodos={getOnGoingTodos(todos)}
        onCheckboxClick={updateTodoStatus}
        onDeleteClick={updateTodoStatus}
        onTextChange={updateTodoTitle}
      />
      {getCompleteTodos(todos).length > 0 && (
        <ListComplete
          listId={listId}
          completeTodos={getCompleteTodos(todos)}
          onCheckboxClick={updateTodoStatus}
        />
      )}
    </>
  );
};
