export const buildUrl = (path: string) =>
  process.env.REACT_APP_API_BASE_URL + path;

export const logLinear = (value: number) => {
  if (value <= 0.125) return value / 2 + 0.125;
  return value;
};
