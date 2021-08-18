import { useCallback, useEffect, useState } from "react";
import { getTuringGame, postTuringEvent, submitTuringGuess } from "../../api";
import { Color, TuringSubmissionFeedback, TuringGame } from "../../types";

import {
  useGames,
  useEventNumber,
  UseBoardController,
  useBoardController,
} from "../common";

export type UseTuringSubmissionControllerHook = (
  gameId: string,
  logEvent: (event: any) => void,
  onSubmit: (submission: TuringSubmissionFeedback) => void
) => [
  [Color | null, (color: Color) => void, () => Promise<void>],
  [string, (text: string) => void]
];

export const useTuringSubmissionController: UseTuringSubmissionControllerHook =
  (gameId, logEvent, onSubmit) => {
    const [guess, setGuess] = useState<Color | null>(null);
    const [submissionText, setSubmissionText] = useState<string>("");

    const onChangeGuess = useCallback(
      (color: Color) => {
        setGuess(color);
        logEvent({
          event_type: "SET_GUESS",
          guess: color,
        });
      },
      [logEvent]
    );

    const handleSubmitGuess = useCallback(async () => {
      if (guess) {
        const feedback = await submitTuringGuess(gameId, guess, submissionText);
        onSubmit(feedback);
        setGuess(null);
        setSubmissionText("");
      }
    }, [guess, gameId, submissionText, onSubmit]);

    return [
      [guess, onChangeGuess, handleSubmitGuess],
      [submissionText, setSubmissionText],
    ];
  };

const useGamesHook = () => useGames<TuringGame>();

export type UseTuringHook = () => [
  ReturnType<typeof useGamesHook>,
  ReturnType<UseBoardController>,
  ReturnType<UseTuringSubmissionControllerHook>,
  VoidFunction
];

const useTuring: UseTuringHook = () => {
  const gamesController = useGamesHook();
  const [currentGame, [games, addSubmissionToGame, addGame]] = gamesController;
  const [getEventNumber, resetEventNumber] = useEventNumber();
  const fetchNewGame = useCallback(async () => {
    const game = await getTuringGame();
    resetEventNumber();
    addGame(game);
  }, [addGame, resetEventNumber]);

  useEffect(() => {
    if (games.length === 0) {
      fetchNewGame();
    }
  }, [fetchNewGame, games.length]);

  const logBoardControlEvent = useCallback(
    (event: any) => {
      if (currentGame?.gameId)
        postTuringEvent(currentGame?.gameId, {
          event_number: getEventNumber(),
          ...event,
        });
    },
    [currentGame, getEventNumber]
  );

  const boardController = useBoardController(
    (currentGame?.gameStates ?? []).length,
    logBoardControlEvent
  );

  const logGuessEvent = useCallback(
    (event: any) => {
      if (currentGame?.gameId)
        postTuringEvent(currentGame.gameId, {
          event_number: getEventNumber(),
          board_flipped: boardController[2][0] === "black",
          ply: boardController[0][0],
          ...event,
        });
    },
    [boardController, currentGame, getEventNumber]
  );

  const turingSubmissionController = useTuringSubmissionController(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    currentGame?.gameId ?? "",
    logGuessEvent,
    addSubmissionToGame
  );

  return [
    gamesController,
    boardController,
    turingSubmissionController,
    fetchNewGame,
  ];
};

export default useTuring;
