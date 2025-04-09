import React from "react";

interface CharacterCounterProps {
  value: string;
  maxLength: number;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({ value, maxLength }) => {
  const getColor = () => {
    const ratio = value.length / maxLength;
    if (ratio < 0.5) return 'green';
    if (ratio < 0.8) return 'orange';
    return 'red';
  };

  return (
    <p className="char-counter" style={{ color: getColor() }}>
      {value.length}/{maxLength}
    </p>
  );
};

export default CharacterCounter;