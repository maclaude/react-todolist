import { COMPLETE, DELETE, ON_GOING } from '../data/constant';

export type Status = typeof COMPLETE | typeof DELETE | typeof ON_GOING;

export interface Todolist {
  _id: string;
  title: string;
  status: Status;
  items: {
    ongoing: Todo[];
    complete: Todo[];
    delete: Todo[];
  };
}

export interface Todo {
  _id: string;
  title: string;
}
