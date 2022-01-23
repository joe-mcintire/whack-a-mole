import React, { ReactNode, createContext, useState } from "react";
import GameState, { GameStage } from "./GameState";

const initialGameSettings: GameState = {
  Stage: GameStage.Setup,
  CircleCount: 3,
  ActiveCircleIndex: null,
  PickedCircleIndex: null,
  CorrectPicks: 0,
  IncorrectPicks: 0,
};

const initialState: GameContextData = {
  state: initialGameSettings,
};

const GameContext = createContext<GameContextData>(initialState);

type GameContextData = {
  state: GameState;
  setStage?: (stage: GameStage) => void;
  setCircleCount?: (count: number) => void;
  setActiveCircleIndex?: (index: number | null) => void;
  endGame?: () => void;
  setPickedCircleIndex?: (index: number | null) => void;
  incrementCorrectPicks?: () => void;
  incrementIncorrectPicks?: () => void;
  resetCircles?: () => void;
};

const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState(initialGameSettings);

  const setStage = (stage: GameStage) => {
    setGameState({ ...gameState, Stage: stage });
  };

  const setCircleCount = (count: number) => {
    setGameState({ ...gameState, CircleCount: count });
  };

  const setActiveCircleIndex = (index: number | null) => {
    setGameState({ ...gameState, ActiveCircleIndex: index });
  };

  const endGame = () => {
    setGameState(initialGameSettings);
  };

  const setPickedCircleIndex = (index: number | null) => {
    setGameState({ ...gameState, PickedCircleIndex: index });
  };

  const incrementCorrectPicks = () => {
    setGameState({ ...gameState, CorrectPicks: gameState.CorrectPicks + 1 });
  };

  const incrementIncorrectPicks = () => {
    setGameState({
      ...gameState,
      IncorrectPicks: gameState.IncorrectPicks + 1,
    });
  };

  const resetCircles = () => {
    setGameState({
      ...gameState,
      PickedCircleIndex: null,
      ActiveCircleIndex: null,
    });
  };

  return (
    <GameContext.Provider
      value={{
        state: gameState,
        setStage,
        setCircleCount,
        setActiveCircleIndex,
        endGame,
        setPickedCircleIndex,
        incrementCorrectPicks,
        incrementIncorrectPicks,
        resetCircles,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameStateProvider;
export { GameContext, GameContextData };
