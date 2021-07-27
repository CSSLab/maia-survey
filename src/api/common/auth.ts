import { buildUrl } from "./utils";

export const JWT_ACCESS_KEY = "jwt:access";
export const JWT_USER_ID = "jwt:user_id";
export const JWT_EXPIRATION_TIME = "jwt:expiration_time";
export const JWT_USER_NAME = "jwt:user_name";

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
  localStorage.setItem(JWT_USER_ID, lichessUsername ?? providedUsername ?? id);
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
  const res = await fetch(buildUrl(`auth/login_id?user_id=${userId}`), {
    method: "POST",
  });
  const {
    user_id: id,
    jwt: { access_token: token },
    provided_username: providedUsername,
    lichess_username: lichessUsername,
  } = await res.json();
  storeAuthInformation(token, id, providedUsername, lichessUsername);
};

export const getEncodedAccessToken = async (): Promise<string> => {
  const expirationTime = localStorage.getItem(JWT_EXPIRATION_TIME);
  if (!expirationTime || Date.now() > parseInt(expirationTime, 10)) {
    await authenticate();
  }
  const token = localStorage.getItem(JWT_ACCESS_KEY);
  return token ?? "";
};
