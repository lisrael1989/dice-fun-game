export function Player({ totalScore, currentScore }) {
  return (
    <div className="player">
      <div className="total-section">
        <p>
          Total Score: <span className="total-score">{totalScore}</span>
        </p>
      </div>
      <div className="current-section">
        <p className="current-p">
          Current Score: <span className="current-score">{currentScore}</span>
        </p>
      </div>
    </div>
  );
}
