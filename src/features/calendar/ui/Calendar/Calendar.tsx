import React, { FC, useEffect, useRef, useState } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { CalendarBody } from '../CalendarBody/CalendarBody';
import { months } from '../../utils/calendarUtils';
import './Calendar.css';
import { ModalWrapper } from '@Components/ModalWrapper/ModalWrapper';
import { CalendarPopup } from '../CalendarPopup/CalendarPopup';
import { TodoList } from '@features/todo/ui/TodoList/TodoList';
import { useTodo } from '@features/todo/context/TodoContextProvider';

interface CalendarProps {
  currentDate: Date;
}

export const Calendar: FC<CalendarProps> = ({ currentDate }) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [modalShown, setModalShown] = useState(false);
  const selectedCellRef = useRef<HTMLButtonElement>(null);
  const { setPickDate } = useTodo();

  const handleCellClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddTaskClick = () => {
    setModalShown(true);
  };

  useEffect(() => {
    setPickDate(selectedDate);
  }, [selectedDate, setPickDate]);

  return (
    <div>
      <section className="calendar__wrap">
        <div className="calendar__grid">
          <CalendarHeader />
          <CalendarBody
            currentDate={currentDate}
            handleCellClick={handleCellClick}
            handleAddTaskClick={handleAddTaskClick}
            selectedCellRef={selectedCellRef}
          />
        </div>

        <div className="calendar__info">
          {selectedDate?.getDate()} {months[selectedDate?.getMonth()]}
          <TodoList />
        </div>
      </section>
      <ModalWrapper onClose={() => setModalShown(false)} shown={modalShown}>
        <CalendarPopup onClose={() => setModalShown(false)} selectedDate={selectedDate} />
      </ModalWrapper>
    </div>
  );
};
