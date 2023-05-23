import { useParams } from 'react-router-dom';

import { ListComplete } from '../components/ListComplete';
import { ListForm } from '../components/ListForm';
import { ListOnGoing } from '../components/ListOnGoing';
import { ListTitle } from '../components/ListTitle';
import { Status, TodoList } from '../types';
import { getCompleteTodos, getOnGoingTodos } from '../utils/helpers';

import '../styles/List.scss';

interface TodoListProps {
  todoLists: TodoList[];
  addTodo: (listId: string, newTodo: string) => void;
  updateTodoStatus: (listId: string, itemId: string, status: Status) => void;
  updateTodoTitle: (listId: string, itemId: string, title: string) => void;
  updateTodoListTitle: (listId: string, title: string) => void;
}

export const List = ({
  todoLists,
  addTodo,
  updateTodoStatus,
  updateTodoTitle,
  updateTodoListTitle,
}: TodoListProps) => {
  const { id } = useParams();
  const currentTodoList = todoLists.find((todoList) => todoList.id === id);

  return id && currentTodoList ? (
    <div className="list-container">
      <ListTitle
        listId={id}
        title={currentTodoList.title}
        onSubmit={updateTodoListTitle}
        onGoingTodos={getOnGoingTodos(currentTodoList.items)}
      />
      <ListForm listId={id} onSubmit={addTodo} />
      <ListOnGoing
        listId={id}
        onGoingTodos={getOnGoingTodos(currentTodoList.items)}
        onCheckboxClick={updateTodoStatus}
        onDeleteClick={updateTodoStatus}
        onTextChange={updateTodoTitle}
      />
      {getCompleteTodos(currentTodoList.items).length > 0 && (
        <ListComplete
          listId={id}
          completeTodos={getCompleteTodos(currentTodoList.items)}
          onCheckboxClick={updateTodoStatus}
        />
      )}
    </div>
  ) : (
    <>
      <span>Sorry your todo is not Found 🫠</span>
    </>
  );
};
