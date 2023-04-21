import { COMPLETE, DELETE, ON_GOING } from "../constant";

export type Status = typeof COMPLETE | typeof DELETE | typeof ON_GOING;

export interface Todo {
  id: string;
  title: string;
  status: Status;
}
