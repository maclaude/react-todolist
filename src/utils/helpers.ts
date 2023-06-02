import { COMPLETE, ON_GOING } from '../data/constant';
import { Todo, Todolist } from '../types';

export const getOnGoingTodolists = (todolists: Todolist[]) =>
  todolists.filter((todolist) => todolist.status === ON_GOING);

export const getOnGoingTodos = (todos: Todo[]) =>
  todos.filter((todo) => todo.status === ON_GOING);

export const getCompleteTodos = (todos: Todo[]) =>
  todos.filter((todo) => todo.status === COMPLETE);
