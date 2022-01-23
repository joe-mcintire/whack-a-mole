import React, { useContext, useEffect, useState } from "react";
import { GameContext, GameContextData } from "../../State/GameStateProvider";
import Button from "@mui/material/Button";
import { GameStage } from "../../State/GameState";
import Circle from "./Circle";

const Playing = () => {
  const gameState: GameContextData = useContext(GameContext);

  const [newCircleTimeoutId, setNewCircleTimeoutId] = useState<
    NodeJS.Timer | undefined | null
  >();
  const [longTimeoutId, setLongTimeoutId] = useState<
    NodeJS.Timer | undefined | null
  >();

  const getRandomInteger = (ceiling: number) => {
    return Math.floor(Math.random() * ceiling);
  };

  const startCircleResetTimer = () => {
    const longTimeout = setTimeout(() => {
      setLongTimeoutId(null);
      gameState.resetCircles();
    }, 2500);
    setLongTimeoutId(longTimeout);
  };

  const startNewCircleTimer = () => {
    const timeout = setTimeout(() => {
      clearTimeout(newCircleTimeoutId);
      setNewCircleTimeoutId(null);
      gameState.setActiveCircleIndex(
        getRandomInteger(gameState.state.CircleCount)
      );
      startCircleResetTimer();
    }, 500);
    setNewCircleTimeoutId(timeout);
  };

  const endTimer = () => {
    clearTimeout(longTimeoutId);
    clearTimeout(newCircleTimeoutId);
  };

  useEffect(() => {
    return () => endTimer();
  }, []);

  const handlePicked = (index: number) => {
    endTimer();
    gameState.setPickedCircleIndex(index);
  };

  useEffect(() => {
    if (gameState.state.PickedCircleIndex !== null) {
      if (
        gameState.state.ActiveCircleIndex === gameState.state.PickedCircleIndex
      ) {
        gameState.incrementCorrectPicks();
      } else {
        gameState.incrementIncorrectPicks();
      }
    }
  }, [gameState.state.PickedCircleIndex]);

  useEffect(() => {
    if (
      gameState.state.CorrectPicks !== 0 ||
      gameState.state.IncorrectPicks !== 0
    ) {
      // win
      if (gameState.state.CorrectPicks - gameState.state.IncorrectPicks === 5) {
        gameState.setStage(GameStage.Won);
      }
      // lose
      else if (
        gameState.state.IncorrectPicks > 0 &&
        gameState.state.CorrectPicks - gameState.state.IncorrectPicks <= 0
      ) {
        gameState.setStage(GameStage.Lost);
      } else {
        startCircleResetTimer();
      }
    }
  }, [gameState.state.CorrectPicks, gameState.state.IncorrectPicks]);

  useEffect(() => {
    if (gameState.state.ActiveCircleIndex === null) {
      startNewCircleTimer();
    }
  }, [gameState.state.ActiveCircleIndex]);

  return (
    <div className="flex flex-col items-center space-y-6 sm:space-y-10">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
        {Array.from({ length: gameState.state.CircleCount }).map((c, index) => (
          <Circle
            key={index}
            index={index}
            onPicked={(index) => handlePicked(index)}
          />
        ))}
      </div>
      <div id="score">
        Score: {gameState.state.CorrectPicks - gameState.state.IncorrectPicks}
      </div>
      <Button
        variant="contained"
        onClick={() => {
          endTimer();
          gameState.endGame();
        }}
      >
        Start Over
      </Button>
    </div>
  );
};

export default Playing;
