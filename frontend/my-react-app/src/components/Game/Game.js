import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
  const emptyBoard = Array(9).fill('');
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (winner !== board[a]) { // Check if scores are not already updated
            setWinner(board[a]);
            setScores((prevScores) => ({
              ...prevScores,
              [board[a]]: prevScores[board[a]] + 1,
            }));
          }
        return;
      }
    }

    if (!board.includes('')) {
      setWinner('Draw');
    }

    if (currentPlayer === 'O' && !winner) {
      const availableCells = board.reduce((acc, cell, index) => {
        if (!cell) acc.push(index);
        return acc;
      }, []);

      if (availableCells.length > 0) {
        const bestMove = getBestMove(board, 'O', 'X');
        const newBoard = [...board];
        newBoard[bestMove.index] = 'O';
        setBoard(newBoard);
        setCurrentPlayer('X');
      }
    }

}, [board, currentPlayer, winner]);

  const handleCellClick = (index) => {
    if (!board[index] && !winner && currentPlayer === 'X') {
      const newBoard = [...board];
      newBoard[index] = 'X';
      setBoard(newBoard);
      setCurrentPlayer('O');
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  const playAgain = () => {
    resetGame();
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const getBestMove = (board, computer, opponent) => {
    const availableCells = board.reduce((acc, cell, index) => {
      if (!cell) acc.push(index);
      return acc;
    }, []);

    let bestMove = null;
    let bestScore = -Infinity;

    for (let i = 0; i < availableCells.length; i++) {
      const index = availableCells[i];
      board[index] = computer;
      const score = minimax(board, 0, false, computer, opponent);
      board[index] = '';

      if (score > bestScore) {
        bestScore = score;
        bestMove = { index, score };
      }
    }

    return bestMove;
  };

  const minimax = (board, depth, isMaximizing, computer, opponent) => {
    const scores = {
      X: -1,
      O: 1,
      Draw: 0,
    };

    const result = checkWinner(board, computer, opponent);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = computer;
          const score = minimax(board, depth + 1, false, computer, opponent);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = opponent;
          const score = minimax(board, depth + 1, true, computer, opponent);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const checkWinner = (board, computer, opponent) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] === board[b] && board[a] === board[c]) {
        if (board[a] === computer) {
          return computer;
        } else if (board[a] === opponent) {
          return opponent;
        }
      }
    }

    if (!board.includes('')) {
      return 'Draw';
    }

    return null;
  };

  return (
    <div className='game-container'>
        <div className="game-card">
        <div className="board">
            {board.map((cell, index) => (
            <div
                key={index}
                className={`cell ${cell}`}
                onClick={() => handleCellClick(index)}
            >
                {cell}
            </div>
            ))}
        </div>
        {winner && (
            <div className="result">
            {winner === 'Draw' ? "It's a Draw!" : `Player ${winner} wins!`}
            <button className = 'btn' onClick={playAgain}>Play Again</button>
            <button className = 'btn' onClick={resetScores}>Reset</button>
            </div>
        )}
        <div className="scores">
            <p>Player X: {scores.X}</p>
            <p>Player O: {scores.O}</p>
        </div>
        </div>
    </div>
  );
};

export default Game;
