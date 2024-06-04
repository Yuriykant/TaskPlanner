import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { createTodoApi, deleteTodoApi, getWeekTodosApi, updateTodoApi } from '../../../App/api';
import { ITodo } from 'types';
import { useAuth } from '@features/auth/сontext/AuthContextProvider';
import { getWeekFromDate } from '../utils/weekUtils';

interface ITodoContext {
  todos: ITodo[];
  createTodo: (data: Omit<ITodo, 'id'>) => Promise<any>;
  deleteTodo: (id: string) => Promise<any>;
  updateTodo: (id: string, data: Omit<ITodo, 'id'>) => Promise<any>;
  isLoading: boolean;
  pickDate: Date | null;
  setPickDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const TodoContext = createContext<ITodoContext>({
  todos: [],
  createTodo: () => Promise.reject(),
  deleteTodo: () => Promise.reject(),
  updateTodo: () => Promise.reject(),
  isLoading: false,
  pickDate: null,
  setPickDate: () => {},
});

export const useTodo = (): ITodoContext => useContext(TodoContext);

export const TodoContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodo] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const [pickDate, setPickDate] = useState<Date | null>(null);

  useEffect(() => {
    if (pickDate) {
      const { start, end } = getWeekFromDate(pickDate);

      setTodo([]);
      if (user) {
        setIsLoading(true);

        getWeekTodosApi(start, end)
          .then(setTodo)
          .finally(() => setIsLoading(false));
      }
    }
  }, [user, pickDate]);

  // Вспомогательная функция для единообразной обработки обновления, удаления и создания задач
  const updateTodoList = (): void => {
    if (pickDate) {
      const { start, end } = getWeekFromDate(pickDate);
      getWeekTodosApi(start, end)
        .then(setTodo)
        .catch((error) => {
          console.error('ошибка сети или некорректный ответ от сервера');
          throw error;
        });
    }
  };

  const createTodo = (data: Omit<ITodo, 'id'>) => {
    return createTodoApi(data).then(updateTodoList);
  };

  const deleteTodo = (id: string) => {
    return deleteTodoApi(id).then(updateTodoList);
  };

  const updateTodo = (id: string, data: Omit<ITodo, 'id'>) => {
    return updateTodoApi(id, data).then(updateTodoList);
  };

  const todoContextValue: ITodoContext = {
    todos,
    createTodo,
    deleteTodo,
    updateTodo,
    isLoading,
    pickDate,
    setPickDate,
  };

  return <TodoContext.Provider value={todoContextValue}>{children}</TodoContext.Provider>;
};
