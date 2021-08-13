import { useCallback, useEffect, useMemo, useState } from "react";
import { Color, SetIndexFunction, TuringSubmissionFeedback } from "../../types";

export type UseGamesHook = <T>() => [
  T | null,
  [T[], (submission: TuringSubmissionFeedback) => void, (game: T) => void],
  [number, SetIndexFunction],
  [number, number]
];

export const useGames: UseGamesHook = <T,>() => {
  const [games, setGames] = useState<{ [gameId: string]: T }>({});
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
  const [[correctCount, totalCount], setCount] = useState<[number, number]>([
    0, 0,
  ]);

  const addGame = useCallback(
    (game) => {
      const newGames = { ...games, [game.gameId]: game };
      setGames(newGames);
      setCurrentGameIndex(Object.keys(newGames).length - 1);
    },
    [games, setGames]
  );

  const addSubmissionToGame = useCallback(
    (submission) => {
      const game = games[submission.gameId];
      const newGames = {
        ...games,
        [submission.gameId]: { ...game, feedback: submission },
      };
      setGames(newGames);
      if (submission.guessCorrect) setCount([correctCount + 1, totalCount + 1]);
      else setCount([correctCount, totalCount + 1]);
    },
    [correctCount, games, totalCount]
  );

  const gamesArray = useMemo(() => Object.values(games), [games]);

  const currentGame =
    useMemo(
      () => gamesArray[currentGameIndex],
      [gamesArray, currentGameIndex]
    ) ?? null;

  return [
    currentGame,
    [gamesArray, addSubmissionToGame, addGame],
    [currentGameIndex, setCurrentGameIndex],
    [correctCount, totalCount],
  ];
};

export type UseEventNumberHook = () => [() => number, VoidFunction];

export const useEventNumber: UseEventNumberHook = () => {
  const [eventNumber, setEventNumber] = useState<number>(0);

  const resetEventNumber = useCallback(() => setEventNumber(0), []);
  const getEventNumber = useCallback(() => {
    const currentEventNumber = eventNumber;
    setEventNumber(currentEventNumber + 1);
    return currentEventNumber;
  }, [eventNumber, setEventNumber]);

  return [getEventNumber, resetEventNumber];
};

export type UseBoardController = (
  plysLength: number,
  logEvent: any
) => [
  [number, SetIndexFunction],
  [
    VoidFunction | null,
    VoidFunction | null,
    VoidFunction | null,
    VoidFunction | null
  ],
  [Color, VoidFunction]
];

export const useBoardController: UseBoardController = (
  plysLength,
  logEvent
) => {
  const [currentPlyIndex, setCurrentPlyIndex] = useState<number>(0);
  const [orientation, setOrientation] = useState<Color>("white");

  useEffect(() => {
    setCurrentPlyIndex(0);
  }, [plysLength]);

  const loggedGetFirstPly = useCallback(() => {
    setCurrentPlyIndex(0);
    const event = {
      ply: currentPlyIndex,
      board_flipped: orientation === "black",
    };
    logEvent("NEXT_PLY", event);
  }, [currentPlyIndex, logEvent, orientation]);
  const loggedGetPreviousPly = useCallback(() => {
    setCurrentPlyIndex(currentPlyIndex - 1);
    const event = {
      ply: currentPlyIndex,
      board_flipped: orientation === "black",
    };
    logEvent("PREV_PLY", event);
  }, [currentPlyIndex, logEvent, orientation]);
  const loggedGetNextPly = useCallback(() => {
    setCurrentPlyIndex(currentPlyIndex + 1);
    const event = {
      ply: currentPlyIndex,
      board_flipped: orientation === "black",
    };
    logEvent("NEXT_PLY", event);
  }, [currentPlyIndex, logEvent, orientation]);
  const loggedGetLastPly = useCallback(() => {
    setCurrentPlyIndex(plysLength - 1);
    const event = {
      ply: currentPlyIndex,
      board_flipped: orientation === "black",
    };
    logEvent("LAST_PLY", event);
  }, [currentPlyIndex, logEvent, orientation, plysLength]);

  const loggedSetPlyIndex = useCallback(
    (index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      index < plysLength && index >= 0 && setCurrentPlyIndex(index);
      const event = {
        ply: currentPlyIndex,
        board_flipped: orientation === "black",
      };
      logEvent("PLY_INDEX", event);
    },
    [currentPlyIndex, logEvent, orientation, plysLength]
  );

  const loggedChangeBoardOrientation = useCallback(() => {
    setOrientation(orientation === "white" ? "black" : "white");
    const event = {
      ply: currentPlyIndex,
      board_flipped: orientation === "black",
    };
    logEvent("CHANGE_ORIENTATION", event);
  }, [currentPlyIndex, logEvent, orientation]);

  const getFirstPly = currentPlyIndex > 0 ? loggedGetFirstPly : null;
  const getPreviousPly = currentPlyIndex > 0 ? loggedGetPreviousPly : null;
  const getNextPly = currentPlyIndex < plysLength - 1 ? loggedGetNextPly : null;
  const getLastPly = currentPlyIndex < plysLength - 1 ? loggedGetLastPly : null;
  const setPlyIndex = loggedSetPlyIndex;

  const changeBoardOrientation = loggedChangeBoardOrientation;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Left":
        case "ArrowLeft":
          if (getPreviousPly) getPreviousPly();
          break;
        case "Right":
        case "ArrowRight":
          if (getNextPly) getNextPly();
          break;
        case "Down":
        case "ArrowDown":
          if (getLastPly) getLastPly();
          break;
        case "Up":
        case "ArrowUp":
          if (getFirstPly) getFirstPly();
          break;
        case "f":
          changeBoardOrientation();
          break;
        default:
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    changeBoardOrientation,
    getFirstPly,
    getLastPly,
    getNextPly,
    getPreviousPly,
  ]);

  return [
    [currentPlyIndex, setPlyIndex],
    [getFirstPly, getPreviousPly, getNextPly, getLastPly],
    [orientation, changeBoardOrientation],
  ];
};
