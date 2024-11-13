export function GameButtons({ handleRollDice, handleHold, newGame, currentPlayer }) {
  return (
    <div className="btn-section">
      <button type="button" onClick={newGame} className=" new-game-btn btn">
        New Game
      </button>
      <button type="button" onClick={handleRollDice} className="roll-dice-btn btn">
        Roll dice
      </button>
      <button type="button" onClick={handleHold} className="hold-btn btn">
        Hold
      </button>
      <p className="current-player">
        Current Turn: <span className="current-player-num"> Player {currentPlayer}</span>
      </p>
    </div>
  );
}
