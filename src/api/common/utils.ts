/* eslint-disable import/prefer-default-export */

export const buildUrl = (path: string) =>
  process.env.REACT_APP_API_BASE_URL + path;
