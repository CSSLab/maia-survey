import { useCallback, useEffect, useMemo, useState } from "react";
import { getAnalysisGame } from "../../api";
import { MappedMove, PlottedPly } from "../../types";
import { UseBoardController, useBoardController, useGames } from "../common";

import { AnalyzedGame } from "../../types/analysis";

const useGamesHook = () => useGames<AnalyzedGame>();

export interface MappedMoveWithLastMove extends MappedMove {
  lastMove: string[];
}

export type UseAnalysisHook = () => [
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

export const useAnalysis: UseAnalysisHook = () => {
  const gamesController = useGamesHook();
  const [currentGame, [games, , addGame]] = gamesController;
  const [currentMove, setCurrentMove] = useState<[string, string] | null>(null);

  const [disabled, setDisabled] = useState<boolean>(false);

  const fetchNewGame = useCallback(async () => {
    const game = await getAnalysisGame();
    addGame(game);
  }, [addGame]);

  useEffect(() => {
    if (games.length === 0) {
      fetchNewGame();
    }
  }, [fetchNewGame, games.length]);

  const boardController = useBoardController(
    (currentGame?.gameStates ?? []).length,
    () => {}
  );
  const [[currentPlyIndex]] = boardController;

  const currentMoveData = useMemo(() => {
    if (!currentMove || !currentGame) return null;
    const [from, to] = currentMove;
    return {
      ...currentGame?.gameStates[currentPlyIndex].moveMap[from][to],
      lastMove: currentMove,
    };
  }, [currentGame, currentMove, currentPlyIndex]);

  console.log(currentMoveData);

  const [availableMoves, plysData] = useMemo(() => {
    const data: PlottedPly[] = [];
    const moves = new Map<string, string[]>();
    Object.entries(
      currentGame?.gameStates[currentPlyIndex].moveMap ?? {}
    ).forEach(([key, value]) => {
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
  }, [currentGame?.gameStates, currentPlyIndex]);

  return [
    gamesController,
    boardController,
    availableMoves,
    plysData,
    [currentMoveData, setCurrentMove],
    [disabled, setDisabled],
  ];
};
