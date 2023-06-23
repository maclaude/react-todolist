import { PRIORITY, STATUS } from '../data/constant';

export type Status =
  | typeof STATUS.COMPLETE
  | typeof STATUS.DELETE
  | typeof STATUS.ON_GOING;

export type Priority =
  | typeof PRIORITY.LOW
  | typeof PRIORITY.NORMAL
  | typeof PRIORITY.HIGH;

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
  notes?: string;
  date?: string;
  priority?: Priority;
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
