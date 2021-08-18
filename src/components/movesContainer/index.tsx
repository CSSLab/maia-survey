import React from "react";
import { Move, Moves } from "../../types";

interface Props {
  moves: Moves;
  setSelectedIndex: (index: number) => void;
  selectedIndex: number;
}

const MoveContainer = ({
  move: [whitePly, blackPly],
  index,
  setSelectedIndex,
  selectedIndex,
}: {
  move: Move;
  index: number;
  setSelectedIndex: (index: number) => void;
  selectedIndex: number;
}) => (
  <div className="move-container">
    <div className="index-container">
      <span>{index + 1}</span>
    </div>
    {whitePly && (
      <div
        className={`ply-container ${
          index * 2 + 1 === selectedIndex ? "selected-ply" : ""
        }`}
        key={index * 2}
        onClick={() => setSelectedIndex(index * 2 + 1)}
      >
        {whitePly}
      </div>
    )}
    {blackPly && (
      <div
        className={`ply-container ${
          index * 2 + 2 === selectedIndex ? "selected-ply" : ""
        }`}
        key={index * 2 + 1}
        onClick={() => setSelectedIndex(index * 2 + 2)}
      >
        {blackPly}
      </div>
    )}
  </div>
);

const MovesContainer = ({ moves, setSelectedIndex, selectedIndex }: Props) => {
  return (
    <div className="moves-container">
      <div className="col">
        {moves.map((move: Move, index: number) => (
          <MoveContainer
            move={move}
            index={index}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            // eslint-disable-next-line react/no-array-index-key
            key={`${index}-${move}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovesContainer;
