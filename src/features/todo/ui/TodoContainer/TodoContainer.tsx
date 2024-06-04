import React, { FC, useState } from 'react';
import { Header } from '@Components/Header/Header';

import Paper from '@mui/material/Paper';
import { Calendar } from '@features/calendar/ui/Calendar/Calendar';

export const TodoContainer: FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (action: 'prev' | 'today' | 'next') => {
    switch (action) {
      case 'prev':
        setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));
        break;
      case 'today':
        setCurrentDate(new Date());
        break;
      case 'next':
        setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        padding: '10px 20px',
        borderRadius: 5,
        width: 'var(--container-width)',
        margin: '100px auto 0',
        textAlign: 'center',
      }}
    >
      <Header
        currentDate={currentDate}
        onPrev={() => handleDateChange('prev')}
        onToday={() => handleDateChange('today')}
        onNext={() => handleDateChange('next')}
      />
      <Calendar currentDate={currentDate} />
    </Paper>
  );
};
