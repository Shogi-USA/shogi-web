import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthProviderProps, LogInParams, UserCreationRequest } from '../types';
import * as userApi from '../api/user';
import { getAccessToken, setAccessToken, clearAccessToken } from '../api/authToken';
import { useNavigate } from 'react-router-dom';

/**
 * Interface for authentication context in the application.
 * - `logIn`: Function for user login. Takes `LogInParams` as an argument and returns a Promise resolving to void on 
 *   successful login.
 * - `logOut`: Function to log out the current user. Performs the logout operation without returning any value.
 * - `registerNewUser`: Function for new user registration. Accepts a `UserCreationRequest` and returns a Promise resolving to 
 *   void on successful registration.
 */
interface AuthContextType {
  logIn: (params: LogInParams) => Promise<void>;
  logOut: () => void;
  registerNewUser: (request: UserCreationRequest) => Promise<void>;
}

/**
 * The authentication context.
 */
const AuthContext = createContext<AuthContextType>({
  logIn: async () => { },
  logOut: () => { },
  registerNewUser: async () => { }
});

/**
 * A hook that returns the authentication context.
 * @returns The authentication context.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * The authentication provider component.
 * @param children The child components.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  /**
   * Initialize the authentication context.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          try {
            const newAccessToken = await userApi.refreshToken();
            setAccessToken(newAccessToken);
          } catch (error: any) {
            console.error('Error refreshing token:', error);
            clearAccessToken(); // Ensure no invalid token is present
            if (error.response && error.response.status === 401) {
              // Refresh token is also expired or invalid
              navigate('/login');
            } else {
              console.error('Error refreshing token:', error);
            }
          }
        }
      } catch (error) {
        console.error('Unhandled error during auth initialization:', error);
      } finally {
        setIsInitialized(true); // Set initialized to true regardless of token refresh outcome
      }
    };

    initializeAuth();
  }, [navigate]);


  /**
   * Log the user in.
   * @param params The login parameters.
   */
  const logIn = async (params: LogInParams) => {
    const token = await userApi.logIn(params);
    setAccessToken(token);
  };

  /**
   * Log the user out.
   */
  const logOut = async () => {
    try {
      // Send a request to the logout endpoint
      await userApi.logOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
    clearAccessToken(); // Clear the access token
    navigate('/login'); // Redirect to login page
  };

  /**
   * Register a new user.
   * @param request The user creation request.
   */
  const registerNewUser = async (request: UserCreationRequest) => {
    const token = await userApi.registerUser(request);
    setAccessToken(token);
  };

  if (!isInitialized) {
    return <div>Loading...</div>; // Or any other loading component
  }

  const value = {
    logIn,
    logOut,
    registerNewUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
