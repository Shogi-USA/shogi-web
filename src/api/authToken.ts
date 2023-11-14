/**
 * This variable holds the access token.
 * It is initialized to null.
 */
let accessToken: string | null = null;

/**
 * This function sets the access token.
 * @param token The access token to set.
 */
export const setAccessToken = (token: string) => {
  accessToken = token;
};

/**
 * This function clears the access token.
 */
export const clearAccessToken = () => {
  accessToken = null;
}

/**
 * This function gets the access token.
 * @returns The current access token.
 */
export const getAccessToken = () => {
  return accessToken;
};