import React from "react";
import "./Square.css";

const Square = ({ symbol, id, handleClickSquare, endGame }) => {
  // Define color for each square by symbol.
  const defineColor = (symbol) => {
    return symbol === "X" ? "red" : "blue";
  };

  return (
    <div>
      <button
        disabled={endGame}
        style={{ color: defineColor(symbol) }}
        className="square"
        onClick={() => handleClickSquare(id)}
      >
        {symbol}
      </button>
    </div>
  );
};

export default Square;
