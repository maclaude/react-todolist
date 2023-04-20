import { COMPLETE, ON_GOING } from "../constant";

export type Status = typeof ON_GOING | typeof COMPLETE;

export interface Todo {
  id: string;
  title: string;
  status: Status;
}
