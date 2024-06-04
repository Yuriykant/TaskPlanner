import React, { FC, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './CalendarPopup.css';
import { useTodo } from '../../../todo/context/TodoContextProvider';

interface CalendarPopupProps {
  onClose: VoidFunction;
  selectedDate: Date;
}

export const CalendarPopup: FC<CalendarPopupProps> = ({ onClose, selectedDate }) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [inputError, setInputError] = useState('');

  const { createTodo } = useTodo();

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titleValue.trim()) {
      return setInputError('Нужно указать заголовок задачи');
    }

    await createTodo({
      description: descriptionValue,
      title: titleValue,
      selectedDay: selectedDate,
    });

    setTitleValue('');
    setDescriptionValue('');
    setInputError('');
    onClose();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };

  return (
    <div className="calendar-popup">
      <button className="calendar-popup__close" onClick={onClose}>
        <CloseOutlinedIcon />
      </button>
      <form onSubmit={onSubmitForm}>
        <input
          value={titleValue}
          onChange={handleTitleChange}
          type="text"
          required
          id="title"
          placeholder="Задача"
          className="calendar-popup__input"
        />

        <textarea
          value={descriptionValue}
          onChange={handleDescriptionChange}
          rows={3}
          id="description"
          placeholder="Описание"
          className="calendar-popup__textarea"
        />
        <button className="calendar-popup__btn" type="submit">
          Создать
        </button>
      </form>
      {inputError && <p>{inputError}</p>}
    </div>
  );
};
