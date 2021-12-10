import { Color, Game } from "./base";

export interface MappedMove {
  stockfishEval: number;
  maiaEval: number;
  move: string;
  check: boolean | Color;
  fen: string;
}

export interface MoveMap {
  [from: string]: {
    [to: string]: MappedMove;
  };
}

export interface MaiaGame extends Game {
  moveMap: MoveMap;
  startingIndex: number;
}
