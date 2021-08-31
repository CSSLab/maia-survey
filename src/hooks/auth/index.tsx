import { useCallback, useState } from "react";
import {
  authenticate,
  AUTH_STATUS_LOGGED_IN,
  AUTH_STATUS_LOGGED_OUT,
  getEncodedAccessToken,
  getTuringStats,
  JWT_AUTH_STATUS,
  JWT_USER_ID,
  JWT_USER_NAME,
  register,
  TURING_STATS_LOSSES,
  TURING_STATS_RANK,
  TURING_STATS_WINS,
} from "../../api";
import { buildUrl } from "../../api/common/utils";

export type UseAuthControllerHook = () => [
  string | null,
  [() => Promise<void>, () => Promise<void>],
  () => Promise<void>
];

const useAuthController: UseAuthControllerHook = () => {
  const [userId, setUserId] = useState(
    localStorage.getItem(JWT_AUTH_STATUS) === AUTH_STATUS_LOGGED_IN
      ? localStorage.getItem(JWT_USER_ID)
      : null
  );
  const [userName, setUserName] = useState(
    localStorage.getItem(JWT_AUTH_STATUS) === AUTH_STATUS_LOGGED_IN
      ? localStorage.getItem(JWT_USER_NAME)
      : null
  );

  const login = useCallback(async () => {
    if (userId) await authenticate();
    else await register();

    setUserId(localStorage.getItem(JWT_USER_ID));
    setUserName(localStorage.getItem(JWT_USER_NAME));

    const {
      win_count: wins,
      loss_count: losses,
      rank,
    } = await getTuringStats();

    localStorage.setItem(TURING_STATS_WINS, wins);
    localStorage.setItem(TURING_STATS_LOSSES, losses);
    localStorage.setItem(TURING_STATS_RANK, rank);
    localStorage.setItem(JWT_AUTH_STATUS, AUTH_STATUS_LOGGED_IN);
  }, [userId]);

  const logout = useCallback(async () => {
    setUserId(null);
    setUserName(null);
    localStorage.setItem(JWT_AUTH_STATUS, AUTH_STATUS_LOGGED_OUT);
  }, []);

  const authenticateWithLichess = useCallback(async () => {
    if (!userId) await login();
    const token = await getEncodedAccessToken();
    window.location.assign(buildUrl(`auth/lichess_login/${token}`));
  }, [login, userId]);

  return [userName, [login, authenticateWithLichess], logout];
};

export default useAuthController;
