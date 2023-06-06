import { ON_GOING } from '../data/constant';
import { Todolist } from '../types';

export const getOnGoingTodolists = (todolists: Todolist[]) =>
  todolists.filter((todolist) => todolist.status === ON_GOING);
