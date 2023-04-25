import { COMPLETE, ON_GOING } from "../data/constant";
import { Todo } from "../types";

export const getOnGoingTodos = (todos: Todo[]) =>
  todos.filter((todo) => todo.status === ON_GOING);

export const getCompleteTodos = (todos: Todo[]) =>
  todos.filter((todo) => todo.status === COMPLETE);
