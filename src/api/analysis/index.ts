import { Moves } from "../../types";
import { AnalyzedGame } from "../../types/analysis";
import { buildUrl, getDefaultHeaders, logLinear } from "../common";

// eslint-disable-next-line import/prefer-default-export
export const getAnalysisGame = async (gameId = "1"): Promise<AnalyzedGame> => {
  const res = await fetch(buildUrl(`puzzle/world_champ_game/${gameId}`), {
    headers: await getDefaultHeaders(),
  });
  const { game_states: states } = await res.json();
  const plys: any[] = [];
  const gameStates: any = (states as any[]).map(
    (
      { lastMove: [from, to], fen, check, move_map: map, ply }: any,
      index: number
    ) => {
      plys.push(`${from}-${to}`);
      const moveMap: any = {};
      const max = Math.max(
        ...map.map(({ stockfish_eval }: any) => stockfish_eval)
      );
      const normal = Math.max(...map.map(({ maia_eval }: any) => maia_eval));

      map.forEach(
        ({
          stockfish_eval,
          maia_eval,
          move: [moveFrom, moveTo],
          moveCheck,
          moveFen,
        }: any) => {
          if (!(moveFrom in moveMap)) {
            moveMap[moveFrom] = {};
          }
          moveMap[moveFrom][moveTo] = {
            stockfishEval: -logLinear((max - stockfish_eval) / 100),
            maiaEval: maia_eval,
            move: `${from}-${to}`,
            // eslint-disable-next-line no-nested-ternary
            check: moveCheck ? (index % 2 === 0 ? "black" : "white") : false,
            moveFen,
          };
        }
      );

      return {
        lastMove: [from, to],
        ply,
        fen,
        check,
        moveMap,
      };
    }
  );

  return {
    gameId,
    moves: plys.reduce((rows: any[], key, index) => {
      return (
        (index % 2 === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows
      );
    }, []) as Moves,
    result: "1/0-1/0",
    termination: "resignation",
    gameStates,
    plys,
  };
};
