import { ZonedDateTime, getLocalTimeZone, now } from '@internationalized/date';
import { useEffect } from 'react';
import { I18nProvider } from 'react-aria';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { useFetchTodoByIdQuery } from '../api/queries/todo';
import { DateField } from '../components/DateField';
import { useAuth } from '../context/authContext';
import { PRIORITY } from '../data/constant';
import { Priority } from '../types';
import { useUpdateTodoDetailsMutation } from '../api/mutations/todo';

import '../styles/Todo.scss';

type TodoProps = {
  todoId: string;
};

type Inputs = {
  title: string;
  date: ZonedDateTime;
  notes: string;
  priority: Priority;
};

export const Todo = ({ todoId }: TodoProps) => {
  const { authenticated, token } = useAuth();

  const { control, register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      title: '',
      notes: '',
      date: now(getLocalTimeZone()),
      priority: PRIORITY.NORMAL,
    },
  });

  const { data: todo } = useFetchTodoByIdQuery(
    {
      authenticated,
      token,
    },
    todoId,
  );

  const updateTodoDetails = useUpdateTodoDetailsMutation(useQueryClient());

  useEffect(() => {
    if (todo) {
      setValue('title', todo.title);
      setValue('notes', todo.notes ? todo.notes : '');
      setValue('date', now(getLocalTimeZone()));
      setValue('priority', todo.priority ? todo.priority : PRIORITY.NORMAL);
    }
  }, [todo]);

  const onSubmit: SubmitHandler<Inputs> = ({
    title,
    notes,
    date,
    priority,
  }) => {
    updateTodoDetails.mutate({
      id: todoId,
      title,
      notes,
      date: JSON.stringify(date),
      priority,
      token,
    });
  };

  return (
    <div className="todo-container">
      <form onBlur={handleSubmit(onSubmit)} className="todo-form">
        <div className="todo_title todo-item">
          <textarea
            maxLength={50}
            className="todo_title"
            id="title"
            {...register('title')}
          />
        </div>
        <div className="todo-item todo-item--column todo-item--grow">
          <label htmlFor="notes">Notes</label>
          <textarea className="todo_notes" id="notes" {...register('notes')} />
        </div>
        <div className="todo-item todo-item--inline">
          <label htmlFor="date">Date</label>
          <I18nProvider locale="fr-FR">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DateField
                  aria-label="date"
                  hourCycle={24}
                  hideTimeZone
                  {...field}
                />
              )}
            />
          </I18nProvider>
        </div>
        <div className="todo-item todo-item--inline">
          <label htmlFor="priority">Priorité</label>
          <select
            className="todo_priority"
            id="priority"
            {...register('priority')}
          >
            <option value={PRIORITY.LOW}>Faible</option>
            <option value={PRIORITY.NORMAL}>Normal</option>
            <option value={PRIORITY.HIGH}>Haute</option>
          </select>
        </div>
      </form>
    </div>
  );
};
