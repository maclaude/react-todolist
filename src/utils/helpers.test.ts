import { getOnGoingNotes, getOnGoingTodolists, getTodoId } from './helpers';
import {
  notesMock,
  ongoingNotesMock,
  ongoingTodolistsMock,
  todolistMock,
  todolistsMock,
} from './helpers.mock';

describe('Helpers', () => {
  test('`getOnGoingTodolists` should retreived todolists with a status of ongoing', () => {
    expect(getOnGoingTodolists(todolistsMock)).toStrictEqual(
      ongoingTodolistsMock,
    );
  });

  test('`getOnGoingNotes` should retreived notes with a status of ongoing', () => {
    expect(getOnGoingNotes(notesMock)).toStrictEqual(ongoingNotesMock);
  });

  test('`getTodoId` should retreived the 1st ongoing todo id', () => {
    expect(getTodoId(todolistMock)).toStrictEqual('657207e0b11fec5d07e6027e');
  });
});
