type GameState = {
    Stage: GameStage,
    CircleCount: number,
    ActiveCircleIndex?: number,
    PickedCircleIndex?: number,
    CorrectPicks: number,
    IncorrectPicks: number,
};

enum GameStage {
    Setup = 0,
    Playing = 1,
    Won = 2,
    Lost = 3,
    Ended = 4,
};

export default GameState;
export {GameStage};