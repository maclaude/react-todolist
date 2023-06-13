import { COMPLETE, DELETE, ON_GOING } from '../data/constant';

export type Status = typeof COMPLETE | typeof DELETE | typeof ON_GOING;

export type Todolist = {
  _id: string;
  title: string;
  status: Status;
  items: {
    ongoing: Todo[];
    complete: Todo[];
    delete: Todo[];
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type Todo = {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
