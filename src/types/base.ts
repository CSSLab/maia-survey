export interface Game {
  gameId: string;
  result: string;
  termination: string;
  gameStates: GameState[];
  moves: string;
}

export interface GameState {
  lastMove?: [string, string];
  ply: number;
  fen: string;
  check: false | Color;
}

export type Move = [number, Ply, Ply?];
export type Moves = Move[];
export type Ply = string;
export type Color = "white" | "black";
