import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick, isWinnerSquare }) => (
  <button 
    className={`square ${isWinnerSquare ? 'winner-square' : ''}`}
    onClick={onClick}
  >
    {value}
  </button>
);

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winnerLine = winnerInfo?.line || [];
  const isDraw = !winner && squares.every(square => square !== null);

  const status = winner 
    ? <span className="winner">Winner: {winner}</span>
    : isDraw 
    ? <span>Game Draw!</span>
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (i) => (
    <Square 
      value={squares[i]}
      onClick={() => handleClick(i)}
      isWinnerSquare={winnerLine.includes(i)}
    />
  );

  return (
    <div className="App">
      <h1 className="game-title">Tic Tac Toe</h1>
      
      <div className="game-board">
        {Array(9).fill(null).map((_, i) => renderSquare(i))}
      </div>

      <div className="game-info">
        {status}
      </div>

      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}

export default App;
