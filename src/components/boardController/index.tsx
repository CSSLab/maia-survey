import React from "react";
import { UseBoardController } from "../../hooks";

const FlipIcon = (
  <svg
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="1 1 22 22"
    width="14px"
    height="14px"
  >
    <path d="M 7.1601562 3 L 8.7617188 5 L 18 5 C 18.551 5 19 5.448 19 6 L 19 15 L 16 15 L 20 20 L 24 15 L 21 15 L 21 6 C 21 4.346 19.654 3 18 3 L 7.1601562 3 z M 4 4 L 0 9 L 3 9 L 3 18 C 3 19.654 4.346 21 6 21 L 16.839844 21 L 15.238281 19 L 6 19 C 5.449 19 5 18.552 5 18 L 5 9 L 8 9 L 4 4 z" />
  </svg>
);

interface Props {
  boardController: ReturnType<UseBoardController>;
}

const BoardController = ({
  boardController: [
    ,
    [getFirst, getPrevious, getNext, getLast],
    [, changeBoardOrientation],
  ],
}: Props) => {
  return (
    <>
      <div className="button-group">
        <button onClick={changeBoardOrientation as VoidFunction}>
          {FlipIcon}
        </button>
        <button onClick={getFirst ?? (() => {})} disabled={getFirst === null}>
          &#8249;&#8249;&#8249;
        </button>
        <button
          onClick={getPrevious ?? (() => {})}
          disabled={getPrevious === null}
        >
          &#8249;
        </button>
        <button onClick={getNext ?? (() => {})} disabled={getNext === null}>
          &#8250;
        </button>
        <button onClick={getLast ?? (() => {})} disabled={getLast === null}>
          &#8250;&#8250;&#8250;
        </button>
      </div>
    </>
  );
};

export default BoardController;
