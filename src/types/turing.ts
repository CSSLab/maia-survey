import { Game } from "./base";

export interface TuringSubmissionFeedback {
  gameId: string;
  whiteIsBot: boolean;
  blackIsBot: boolean;
  guessCorrect: boolean;
  whiteName: string;
  blackName: string;
  whiteRating: number;
  blackRating: number;
  timeControl: string;
  gameType: string;
}

export interface TuringGame extends Game {
  feedback?: TuringSubmissionFeedback;
}
