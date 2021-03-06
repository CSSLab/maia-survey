/* eslint-disable no-nested-ternary */
import React, { useMemo } from "react";
import Chessground from "@react-chess/chessground";

import "./styles.scss";
import { useMobile, UseModalControllerHook, useTuring } from "../../../hooks";
import { GameResult, TuringSubmissionFeedback } from "../../../types";
import {
  BoardController,
  GameResultContainer,
  HistoryContainer,
  MovesContainer,
} from "../../../components";
import { TURING_STATS_RANK } from "../../../api";

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
}: TuringSubmissionFeedback): GameResult => {
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

interface Props {
  modalController: ReturnType<UseModalControllerHook>;
}

const Turing: React.FC<Props> = ({ modalController }: Props) => {
  const [
    gamesController,
    boardController,
    turingSubmissionController,
    fetchGame,
  ] = useTuring();

  const [[, setShowModal]] = modalController;

  const [[currentPlyIndex, setPlyIndex], , [orientation]] = boardController;
  const [[guess, setGuess, submitGuess], [submissionText, setSubmissionText]] =
    turingSubmissionController;
  const [
    game,
    [games, ,],
    [currentGameIndex, setCurrentGameIndex],
    [correctCount, totalCount],
  ] = gamesController;

  const mobile = useMobile();

  const statsContainer = useMemo(
    () => (
      <div className="stats-container">
        <div className="row">
          <h4>
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
          <h4>
            Rank{" "}
            <span>~{localStorage.getItem(TURING_STATS_RANK) ?? "2000"}</span>
          </h4>
        </div>
      </div>
    ),
    [correctCount, totalCount]
  );

  // TODO: Make a cool loading screen
  if (!game) {
    return <>LOADING...</>;
  }

  const currentState = game.gameStates[currentPlyIndex] ?? {};

  const { fen, lastMove, check } = currentState;
  return (
    <div className="container">
      <div className="base-container">
        {mobile && statsContainer}
        <div className="submission-container">
          <div>
            {game.feedback ? (
              <>
                <div className="row">
                  <h3 style={{ marginBottom: 2 }}>
                    Guess{" "}
                    {game.feedback?.guessCorrect ? (
                      <span className="correct-label">correct</span>
                    ) : (
                      <span className="incorrect-label">incorrect</span>
                    )}
                    {", "}
                    <span>
                      {game.feedback?.whiteIsBot ? "White" : "Black"}
                    </span>{" "}
                    was the bot
                  </h3>
                </div>

                <GameResultContainer
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...turingSubmissionToGameResult(game.feedback)}
                />
              </>
            ) : (
              <>
                <div className="submission-title">
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
                className="submission-button"
                onClick={
                  currentGameIndex !== games.length - 1
                    ? () => setCurrentGameIndex(games.length - 1)
                    : game.feedback
                    ? fetchGame
                    : submitGuess
                }
              >
                <h1>
                  {currentGameIndex !== games.length - 1
                    ? "CONTINUE"
                    : game.feedback
                    ? "NEXT"
                    : "SUBMIT"}
                </h1>
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
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => setShowModal(true)}>view instructions?</a>
          </div>
          {!mobile && statsContainer}
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
        <div className="control-container">
          {mobile ? (
            <>
              <BoardController boardController={boardController} />
              <MovesContainer
                moves={game.moves}
                setSelectedIndex={setPlyIndex}
                selectedIndex={currentPlyIndex}
              />
            </>
          ) : (
            <>
              <MovesContainer
                moves={game.moves}
                setSelectedIndex={setPlyIndex}
                selectedIndex={currentPlyIndex}
              />
              <BoardController boardController={boardController} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Turing;
