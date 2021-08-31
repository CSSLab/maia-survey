import { buildUrl } from "./utils";

export const JWT_ACCESS_KEY = "jwt:access";
export const JWT_USER_ID = "jwt:user_id";
export const JWT_EXPIRATION_TIME = "jwt:expiration_time";
export const JWT_USER_NAME = "jwt:user_name";
export const JWT_AUTH_STATUS = "jwt:auth_status";

export const AUTH_STATUS_LOGGED_OUT = "AUTH_STATUS:LOGGED_OUT";
export const AUTH_STATUS_LOGGED_IN = "AUTH_STATUS:LOGGED_IN";

export const storeAuthInformation = (
  token: string,
  id: string,
  providedUsername?: string,
  lichessUsername?: string
) => {
  localStorage.setItem(JWT_ACCESS_KEY, token);
  localStorage.setItem(
    JWT_EXPIRATION_TIME,
    (Date.now() + 1600 * 1000).toString()
  );
  localStorage.setItem(JWT_USER_ID, id);
  localStorage.setItem(
    JWT_USER_NAME,
    lichessUsername ?? providedUsername ?? id
  );
};

export const register = async () => {
  const res = await fetch(buildUrl("auth/register"));
  const {
    user_id: id,
    jwt: { access_token: token },
    provided_username: providedUsername,
    lichess_username: lichessUsername,
  } = await res.json();
  storeAuthInformation(token, id, providedUsername, lichessUsername);
};

export const authenticate = async () => {
  const userId = localStorage.getItem(JWT_USER_ID);
  const res = await fetch(
    buildUrl(
      `auth/login_id?user_id=${userId}&screen_width=${
        Math.floor(window.screen.width / 100) * 100
      }&screen_height=${Math.floor(window.screen.height / 100) * 100}`
    ),
    {
      method: "POST",
    }
  );
  const {
    user_id: id,
    jwt: { access_token: token },
    provided_username: providedUsername,
    lichess_username: lichessUsername,
  } = await res.json();
  storeAuthInformation(token, id, providedUsername, lichessUsername);
};

export const getEncodedAccessToken = async (): Promise<string> => {
  const userId = localStorage.getItem(JWT_USER_ID);
  if (!userId) await register();
  const expirationTime = localStorage.getItem(JWT_EXPIRATION_TIME);
  if (!expirationTime || Date.now() > parseInt(expirationTime, 10)) {
    await authenticate();
  }
  const token = localStorage.getItem(JWT_ACCESS_KEY);
  return token ?? "";
};

export const getAuthHeader = async () =>
  `Bearer ${await getEncodedAccessToken()}`;

export const getDefaultHeaders = async () => {
  const headers: { [key: string]: string } = {};

  headers.Authorization = await getAuthHeader();
  headers["Content-Type"] = "application/json";
  return headers;
};
