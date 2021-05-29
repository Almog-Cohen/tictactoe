import React, { useState } from "react";
import Board from "../Board/Board";
import "./Game.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { validateWinStreak, validateRowSize } from "../../utils/formValidation";

const Game = () => {
  const [isGameStarted, setGameIsStarted] = useState("");
  const formik = useFormik({
    initialValues: {
      rowSize: "",
      winStreak: "",
    },
    validate: (values) => {
      // returns error object, if empty then there are not errors and the form is valid.
      return {
        ...validateRowSize(values.rowSize),
        ...validateWinStreak(values.winStreak, values.rowSize),
      };
    },
    onSubmit: (values) => {
      setGameIsStarted({
        rowSize: values.rowSize,
        winStreak: values.winStreak,
      });
    },
  });

  // Handler for restarting the game.
  const handleGameStatus = (gameEnd) => {
    setGameIsStarted(gameEnd);
  };

  return (
    <div className="game-container">
      {isGameStarted ? (
        <Board
          boardRowNumber={isGameStarted.rowSize}
          winStreak={isGameStarted.winStreak}
          handleGameStatus={handleGameStatus}
        />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Card elevation={10}>
            <div className="card-content">
              <div className="card-input">
                <TextField
                  error={!!formik.errors.rowSize}
                  helperText={formik.errors.rowSize}
                  fullWidth={true}
                  required
                  type="number"
                  label="Row size"
                  name="rowSize"
                  placeholder="Enter row size"
                  onChange={formik.handleChange}
                  value={formik.values.rowSize}
                />
              </div>

              <div className="card-input">
                <TextField
                  required
                  error={!!formik.errors.winStreak}
                  helperText={formik.errors.winStreak}
                  fullWidth={true}
                  type="number"
                  label="Win streak"
                  name="winStreak"
                  placeholder="Enter streak for win"
                  onChange={formik.handleChange}
                  value={formik.values.winStreak}
                />
              </div>

              <div className="card-input">
                <Button
                  style={{ marginTop: "10px" }}
                  color="primary"
                  type="submit"
                  fullWidth={true}
                  variant="contained"
                  disabled={false}
                >
                  Start Game
                </Button>
              </div>
            </div>
          </Card>
        </form>
      )}
    </div>
  );
};

export default Game;
