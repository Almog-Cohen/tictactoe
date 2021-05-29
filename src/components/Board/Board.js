import React, { useEffect, useState } from "react";
import "./Board.css";
import Square from "../Square/Square";
import Button from "@material-ui/core/Button";
import { sendGameMoves } from "../../utils/apiClient";

const Board = ({ boardRowNumber, winStreak, handleGameStatus }) => {
  const gameRow = Array(boardRowNumber).fill(null);
  const [rowArray, setRowArray] = useState({
    gameRow,
    xIsNext: true,
    steps: 0,
    gameMoves: [{ moves: gameRow }],
  });
  const [gameStatus, setGameStatus] = useState("");
  const [endGame, setEndGame] = useState(false);
  // Handler for specific square click.
  // If the square alredy has value return else set the square new value, update game states and check if there is a winner or game tie.
  // If there is a winner or the game end in tie set the game status and send the player movements data to the server.
  const handleClickSquare = async (id) => {
    if (rowArray.gameRow[id]) return;
    let newArray = [...rowArray.gameRow];
    rowArray.xIsNext ? (newArray[id] = "X") : (newArray[id] = "O");
    const winSymbol = calculateWinners(newArray, winStreak);
    const newSteps = rowArray.steps + 1;
    const newArrayMoves = rowArray.gameMoves.concat([{ moves: newArray }]);
    setRowArray({
      gameRow: newArray,
      xIsNext: !rowArray.xIsNext,
      steps: newSteps,
      gameMoves: newArrayMoves,
    });
    // if there is no a winner or game tie return.
    if (newSteps !== boardRowNumber && !winSymbol) return;

    setGameStatus(`The winner is ${winSymbol}`);
    setEndGame(true);

    winSymbol
      ? setGameStatus(`The winner is ${winSymbol}`)
      : setGameStatus("Game is tie");

    // Send the players movements to the server.
    const response = await sendGameMoves(newArrayMoves);
  };

  // Handler to restart the game.
  const handleClickResetGame = () => {
    handleGameStatus("");
  };

  // Calculate if there is a winner with a row streak (return the symbol of winner if there is else return empty string).
  const calculateWinners = (gameRow, winStreak) => {
    let counterElementsInRow = 1;
    for (let i = 0; i < gameRow.length; i++) {
      if (gameRow[i] && gameRow[i] === gameRow[i + 1]) {
        counterElementsInRow += 1;
        if (counterElementsInRow === winStreak) return gameRow[i];
      } else {
        counterElementsInRow = 1;
      }
    }
    return "";
  };

  return (
    <div className="board-conatiner">
      {gameStatus ? (
        <h1> {gameStatus}</h1>
      ) : (
        <h1>Next player turn {rowArray.xIsNext ? "X" : "O"}</h1>
      )}
      <div className="board-row">
        {rowArray &&
          rowArray.gameRow.map((square, i) => (
            <Square
              endGame={endGame}
              handleClickSquare={handleClickSquare}
              symbol={square}
              id={i}
              key={i}
            />
          ))}
      </div>
      {endGame && (
        <Button
          style={{ marginTop: "20px" }}
          onClick={() => handleClickResetGame()}
          variant="contained"
          color="primary"
        >
          Restart Game
        </Button>
      )}
    </div>
  );
};

export default Board;
