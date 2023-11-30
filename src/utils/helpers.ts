import { ON_GOING } from '../data/constant';
import { Note, Todolist } from '../types';

export const getOnGoingTodolists = (todolists: Todolist[]) =>
  todolists.filter((todolist) => todolist.status === ON_GOING);

export const getOnGoingNotes = (notes: Note[]) =>
  notes.filter((note) => note.status === ON_GOING);

export const getTodoId = (todolist: Todolist) => {
  const ongoingItemId = todolist?.items.ongoing?.[0]?._id;
  const newItemId = todolist?.items.new?.[0]?._id;
  const completeItemId = todolist?.items.complete?.[0]?._id;

  return ongoingItemId ?? newItemId ?? completeItemId;
};
