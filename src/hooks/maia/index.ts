import { useCallback, useEffect, useMemo, useState } from "react";
import { getAnalysisGame, getMaiaGame } from "../../api";
import { MaiaGame, MappedMove, PlottedPly } from "../../types";
import { AnalyzedGame } from "../../types/analysis";
import {
  useGames,
  UseBoardController,
  useBoardController,
  isGoodMove,
} from "../common";

const useGamesHook = () => useGames<MaiaGame>();

export interface MappedMoveWithLastMove extends MappedMove {
  lastMove: string[];
}

export type UseMaiaHook = () => [
  ReturnType<typeof useGamesHook>,
  ReturnType<UseBoardController>,
  Map<string, string[]> | undefined,
  PlottedPly[],
  [
    MappedMoveWithLastMove | null,
    React.Dispatch<React.SetStateAction<[string, string] | null>>
  ],
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
];

export const useMaia: UseMaiaHook = () => {
  const gamesController = useGamesHook();
  const [currentGame, [games, , addGame]] = gamesController;
  const [currentMove, setCurrentMove] = useState<[string, string] | null>(null);

  const currentMoveData = useMemo(() => {
    if (!currentMove || !currentGame) return null;
    const [from, to] = currentMove;
    return { ...currentGame?.moveMap[from][to], lastMove: currentMove };
  }, [currentGame, currentMove]);

  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (disabled && currentMoveData && isGoodMove(currentMoveData)) {
      setDisabled(false);
    }
  }, [currentMoveData, disabled]);

  const fetchNewGame = useCallback(async () => {
    const game = await getMaiaGame();
    setDisabled(true);
    addGame(game);
  }, [addGame]);

  useEffect(() => {
    if (games.length === 0) {
      fetchNewGame();
    }
  }, [fetchNewGame, games.length]);

  const boardController = useBoardController(
    (currentGame?.gameStates.slice(0, currentGame.startingIndex + 1) ?? [])
      .length,
    () => {},
    currentGame?.startingIndex ?? 0 % 2 === 0 ? "white" : "black",
    currentGame?.startingIndex
  );
  const [[currentPlyIndex], , [, , setOrientation]] = boardController;

  useEffect(() => {
    if (currentGame) {
      setOrientation(currentGame?.startingIndex % 2 === 0 ? "white" : "black");
    }
  }, [currentGame, setOrientation]);

  const [availableMoves, plysData] = useMemo(() => {
    const data: PlottedPly[] = [];
    const moves = new Map<string, string[]>();
    Object.entries(currentGame?.moveMap ?? {}).forEach(([key, value]) => {
      moves.set(key, Object.keys(value));
      Object.entries(value).forEach(([to, plyData]) => {
        data.push({
          from: key,
          to,
          ply: plyData.move,
          x: plyData.stockfishEval,
          y: plyData.maiaEval,
          id: `${key}-${to}`,
        });
      });
    });
    return [moves, data];
  }, [currentGame]);

  return [
    gamesController,
    boardController,
    currentPlyIndex === currentGame?.startingIndex ? availableMoves : undefined,
    plysData,
    [currentMoveData, setCurrentMove],
    [disabled, setDisabled],
  ];
};
