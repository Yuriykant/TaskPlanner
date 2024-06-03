import React, { FC } from 'react';
import { daysOfTheWeek } from '@features/calendar/utils/calendarUtils';
import './CalendarHeader.css';

export const CalendarHeader: FC = () => (
  <div className="calendar-header">
    {daysOfTheWeek.map((element, index) => (
      <div className="calendar-header__elem" key={index}>
        {element}
      </div>
    ))}
  </div>
);
