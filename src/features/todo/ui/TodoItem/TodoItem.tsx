import React, { FC, useEffect, useState } from 'react';
import { ITodoItem } from 'types';
import { useTodo } from '@features/todo/context/TodoContextProvider';
import { useSnackbar } from '@features/todo/context/SnackbarMessage';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Timestamp } from 'firebase/firestore';

export const TodoItem: FC<ITodoItem> = ({ selectedDay, title, description, id, createdAt, updatedAt }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [taskTitle] = useState(title);
  const [taskselectedDay, setTaskselectedDay] = useState(selectedDay);
  const [taskDescription, setTaskDescription] = useState(description);
  const [createdDate, setCreatedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const { deleteTodo, updateTodo } = useTodo();
  const { showSnackbar } = useSnackbar();

  const formatDate = (timestamp: Timestamp) => {
    if (timestamp && timestamp.seconds) {
      const milliseconds = timestamp.seconds * 1000;
      const date = new Date(milliseconds);
      return format(date, 'HH:mm dd MMMM yyyy', { locale: ru });
    }
    return null;
  };

  useEffect(() => {
    const updatedFormattedDate = formatDate(updatedAt);
    if (updatedFormattedDate) {
      setUpdatedDate(updatedFormattedDate);
    }
  }, [updatedAt]);

  useEffect(() => {
    if (createdAt) {
      const createdFormattedDate = formatDate(createdAt);
      if (createdFormattedDate) {
        setCreatedDate(createdFormattedDate);
      }
    }
  }, [createdAt]);

  useEffect(() => {
    if (selectedDay) {
      const formattedDate = formatDate(selectedDay);
      setTaskselectedDay(formattedDate);
    }
  }, [selectedDay]);

  const onSaveEdit = async () => {
    if (taskDescription !== description) {
      try {
        await updateTodo(id, { description: taskDescription, title: taskTitle, selectedDay: taskselectedDay });
        showSnackbar('Задача успешно обновлена');
      } catch {
        showSnackbar('Ошибка при обновлении задачи:');
      } finally {
        setIsEdit(false);
      }
    } else {
      setIsEdit(false);
    }
  };

  const onDeleteTodo = () => {
    showSnackbar('Задача успешно удалена');
    setTimeout(() => {
      deleteTodo(id);
    }, 0);
  };

  const completeTodo = () => {
    setIsChecked(true);
    showSnackbar('Задача успешно выполнена');
    const timeoutId = setTimeout(() => {
      deleteTodo(id);
      clearTimeout(timeoutId);
    }, 0);
  };

  let dateString;
  if (typeof taskselectedDay === 'string') {
    dateString = taskselectedDay.slice(6);
  }

  return (
    <Paper
      elevation={2}
      sx={{ display: 'flex', justifyContent: 'space-between', m: '10px 0', p: '15px 20px', cursor: 'pointer' }}
    >
      {isEdit ? (
        <TextField value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{
              color: 'var(--foreground-primary)',
              fontSize: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: 'greenyellow',
              borderRadius: '5px',
              padding: '0 5px',
            }}
          >
            {dateString}
          </Typography>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: 'gray',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'gray',
                fontSize: '14px',
                cursor: 'pointer',
              }}
              onClick={() => setIsEdit(true)}
            >
              {description}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'gray',
                fontSize: '12px',
              }}
            >
              {updatedAt ? `обновлен в: ${updatedDate}` : `создан: ${createdDate}`}
            </Typography>
          </Box>
        </>
      )}
      <Box>
        <Checkbox sx={{ display: 'flex' }} edge="start" onChange={completeTodo} checked={isChecked} tabIndex={-1} />
        {!isEdit && (
          <IconButton edge="end" sx={{ mr: 0 }} onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        )}
        <IconButton edge="end" onClick={onDeleteTodo}>
          <DeleteForeverIcon />
        </IconButton>
        {isEdit && (
          <>
            <IconButton sx={{ fontSize: '14px', margin: '0 5px 0 20px' }} edge="end" onClick={onSaveEdit}>
              Сохранить
            </IconButton>
            <IconButton sx={{ fontSize: '14px' }} edge="end" onClick={() => setIsEdit(false)}>
              Отменить
            </IconButton>
          </>
        )}
      </Box>
    </Paper>
  );
};
