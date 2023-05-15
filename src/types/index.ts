import { COMPLETE, DELETE, ON_GOING } from '../data/constant';

export type Status = typeof COMPLETE | typeof DELETE | typeof ON_GOING;

export interface TodoList {
  id: string;
  title: string;
  status: Status;
  items: Todo[];
}

export interface Todo {
  id: string;
  title: string;
  status: Status;
}
