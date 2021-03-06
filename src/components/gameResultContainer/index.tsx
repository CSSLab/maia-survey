import React from "react";
import { GameResult } from "../../types";

import "./styles.scss";

type Props = GameResult;

const GameResultContainer: React.FC<Props> = ({
  gameType,
  timeControl,
  white,
  black,
}: Props) => {
  return (
    <>
      <div className="game-result-container">
        <div className="row">
          <h4 style={{ marginBottom: 0 }}>
            {timeControl} &middot; {gameType.toUpperCase()}{" "}
          </h4>
        </div>
        <div className="row">
          <p>
            <span className="circle">&#9679;</span> <span>{white.name}</span>{" "}
            {white.rating} {white.isBot ? <>&#129302;</> : null}
          </p>
        </div>
        <div className="row">
          <p>
            <span className="circle">&#9675;</span> <span>{black.name}</span>{" "}
            {black.rating} {black.isBot ? <>&#129302;</> : null}
          </p>
        </div>
      </div>
    </>
  );
};

export default GameResultContainer;
