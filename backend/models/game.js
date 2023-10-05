const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerX: {
    type: String,
    required: true,
  },
  playerO: {
    type: String,
    required: true,
  },
  gameState: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  moveHistory: [
    {
      player: String,
      move: Number, // The index of the square where the move was made
      timestamp: Date,
    },
  ],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
