import React, { useState, useEffect, FC } from 'react';
import { useAuth } from '@features/auth/сontext/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { months } from '@features/calendar/utils/calendarUtils';
import './Header.css';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

interface HeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onToday: () => void;
  onNext: () => void;
}

export const Header: FC<HeaderProps> = ({ currentDate, onPrev, onToday, onNext }) => {
  const { logOut, user } = useAuth();
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState<string>();

  const headerMonth = months[currentDate.getMonth()];
  const headerYear = currentDate.getFullYear();

  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      const { displayName, email } = user;
      const { photoURL } = user.providerData[0];

      if (displayName) {
        setUserName(displayName);
      } else {
        setUserName(email ?? '');
      }

      if (photoURL) {
        setAvatar(photoURL);
      }
    }
  }, [user]);

  return (
    <div className="header">
      <div className="header__user">
        <Avatar src={avatar} alt={userName} sx={{ width: 60, height: 60 }} />
        <span className="header__username">{userName}</span>
      </div>
      <div className="header__date">
        <h1 className="header__title">
          {headerMonth} {headerYear}
        </h1>
        <div className="header__buttons">
          <button className="header__button" onClick={onPrev}>
            <ArrowBackIosOutlinedIcon sx={{ fontSize: 35 }} />
          </button>
          <button className="header__button" onClick={onToday}>
            <span className="header__span">текущий месяц</span>
          </button>
          <button className="header__button" onClick={onNext}>
            <ArrowForwardIosOutlinedIcon sx={{ fontSize: 35 }} />
          </button>
        </div>
      </div>
      <div className="header__logout">
        <button className="header__logout-button" onClick={handleLogout}>
          <LogoutIcon sx={{ fontSize: 35 }} />
        </button>
      </div>
    </div>
  );
};
