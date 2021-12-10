import { MoveMap } from ".";
import { GameState, Moves, Plys } from "./base";

export interface AnalyzedGameState extends GameState {
  moveMap: MoveMap;
}

export interface AnalyzedGame {
  gameId: string;
  result: string;
  termination: string;
  gameStates: AnalyzedGameState[];
  moves: Moves;
  plys: Plys;
}
