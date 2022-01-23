import React, { useState } from "react";
import { useContext } from "react";
import { GameStage } from "../../State/GameState";
import { GameContext, GameContextData } from "../../State/GameStateProvider";
import Playing from "./Playing";
import Setup from "./Setup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import HelpIcon from "@mui/icons-material/Help";
import Won from "./Won";
import Lost from "./Lost";

const Game = () => {
  const gameState = useContext<GameContextData>(GameContext);

  const [helpOpen, setHelpOpen] = useState(false);

  const renderGameStage = () => {
    switch (gameState.state.Stage) {
      case GameStage.Setup:
        return <Setup />;
      case GameStage.Playing:
        return <Playing />;
      case GameStage.Won:
        return <Won />;
      case GameStage.Lost:
        return <Lost />;
      default:
        return <div>An error happened!</div>;
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center space-y-2">
      <div className="py-3">{renderGameStage()}</div>
      <div className="absolute bottom-0 right-0 pr-2 pb-1">
        <Button
          endIcon={<HelpIcon />}
          size="small"
          onClick={() => setHelpOpen(true)}
        >
          Game Rules
        </Button>
      </div>
      <Dialog onClose={() => setHelpOpen(false)} open={helpOpen}>
        <DialogTitle>Game Rules</DialogTitle>
        <div className="px-7 pb-5">
          <div>
            The goal of the game is to score 5 points. The player scores by
            clicking on an active circle. The player is penalized if they click
            on a circle that is not active. Each score and penalty are one
            point.
          </div>
          <div className="w-full flex justify-end mt-3">
          <Button variant="outlined" size="small" onClick={() => setHelpOpen(false)}>Close</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Game;
