import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NarBar from './Component/NavBar/NavBar'
import RouteList from './RouteList';
import { AuthProvider } from './Context/AuthContext';

/**
 * The main App component that sets up the app's routing and authentication context.
 */
const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NarBar />
        <RouteList />
      </AuthProvider>
    </BrowserRouter >
  )
}

export default App;
