import React from 'react';

interface HeartsProps {
  hearts: number;
}

export const Hearts: React.FC<HeartsProps> = ({ hearts }) => {
  return (
    <div className="hearts">
      {'❤️'.repeat(hearts)}
    </div>
  );
};