/* eslint-disable no-nested-ternary */
import React from "react";
import { SetIndexFunction, TuringGame } from "../../types";

import "./styles.scss";

const HistoryContainer = ({
  games,
  currentGameIndex,
  setCurrentGameIndex,
}: {
  games: TuringGame[];
  currentGameIndex: number;
  setCurrentGameIndex: SetIndexFunction;
}) => {
  return (
    <>
      <div className="history-container">
        {games.map(({ feedback, gameId }, index) => (
          <div
            key={gameId}
            onClick={() => setCurrentGameIndex(index)}
            className={
              index === currentGameIndex
                ? "selected"
                : feedback
                ? feedback.guessCorrect
                  ? "correct"
                  : "incorrect"
                : "current"
            }
          />
        ))}
      </div>
    </>
  );
};

export default HistoryContainer;
