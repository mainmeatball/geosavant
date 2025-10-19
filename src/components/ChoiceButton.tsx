import React from "react";
import { Choice, Feedback } from "../types";
import { useGame } from "../context/GameContext";

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  feedback: Feedback | null;
  onClick: (choice: Choice, index: number) => void;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  index,
  feedback,
  onClick,
}) => {
  const { lang } = useGame();
  const getButtonClass = () => {
    if (!feedback) return "choice-button";

    const { buttonIndex, isCorrect, correctIndex } = feedback;

    // Highlight clicked button
    if (index === buttonIndex) {
      return `choice-button ${isCorrect ? "correct" : "incorrect"}`;
    }

    // If the answer was wrong, highlight the correct one
    if (!isCorrect && index === correctIndex) {
      return "choice-button correct";
    }

    return "choice-button";
  };

  return (
    <button className={getButtonClass()} onClick={() => onClick(choice, index)}>
      {lang === "en" ? choice.en : choice.ru}
    </button>
  );
};
