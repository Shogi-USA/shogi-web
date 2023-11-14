import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { clearAccessToken, getAccessToken, setAccessToken } from './authToken';
import { refreshToken } from './user';

axios.defaults.withCredentials = true;

// Create a global set to keep track of retried requests
const retriedRequests = new Set<string>();

// Helper function to generate a unique identifier for each request
function generateRequestIdentifier(config: AxiosRequestConfig): string {
  return `${config.method} ${config.url}`;
}

/**
 * Add an Axios request interceptor to add the access token to the request headers.
 * @param config The Axios request configuration.
 * @returns The modified Axios request configuration.
 */
axios.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * Add an Axios response interceptor to handle 401 errors and refresh the access token.
 * @param response The Axios response.
 * @returns The Axios response, or a new Axios request with the updated access token.
 */
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig;
    const requestIdentifier = generateRequestIdentifier(originalRequest);

    if (error.response?.status === 401 && !retriedRequests.has(requestIdentifier)) {
      retriedRequests.add(requestIdentifier); // Mark this request as already retried

      try {
        const newAccessToken = await refreshToken();
        setAccessToken(newAccessToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        clearAccessToken();
        // Remove the request identifier from the set if the retry fails
        retriedRequests.delete(requestIdentifier);
        return Promise.reject(refreshError); // Reject with the refresh error
      }
    }

    return Promise.reject(error); // Reject with the original error
  }
);