import React from "react";
import Chessground from "@react-chess/chessground";

import "./styles.scss";

const Turing = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="board-container">
          <Chessground
            config={{
              movable: { free: false },
              highlight: { check: true, lastMove: true },
              animation: { duration: 150 },
            }}
            contained
          />
        </div>
      </div>
    </div>
  );
};

export default Turing;
