// Validating the row size.
export function validateRowSize(rowSize) {
  const errors = {};

  if (!rowSize) {
    errors.rowSize = "Required";
  } else if (rowSize < 4) {
    errors.rowSize = "Invalid row size (Must be atleast 4)";
  }
  return errors;
}
// Validating the win streak size.
export function validateWinStreak(winStreak, rowSize) {
  const errors = {};

  if (!winStreak) {
    errors.winStreak = "Required";
  } else if (winStreak > rowSize / 2) {
    errors.winStreak = "Win streak must be lower then row size";
  } else if (winStreak < 2) {
    errors.winStreak = "Win streak must be atleast 2 ";
  }
  return errors;
}
