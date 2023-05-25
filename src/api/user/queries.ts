import axios from 'axios';

import { Todo } from '../../types';

type Todos = ReadonlyArray<Todo>;

// Request header auth token configuration
const axiosToken = axios.create({
  headers: { Authorization: `Bearer ${'myToken'}` },
});

export const fetchTodolists = async (): Promise<Todos> => {
  const response = await axiosToken.get(`http://localhost:3000/user/todolists`);
  return response.data;
};
