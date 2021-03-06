import React, { useCallback } from "react";
import { Move, Moves } from "../../types";

interface Props {
  moves: Moves;
  setSelectedIndex: (index: number) => void;
  selectedIndex: number;
  mobile?: boolean;
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
}) => {
  const scroll = useCallback(
    (ref: HTMLDivElement) => {
      const selected =
        index * 2 + 1 === selectedIndex || index * 2 + 2 === selectedIndex;
      if (selected && ref != null) {
        ref.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    },
    [index, selectedIndex]
  );

  return (
    <div className="move-container" ref={scroll}>
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
};

const MovesContainer: React.FC<Props> = ({
  moves,
  setSelectedIndex,
  selectedIndex,
  mobile,
}: Props) => {
  return (
    <div
      className="moves-container"
      style={
        mobile
          ? {
              overflowX: "scroll",
              overflowY: "hidden",
              height: "auto",
              fontSize: "14px",
              flexDirection: "row",
            }
          : {}
      }
    >
      <div className="moves" style={mobile ? { flexDirection: "row" } : {}}>
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

MovesContainer.defaultProps = {
  mobile: false,
};

export default MovesContainer;
