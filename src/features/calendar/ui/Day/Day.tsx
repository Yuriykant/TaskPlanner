import React, { FC } from 'react';
import classNames from 'classnames';
import './Day.css';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';

interface DayProps {
  date: Date;
  today: boolean;
  untilToday: boolean;
  weekend: boolean;
  handleCellClick: (date: Date) => void;
  handleAddTaskClick: () => void;
}

export const Day: FC<DayProps> = ({ date, today, untilToday, weekend, handleCellClick, handleAddTaskClick }) => {
  return (
    <div
      className={classNames('day__cell-container', {
        today,
        untilToday,
        weekend,
      })}
      onClick={() => handleCellClick(date)}
    >
      <button className="day__taskAdd" style={{ display: untilToday ? 'none' : '' }} onClick={handleAddTaskClick}>
        <AddTaskOutlinedIcon />
      </button>

      <div
        className={classNames('day__cell', {
          today,
        })}
      >
        {date.getDate()}
      </div>
    </div>
  );
};
