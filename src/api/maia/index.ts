import { MaiaGame, MoveMap, Moves, Plys } from "../../types";
import { buildUrl, getDefaultHeaders, logLinear } from "../common";

export const getMaiaGame = async (): Promise<MaiaGame> => {
  const res = await fetch(buildUrl("puzzle/new_puzzle"), {
    headers: await getDefaultHeaders(),
  });
  const {
    game_id: gameId,
    moves: movesString,
    game_states: gameStates,
    result,
    termination,
    target_move_index: startingIndex,
    target_move_map: moves,
  } = await res.json();

  const moveMap: MoveMap = {};
  moves.forEach(
    ({ stockfish_eval, maia_eval, move: [from, to], check, fen }: any) => {
      if (!(from in moveMap)) {
        moveMap[from] = {};
      }
      moveMap[from][to] = {
        stockfishEval: logLinear(stockfish_eval * 8) * -1,
        maiaEval: maia_eval,
        move: `${from}-${to}`,
        // eslint-disable-next-line no-nested-ternary
        check: check ? (startingIndex % 2 === 0 ? "black" : "white") : false,
        fen,
      };
    }
  );
  const plys = movesString
    .replace(/(\{.*?\})|(\d+\.+)/g, "")
    .replace(/\s\s+/g, " ")
    .trim()
    .split(" ") as Plys;

  return {
    gameId,
    moves: plys.reduce((rows: any[], key, index) => {
      return (
        (index % 2 === 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows
      );
    }, []) as Moves,
    result,
    termination,
    moveMap,
    startingIndex,
    gameStates,
    plys,
  };

  // return new Promise<MaiaGame>((res) => {
  //   res({
  //     startingIndex: 1,
  //     gameId: "test",
  //     gameStates: [
  //       {
  //         lastMove: undefined,
  //         ply: 0,
  //         fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  //         check: false,
  //       },
  //       {
  //         lastMove: ["d2", "d4"],
  //         ply: 1,
  //         fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
  //         check: false,
  //       },
  //     ],
  //     moves: [["d4"]],
  //     termination: "test",
  //     plys: [""],
  //     result: "test",
  //     moveMap: {
  //       h7: {
  //         h6: {
  //           check: false,
  //           move: "h6",
  //           stockfishEval: -0.8,
  //           maiaEval: 0.1,
  //           fen: "rnbqkbnr/ppppppp1/7p/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         h5: {
  //           check: false,
  //           move: "h5",
  //           stockfishEval: -0.8,
  //           maiaEval: 0.08,
  //           fen: "rnbqkbnr/ppppppp1/8/7p/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //       },
  //       g7: {
  //         g6: {
  //           check: false,
  //           move: "g6",
  //           stockfishEval: -0.4,
  //           maiaEval: 0.14,
  //           fen: "rnbqkbnr/pppppp1p/6p1/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         g5: {
  //           check: false,
  //           move: "g5",
  //           stockfishEval: -0.2,
  //           maiaEval: 0.12,
  //           fen: "rnbqkbnr/pppppp1p/8/6p1/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //       },
  //       f7: {
  //         f6: {
  //           check: false,
  //           move: "f6",
  //           stockfishEval: -0.01,
  //           maiaEval: 0.22,
  //           fen: "rnbqkbnr/ppppp1pp/5p2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         f5: {
  //           check: false,
  //           move: "f5",
  //           stockfishEval: -0.001,
  //           maiaEval: 0.31,
  //           fen: "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //       },
  //       g8: {
  //         h6: {
  //           check: false,
  //           move: "kh6",
  //           stockfishEval: -3,
  //           maiaEval: 0.02,
  //           fen: "rnbqkb1r/pppppppp/7n/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2",
  //         },
  //         f6: {
  //           check: false,
  //           move: "kf6",
  //           stockfishEval: -1,
  //           maiaEval: 0.2,
  //           fen: "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2",
  //         },
  //       },
  //       e7: {
  //         e6: {
  //           check: false,
  //           move: "Kh6",
  //           stockfishEval: -3,
  //           maiaEval: 0.45,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         e5: {
  //           check: false,
  //           move: "f6",
  //           stockfishEval: -1,
  //           maiaEval: 0.41,
  //           fen: "rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //       },
  //       d7: {
  //         d6: {
  //           check: false,
  //           move: "d6",
  //           stockfishEval: -0.125,
  //           maiaEval: 0.8,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         e5: {
  //           check: false,
  //           move: "f5",
  //           stockfishEval: -0.131,
  //           maiaEval: 0.98,
  //           fen: "rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //       },
  //       c7: {
  //         c6: {
  //           check: false,
  //           move: "c6",
  //           stockfishEval: -3,
  //           maiaEval: 0.8,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         c5: {
  //           check: false,
  //           move: "c5",
  //           stockfishEval: -0.6,
  //           maiaEval: 0.45,
  //           fen: "rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //       },
  //       test: {
  //         t1: {
  //           check: false,
  //           move: "c6",
  //           stockfishEval: -8,
  //           maiaEval: 0.9,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         t2: {
  //           check: false,
  //           move: "c6",
  //           stockfishEval: -4,
  //           maiaEval: 0.9,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         t3: {
  //           check: false,
  //           move: "c6",
  //           stockfishEval: -2,
  //           maiaEval: 0.9,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         t4: {
  //           check: false,
  //           move: "c6",
  //           stockfishEval: -1,
  //           maiaEval: 0.9,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         t5: {
  //           check: false,
  //           move: "c6",
  //           stockfishEval: -0.5,
  //           maiaEval: 0.9,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         t6: {
  //           check: false,
  //           move: "c6",
  //           stockfishEval: -0.25,
  //           maiaEval: 0.9,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //         t7: {
  //           check: false,
  //           move: "c6",
  //           stockfishEval: -0.125,
  //           maiaEval: 0.9,
  //           fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  //         },
  //       },
  //     },
  //   });
  // });
};

export const a = {};
