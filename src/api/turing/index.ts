import { Moves, Plys, TuringSubmissionFeedback } from "../../types";
import { getDefaultHeaders } from "../common";
import { buildUrl } from "../common/utils";

export const TURING_STATS_WINS = "turing:wins";
export const TURING_STATS_LOSSES = "turing:losses";
export const TURING_STATS_RANK = "turing:rank";

export const getTuringGame = async () => {
  const res = await fetch(buildUrl("turing/new_game"), {
    headers: await getDefaultHeaders(),
  });
  const {
    game_id: gameId,
    moves: movesString,
    game_states: gameStates,
    result,
    termination,
  } = await res.json();
  const plys = movesString
    .replace(/(\{.*?\})|(\d+\.+)/g, "")
    .replace(/\s\s+/g, " ")
    .trim()
    .split(" ") as Plys;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const moves = plys.reduce((rows: any[], key, index) => {
    return (
      (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []) as Moves;

  return {
    gameId,
    result,
    termination,
    plys,
    moves,
    gameStates,
  };
};

export const submitTuringGuess = async (
  gameId: string,
  guess: string,
  comment?: string
): Promise<TuringSubmissionFeedback> => {
  const res = await fetch(buildUrl("turing/game_guess"), {
    headers: await getDefaultHeaders(),
    method: "POST",
    body: JSON.stringify({
      game_id: gameId,
      white_is_bot: guess === "white",
      black_is_bot: guess === "black",
      comment,
    }),
  });

  const {
    white_is_bot: whiteIsBot,
    black_is_bot: blackIsBot,
    guess_correct: guessCorrect,
    white_rating: whiteRating,
    black_rating: blackRating,
    white_name: whiteName,
    black_name: blackName,
    time_control: timeControl,
    game_type: gameType,
  } = await res.json();

  return {
    gameId,
    whiteIsBot,
    whiteRating,
    blackIsBot,
    blackRating,
    guessCorrect,
    whiteName,
    blackName,
    timeControl,
    gameType,
  } as TuringSubmissionFeedback;
};

export const postTuringEvent = async (gameId: string, event: any) => {
  const res = await fetch(buildUrl("turing/log_game_event"), {
    headers: await getDefaultHeaders(),
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

export const getTuringStats = async () => {
  const res = await fetch(buildUrl("turing/player_stats"), {
    headers: await getDefaultHeaders(),
    method: "POST",
  });

  const json = await res.json();
  return json;
};
