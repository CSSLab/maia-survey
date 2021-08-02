import { getDefaultHeaders } from "../common";
import { buildUrl } from "../common/utils";

export const getGame = async () => {
  const res = await fetch(buildUrl("turing/new_game"), {
    headers: getDefaultHeaders(),
  });
  const json = await res.json();
  return json;
};

export const submitGuess = async (guess: string, gameId: string) => {
  const res = await fetch(buildUrl("turing/game_guess"), {
    headers: getDefaultHeaders(),
    method: "POST",
    body: JSON.stringify({
      game_id: gameId,
      white_is_bot: guess === "white",
      black_is_bot: guess === "black",
    }),
  });

  const json = await res.json();
  return json;
};

export const postEvent = async (gameId: string, event: any) => {
  const res = await fetch(buildUrl("turing/log_game_event"), {
    headers: getDefaultHeaders(),
    method: "POST",
    body: JSON.stringify({
      game_id: gameId,
      timestamp: Date.now(),
      ...event,
    }),
  });
  const json = await res.json();
  return json;
};
