import { COMPLETE, ON_GOING } from '../data/constant';
import { Todo, TodoList } from '../types';

export const getOnGoingTodoLists = (todoLists: TodoList[]) =>
  todoLists.filter((todoList) => todoList.status === ON_GOING);

export const getOnGoingTodos = (todos: Todo[]) =>
  todos.filter((todo) => todo.status === ON_GOING);

export const getCompleteTodos = (todos: Todo[]) =>
  todos.filter((todo) => todo.status === COMPLETE);
