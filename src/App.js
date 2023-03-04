import "./App.css";
import React from "react";
import NoScroll from "./Layouts/NoScroll.tsx";
import Game from "./Components/Game/Game.tsx";
import GameStateProvider from "./State/GameStateProvider.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#d1591d"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <NoScroll title="Emoji Whack-A-Mole!" subtitle="Score 5 points to win!">
        <GameStateProvider>
          <Game />
        </GameStateProvider>
      </NoScroll>
    </ThemeProvider>
  );
}

export default App;
