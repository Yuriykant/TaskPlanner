import React, { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TodoContainer } from '@Components/TodoContainer/TodoContainer';
import { PrivateRoute } from '@features/auth/ui/PrivateRoute/PrivateRoute';
import { LoginContainer } from '@features/auth/ui/LoginContainer/LoginContainer';
import '../../common.css';

export const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<LoginContainer type="registration" />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <TodoContainer />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
