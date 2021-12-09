/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Chessground from "@react-chess/chessground";
import React, { useEffect, useState } from "react";
import {
  BoardController,
  MovesContainer,
  PercentageBar,
  PlyPlot,
  VerticalPercentageBar,
} from "../../components";
import { isGoodMove } from "../../hooks";
import { useAnalysis } from "../../hooks/analysis";

import "./styles.scss";

const Beta: React.FC = () => {
  const [
    gamesController,
    boardController,
    availableMoves,
    data,
    [currentMoveData, setCurrentMove],
    [disabled, setDisabled],
  ] = useAnalysis();

  const [game] = gamesController;
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    if (currentMoveData) setMoved(true);
  }, [currentMoveData]);

  const [[currentPlyIndex, setPlyIndex], , [orientation]] = boardController;

  const [drawnMove, setDrawnMove] = useState<string[] | null>(null);
  if (!game) {
    return <>LOADING...</>;
  }
  const currentState =
    currentMoveData ?? game.gameStates[currentPlyIndex] ?? {};
  const { fen, lastMove, check } = currentState;

  return (
    <div className="container">
      <div className="base-container" style={{ gap: 10 }}>
        <div className="col" style={{ gap: 10 }}>
          <div
            className="row"
            style={{
              gap: 10,
              height: "max-content",
              alignItems: "stretch",
            }}
          >
            <div
              className="board-container"
              style={{
                gap: 10,
                padding: 0,
              }}
            >
              <Chessground
                config={{
                  movable: {
                    free: false,
                    dests: availableMoves as any,
                    events: {
                      after: (from, to) => {
                        setCurrentMove([from, to]);
                      },
                    },
                  },
                  events: {
                    select: () => {
                      setCurrentMove(null);
                    },
                  },
                  highlight: { check: true, lastMove: true },
                  animation: { duration: 150 },
                  fen,
                  orientation,
                  lastMove: [...((lastMove ?? []) as any)],
                  check,
                  drawable: {
                    shapes: drawnMove
                      ? [
                          {
                            orig: drawnMove[0] as any,
                            dest: drawnMove[1] as any,
                          },
                        ]
                      : [],
                  },
                }}
                contained
              />
            </div>
            <VerticalPercentageBar
              color="#FF8946"
              value={currentMoveData?.maiaEval}
              range={[0, 1]}
              disabled={disabled || currentMoveData == null}
            />
          </div>
          <div className="row">
            <PercentageBar
              color="#53a7a2"
              value={currentMoveData?.stockfishEval}
              disabled={disabled}
              range={[-8, 0]}
            />
            <div style={{ width: 25 }} />
          </div>
        </div>

        <div
          className="submission-container"
          style={{
            width: 350,
            gap: 10,
            height: "70vh",
            maxHeight: "70vw",
          }}
        >
          <PlyPlot
            data={data}
            onMouseEnter={({ data: plot }) => {
              setDrawnMove([plot.from, plot.to]);
            }}
            onMouseLeave={() => {
              setDrawnMove(null);
            }}
            onClick={({ data: plot }) => {
              setCurrentMove(null);
              setCurrentMove([plot.from, plot.to]);
            }}
            disabled={disabled}
            currentMoveData={currentMoveData}
          />
          {/* <div className="feedback-container" style={{ overflowY: "scroll" }}>
            <h4>
              {currentMoveData
                ? isGoodMove(currentMoveData)
                  ? "That was a great move!"
                  : "That was a bad move"
                : "Play A Move"}
            </h4>
            {currentMoveData ? (
              disabled ? (
                <p>Why dont you try another move.</p>
              ) : (
                <p>
                  <span style={{ fontWeight: 400 }}>
                    {currentMoveData.move}
                  </span>{" "}
                  yields an evaluation of{" "}
                  <span className="stockfish-text">
                    {currentMoveData.stockfishEval.toPrecision(2)}
                  </span>
                  , and has a{" "}
                  <span className="human-text">
                    {(currentMoveData.maiaEval * 100).toFixed(0)}%
                  </span>{" "}
                  chance of being played by Maia829.
                </p>
              )
            ) : (
              <>
                <p>Lorem ipsum dolor sit,</p>
              </>
            )}
            <div className="button-group" style={{ marginTop: 10 }}>
              <>
                {currentMoveData !== null && (
                  <button onClick={() => setCurrentMove(null)}>
                    Try Another Move
                  </button>
                )}
                {disabled && moved && (
                  <button onClick={() => setDisabled(false)}>
                    View the Solution
                  </button>
                )}
              </>
            </div>
          </div> */}
          <div className="control-container">
            <MovesContainer
              moves={game.moves}
              setSelectedIndex={setPlyIndex}
              selectedIndex={currentPlyIndex}
            />
            <BoardController boardController={boardController} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beta;
