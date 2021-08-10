import React, { useCallback } from "react";
import Chessground from "@react-chess/chessground";

import "./styles.scss";
import { useTuring } from "../../../hooks";
import MovesContainer from "../../../components/movesContainer";
import BoardController from "../../../components/boardController";
import GameResultContainer from "../../../components/gameResultContainer";
import { GameResult, SubmissionFeedback } from "../../../types";
import HistoryContainer from "../../../components/historyContainer";

const turingSubmissionToGameResult = ({
  gameId,
  gameType,
  timeControl,
  whiteName,
  whiteRating,
  whiteIsBot,
  blackName,
  blackRating,
  blackIsBot,
}: SubmissionFeedback): GameResult => {
  return {
    gameId,
    gameType,
    timeControl,
    white: {
      name: whiteName,
      rating: whiteRating,
      isBot: whiteIsBot,
    },
    black: {
      name: blackName,
      rating: blackRating,
      isBot: blackIsBot,
    },
  };
};

const Turing = () => {
  const [
    gamesController,
    boardController,
    turingSubmissionController,
    fetchGame,
  ] = useTuring();

  const [[currentPlyIndex, setPlyIndex], , [orientation]] = boardController;
  const [[guess, setGuess, submitGuess], [submissionText, setSubmissionText]] =
    turingSubmissionController;
  const [
    game,
    [games, ,],
    [currentGameIndex, setCurrentGameIndex],
    [correctCount, totalCount],
  ] = gamesController;

  if (!game) {
    return <></>;
  }

  const currentState = game.gameStates[currentPlyIndex] ?? {};

  const { fen, lastMove, check } = currentState;
  return (
    <div className="container">
      <div className="row">
        <div className="submission-container">
          <div>
            {game.feedback ? (
              <>
                <div className="row">
                  <h3 style={{ marginBottom: 2 }}>
                    Guess{" "}
                    {game.feedback?.guessCorrect ? "correct" : "incorrect"}
                  </h3>
                </div>
                <p>
                  <span>{game.feedback?.whiteIsBot ? "White" : "Black"}</span>{" "}
                  was the bot
                </p>
                <GameResultContainer
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...turingSubmissionToGameResult(game.feedback)}
                />
              </>
            ) : (
              <>
                <div className="row">
                  <h4>Choose the Bot</h4>
                </div>
                <div className="submission-group">
                  <button
                    onClick={() => setGuess("white")}
                    className={guess === "white" ? "selected" : ""}
                  >
                    {guess === "white" ? (
                      <h2>&middot; white &middot;</h2>
                    ) : (
                      <h2>white</h2>
                    )}
                  </button>
                  <button
                    onClick={() => setGuess("black")}
                    className={guess === "black" ? "selected" : ""}
                  >
                    {guess === "black" ? (
                      <h2>&middot; black &middot;</h2>
                    ) : (
                      <h2>black</h2>
                    )}
                  </button>
                </div>
              </>
            )}

            <div className="submission-group">
              <button
                disabled={
                  (!guess && !game.feedback) ||
                  currentGameIndex !== games.length - 1
                }
                className="submission-button"
                onClick={game.feedback ? fetchGame : submitGuess}
              >
                <h1>{game.feedback ? "NEXT" : "SUBMIT"}</h1>
              </button>
            </div>
            {guess && (
              <div className="submission-group">
                <textarea
                  placeholder="Optional Justification"
                  value={submissionText}
                  onInput={(e) => setSubmissionText(e.currentTarget.value)}
                />
              </div>
            )}
          </div>
          <div className="col stats-container">
            <div className="row">
              <h4 style={{ marginBottom: 6 }}>
                <span>
                  {correctCount}/{totalCount}
                </span>{" "}
                {totalCount > 0
                  ? ((correctCount / totalCount) * 100).toFixed(2)
                  : 0}
                %
              </h4>
            </div>
            <div className="row">
              <h4 style={{ marginTop: 6 }}>
                Rank <span>~20000</span>
              </h4>
            </div>
          </div>
        </div>
        <div className="board-container">
          <Chessground
            config={{
              movable: { free: false },
              highlight: { check: true, lastMove: true },
              animation: { duration: 150 },
              fen,
              orientation,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              lastMove: [...((lastMove ?? []) as any)],
              check,
            }}
            contained
          />
          <HistoryContainer
            games={games}
            currentGameIndex={currentGameIndex}
            setCurrentGameIndex={setCurrentGameIndex}
          />
        </div>
        <div className="bordered">
          <MovesContainer
            moves={game.moves}
            setSelectedIndex={setPlyIndex}
            selectedIndex={currentPlyIndex}
          />
          <BoardController boardController={boardController} />
        </div>
      </div>
    </div>
  );
};

export default Turing;
