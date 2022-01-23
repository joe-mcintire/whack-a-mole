import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { GameContext, GameContextData } from "../../State/GameStateProvider";

const Won = () => {
  const gameState: GameContextData = useContext(GameContext);

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="text-xl font-bold">Yay! You won!</div>
      <div className="flex space-x-3">
          <div>Correct: {gameState.state.CorrectPicks}</div>
          <div>|</div>
          <div>Incorrect: {gameState.state.IncorrectPicks}</div>
      </div>
      <Button
        variant="contained"
        onClick={() => {
          gameState.endGame();
        }}
      >
        Play Again
      </Button>
    </div>
  );
};

export default Won;
