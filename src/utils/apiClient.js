import axios from "axios";

// Send the user movements data to the server.
export async function sendGameMoves(gameMoves) {
  const response = await axios.post(
    "https://webhook.site/29a192e9-ea3c-4be6-824c-76dea3ac336c",
    {
      gameMoves: gameMoves,
    }
  );
  return response.data;
}
