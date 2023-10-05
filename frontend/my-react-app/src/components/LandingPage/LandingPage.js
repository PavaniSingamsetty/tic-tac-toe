import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h3>How to Play</h3>
            <p>
              - The goal is simple is to be the first to form a horizontal, vertical, or diagonal line of three of your marks (either X or O).
              <br />
              - Tic-Tac-Toe is a two-player game. You can challenge a friend or go head-to-head with the computer.
              <br />
              - You'll find a 3x3 grid where you can place your Xs or Os. Each cell represents a move.
              <br />
              - The player who successfully creates a line of three of their marks wins the game.
            </p>
          </div>
          <div className="flip-card-back">
            <h3>Tips</h3>
            <p>
              - Pay attention to your opponent's moves and anticipate their strategy.
              <br />
              - Aim to block your opponent's winning moves while creating opportunities for your own.
              <br />
              - Keep the center square in mind; it's often a key to victory.
              <br />
              - Experiment with different tactics and have fun strategizing!
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default LandingPage;
