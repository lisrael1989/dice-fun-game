import { Player } from './components/Player.jsx';
import { GameButtons } from './components/Buttons.jsx';
import { useState } from 'react';
import Swal from 'sweetalert2';

import './App.css';

function App() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1CurrentScore, setPlayer1CurrentScore] = useState(0);
  const [player2CurrentScore, setPlayer2CurrentScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const targetScore = 100;

  function rollDice() {
    const newDice1 = Math.floor(Math.random() * 6) + 1;
    const newDice2 = Math.floor(Math.random() * 6) + 1;
    setDice1(newDice1);
    setDice2(newDice2);
    return newDice1 + newDice2;
  }

  function winGame() {
    Swal.fire({
      title: '🥇 YOU WIN THE GAME 🥇 PLAY AGAIN',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      imageUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
  }

  function turnOver() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your score is 0 and the turn go to second player',
    });
  }

  function handleRollDice() {
    const diceTotal = rollDice();

    if (dice1 === 6 && dice2 === 6) {
      if (currentPlayer === 1) {
        turnOver();
        setPlayer1Score(0);
        setPlayer1CurrentScore(0);
        setCurrentPlayer(2);
      } else {
        turnOver();
        setPlayer2Score(0);
        setPlayer2CurrentScore(0);
        setCurrentPlayer(1);
      }
    } else {
      if (currentPlayer === 1) {
        setPlayer1CurrentScore((prev) => prev + diceTotal);
      } else {
        setPlayer2CurrentScore((prev) => prev + diceTotal);
      }
    }
  }

  function handleHold() {
    if (currentPlayer === 1) {
      const newPlayer1Score = player1Score + player1CurrentScore;
      setPlayer1Score(newPlayer1Score);
      setPlayer1CurrentScore(0);

      if (newPlayer1Score >= targetScore) {
        winGame();
        newGame();
      } else {
        setCurrentPlayer(2);
      }
    } else {
      const newPlayer2Score = player2Score + player2CurrentScore;
      setPlayer2Score(newPlayer2Score);
      setPlayer2CurrentScore(0);

      if (newPlayer2Score >= targetScore) {
        winGame();
        newGame();
      } else {
        setCurrentPlayer(1);
      }
    }
  }

  function newGame() {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1CurrentScore(0);
    setPlayer2CurrentScore(0);
    setCurrentPlayer(1);
    setDice1(1);
    setDice2(1);
  }

  return (
    <main>
      <h1 className="game-title"> 🎲 Dice Game 🎲</h1>
      <section className="container">
        <div className="dice-section">
          <img src={`public/dice-${dice1}.png`} alt={`Dice ${dice1}`} className="dice" />
          <img src={`public/dice-${dice2}.png`} alt={`Dice ${dice2}`} className="dice" />
        </div>
        <GameButtons handleRollDice={handleRollDice} handleHold={handleHold} newGame={newGame} currentPlayer={currentPlayer} />
      </section>
      <section className="player-section">
        <div className="player1">
          <h2>Player 1</h2>
          <Player totalScore={player1Score} currentScore={player1CurrentScore} />
        </div>
        <div className="player2">
          <h2>Player 2</h2>
          <Player totalScore={player2Score} currentScore={player2CurrentScore} />
        </div>
      </section>
    </main>
  );
}

export default App;
