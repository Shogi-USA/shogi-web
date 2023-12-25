import axios from "axios";
import './axiosConfig';
import { LogInParams, UserCreationFormData, UserCreationRequest, User } from "../types";

/**
 * Define the API paths for authentication and user management.
 */
const authPath = '/api/v1/auth';
const userPath = '/api/v1/users';

/**
 * Get the user creation form data from the server.
 * @returns The user creation form data.
 */
export const getUserCreationFormData = async () => {
  try {
    const response = await axios.get<UserCreationFormData>(`${process.env.endpoint}${userPath}/creation-form-data`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update a user's information on the server.
 * @param id The ID of the user to update.
 * @param request The updated user information.
 * @returns The updated user information.
 */
export const updateUser = async (id: number, request: UserCreationRequest) => {
  try {
    const response = await axios.put<User>(`${process.env.endpoint}${userPath}/{id}`, request);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update a user's information on the server.
 * @param id The ID of the user to update.
 * @param request The updated user information.
 * @returns The updated user information.
 */
export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete<User>(`${process.env.endpoint}${userPath}/{id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Register a new user on the server.
 * @param request The user information to register.
 * @returns The access token for the new user.
 */
export const registerUser = async (request: UserCreationRequest): Promise<string> => {
  const response = await axios.post<{ access_token: string }>(`${process.env.endpoint}${authPath}/register`, request, { withCredentials: true });
  return response.data['access_token'];
};

/**
 * Log in a user and get an access token from the server.
 * @param params The login parameters.
 * @returns The access token for the logged-in user.
 */
export const logIn = async (params: LogInParams): Promise<string> => { // Returns access token
  const response = await axios.post<{ access_token: string }>(`${process.env.endpoint}${authPath}/authenticate`, params, { withCredentials: true });
  return response.data['access_token'];
};

/**
 * Refresh the access token for the current user.
 * @returns The new access token.
 */
export const refreshToken = async (): Promise<string> => { // Returns access token
  try {
    const response = await axios.post<{ access_token: string }>(
      `${process.env.endpoint}${authPath}/refresh-token`,
      {},
      { withCredentials: true }
    );
    return response.data['access_token'];
  } catch (error) {
    // If there is an error, we throw it to be caught by the interceptor's catch block
    throw error;
  }
};

/**
 * Get the current user's information from the server.
 * @returns The current user's information.
 */
export const getUserInfo = async (): Promise<User> => {
  const response = await axios.get<User>(`${process.env.endpoint}${userPath}/info`);
  return response.data;
}

/**
 * Log out the current user.
 */
export const logOut = async (): Promise<void> => {
  await axios.post(`${process.env.endpoint}${authPath}/logout`, {}, { withCredentials: true });
}