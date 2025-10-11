import React from 'react';

interface GameOverProps {
  onGoBack: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onGoBack }) => {
  return (
    <div>
      <h1>Out of Hearts!</h1>
      <p>Try again.</p>
      <button className="choice-button" onClick={onGoBack}>
        Go back to Levels
      </button>
    </div>
  );
};