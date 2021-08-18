export interface Game {
  gameId: string;
  result: string;
  termination: string;
  gameStates: GameState[];
  moves: Moves;
  plys: Plys;
}

export interface GameState {
  lastMove?: [string, string];
  ply: number;
  fen: string;
  check: false | Color;
}

export interface Player {
  name: string;
  rating: number;
  isBot: boolean;
}

export interface GameResult {
  gameId: string;
  white: Player;
  black: Player;
  gameType: string;
  timeControl: string;
}

export type Move = [Ply, Ply?];
export type Moves = Move[];
export type Ply = string;
export type Plys = Ply[];
export type Color = "white" | "black";

export type SetIndexFunction = (index: number) => void;
