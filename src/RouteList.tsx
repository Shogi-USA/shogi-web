import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LogInPage from './Page/LogIn/LogInPage';
import SignUpPage from './Page/SignUp/SignUpPage';
import HomePage from './Page/Home/HomePage';
import MyPage from './Page/MyPage/MyPage';

/**
 * The component that defines the app's routes.
 */
const RouteList: React.FC = () => {
  return (
    <div className="page-container">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/mypage' element={<MyPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteList;
