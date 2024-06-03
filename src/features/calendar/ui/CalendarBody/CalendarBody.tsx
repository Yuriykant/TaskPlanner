import React, { FC, useEffect, useState } from 'react';
import { Day } from '../Day/Day';
import './CalendarBody.css';
import { generateCalendarDays } from '@features/calendar/utils/calendarUtils';

interface CalendarBodyProps {
  currentDate: Date;
  handleCellClick: (date: Date) => void;
  handleAddTaskClick: (ref: React.RefObject<HTMLButtonElement>) => void;
  selectedCellRef: React.RefObject<HTMLButtonElement>;
}

type WeekendData = { [key: string]: boolean };

export const CalendarBody: FC<CalendarBodyProps> = ({
  currentDate,
  handleCellClick,
  handleAddTaskClick,
  selectedCellRef,
}) => {
  const [weekendData, setWeekendData] = useState<WeekendData>({});
  const dateArray = generateCalendarDays(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  useEffect(() => {
    const fetchWeekendData = async () => {
      try {
        const response = await fetch(
          `https://isdayoff.ru/api/getdata?year=${year}&month=${month}&cc=ru&pre=1&delimeter=%0A`
        );
        if (response.ok) {
          const data = await response.text();
          const parsedData: WeekendData = data.split('\n').reduce((acc: WeekendData, day, index) => {
            const date = new Date(year, month - 1, index + 1);
            acc[date.toISOString().slice(0, 10)] = day === '1';
            return acc;
          }, {});
          setWeekendData(parsedData);
        } else {
          console.error('Ошибка при загрузке данных о выходных днях');
        }
      } catch (error) {
        console.error('Произошла ошибка при обращении к серверу', error);
      }
    };

    fetchWeekendData();
  }, [year, month]);

  const isWeekend = (date: Date): boolean => {
    const key = date.toISOString().slice(0, 10);
    return weekendData[key] || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <div className="gridWrapper">
      {dateArray.map((date, index) => {
        const today = date.toDateString() === new Date().toDateString();
        const untilToday = date < new Date() && !today;
        const weekend = isWeekend(date);

        return (
          <Day
            key={index}
            date={date}
            today={today}
            untilToday={untilToday}
            weekend={weekend}
            handleCellClick={handleCellClick}
            handleAddTaskClick={() => handleAddTaskClick(selectedCellRef)}
          />
        );
      })}
    </div>
  );
};
