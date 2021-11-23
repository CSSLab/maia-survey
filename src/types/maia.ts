import { Game } from "./base";

export interface MoveMap {
  [from: string]: {
    [to: string]: {
      stockfishEval: number;
      maiaEval: number;
      move: string;
      check: boolean;
    };
  };
}

export interface MaiaGame extends Game {
  moveMap: MoveMap;
}
