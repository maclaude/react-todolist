import {
  ZonedDateTime,
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from '@internationalized/date';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { I18nProvider } from 'react-aria';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { HiMinusSm, HiPlus } from 'react-icons/hi';
import { IoMdCheckmark } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import {
  useUpdateTodoDetailsMutation,
  useUpdateTodoStatusMutation,
} from '../api/mutations/todo';
import { useFetchTodoByIdQuery } from '../api/queries/todo';
import { DateField } from '../components/DateField';
import { ReactIcon } from '../components/ReactIcon';
import { useAuth } from '../context/authContext';
import { COMPLETE, DELETE, ON_GOING, PRIORITY } from '../data/constant';
import { Priority } from '../types';

import '../styles/Buttons.scss';
import '../styles/Details.scss';

type DetailsProps = {
  todolistId: string;
  todoId: string;
};

type Inputs = {
  title: string;
  notes: string;
  priority?: Priority;
  date?: ZonedDateTime;
};

export const Details = ({ todolistId, todoId }: DetailsProps) => {
  const { authenticated, token } = useAuth();

  const [toogleDate, setToogleDate] = useState(false);
  const [tooglePriority, setTooglePriority] = useState(false);

  const { control, register, handleSubmit, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      title: '',
      notes: '',
      date: undefined,
      priority: undefined,
    },
  });

  useEffect(() => {
    // Reset state when todo id change
    setToogleDate(false);
    setTooglePriority(false);

    // Reset form when todo id change
    reset({ title: '', notes: '', date: undefined, priority: undefined });
  }, [todoId]);

  const { data: todo } = useFetchTodoByIdQuery(
    {
      authenticated,
      token,
    },
    todoId,
  );

  useEffect(() => {
    // Hydrate form when todo is fetched
    if (todo) {
      setValue('title', todo.title);
      setValue('notes', todo.notes ? todo.notes : '');

      if (todo.date) {
        setValue('date', parseZonedDateTime(todo.date));
        setToogleDate(true);
      }

      if (todo.priority) {
        setValue('priority', todo.priority);
        setTooglePriority(true);
      }
    }
  }, [todo]);

  const updateTodoDetails = useUpdateTodoDetailsMutation(useQueryClient());
  const updateTodoStatusMutation = useUpdateTodoStatusMutation(
    useQueryClient(),
  );

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
      date: date?.toString(),
      priority,
      token,
    });
  };

  return (
    <div className="details-container box--shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="details-form">
        <div className="details_title details-item">
          <textarea
            maxLength={50}
            className="details_title"
            id="title"
            {...register('title')}
          />
        </div>
        <div className="details-item details-item--column details-item--grow">
          <label htmlFor="notes">Notes</label>
          <textarea
            className="details_notes"
            id="notes"
            {...register('notes')}
          />
        </div>
        <div className="details-item details-item--inline">
          <label htmlFor="date">Date</label>
          {toogleDate ? (
            <div className="details-item-right">
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
              <ReactIcon
                className="btn btn_icon details-item-right--icon"
                icon={HiMinusSm}
                onClick={() => {
                  setValue('date', undefined);
                  setToogleDate(false);
                }}
              />
            </div>
          ) : (
            <ReactIcon
              className="btn btn_icon details-item-right--icon"
              icon={HiPlus}
              onClick={() => {
                setValue('date', now(getLocalTimeZone()));
                setToogleDate(true);
              }}
            />
          )}
        </div>
        <div className="details-item details-item--inline">
          <label htmlFor="priority">Priorité</label>
          {tooglePriority ? (
            <div className="details-item-right">
              <select
                className="details_priority"
                id="priority"
                {...register('priority')}
              >
                <option value={PRIORITY.LOW}>Faible</option>
                <option value={PRIORITY.NORMAL}>Normal</option>
                <option value={PRIORITY.HIGH}>Haute</option>
              </select>
              <ReactIcon
                className="btn btn_icon details-item-right--icon"
                icon={HiMinusSm}
                onClick={() => {
                  setValue('priority', undefined);
                  setTooglePriority(false);
                }}
              />
            </div>
          ) : (
            <ReactIcon
              className="btn btn_icon details-item-right--icon"
              icon={HiPlus}
              onClick={() => {
                setValue('priority', PRIORITY.NORMAL);
                setTooglePriority(true);
              }}
            />
          )}
        </div>

        <div className="details-item-actions">
          {todo?.status && (
            <>
              <ReactIcon
                className="btn btn_icon"
                icon={MdDelete}
                onClick={() =>
                  updateTodoStatusMutation.mutate({
                    id: todoId,
                    todolistId,
                    currentStatus: todo.status,
                    newStatus: DELETE,
                    token,
                  })
                }
              />
              <ReactIcon
                className="btn btn_icon btn_icon--complete"
                icon={IoMdCheckmark}
                onClick={() =>
                  updateTodoStatusMutation.mutate({
                    id: todoId,
                    todolistId,
                    currentStatus: todo.status,
                    newStatus: todo.status === ON_GOING ? COMPLETE : ON_GOING,
                    token,
                  })
                }
              />
            </>
          )}

          <button type="submit" className="btn btn_regular details-submit">
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};
