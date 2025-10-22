import React, { useEffect } from "react";
import { Trophy, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import "./LevelComplete.scss";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { UserState } from "../types";

interface LevelCompleteProps {
  theme;
  region;
  lvl: string;
  score: number;
  totalQuestions: number;
  user: string;
  userState: UserState;
  saveUserState: (user: string, state: UserState) => void;
  onGoBack: () => void;
}

export const LevelComplete: React.FC<LevelCompleteProps> = ({
  theme,
  region,
  lvl,
  score,
  totalQuestions,
  user,
  userState,
  saveUserState,
  onGoBack,
}) => {
  console.log("LevelComplete rendering...");
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = percentage === 100;

  if (isPerfect) {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  }

  useEffect(() => {
    if (!theme || !region || !lvl) return;

    const newUserState = {
      ...userState,
      themes: {
        ...userState.themes,
        [theme]: {
          ...(userState.themes[theme] || {}),
          [region]: {
            ...(userState.themes[theme]?.[region] || {}),
            [lvl]: score,
          },
        },
      },
    };

    saveUserState(user, newUserState);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="level-complete"
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="level-complete__content"
      >
        <Trophy className="level-complete__icon" />
        <h1 className="level-complete__title">Level Complete!</h1>
        <p className="level-complete__subtitle">
          {isPerfect ? "Perfect score! 🏆" : "Great job! Keep going!"}
        </p>

        <div className="level-complete__score-card">
          <p className="level-complete__score">
            {score} / {totalQuestions}
          </p>
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="level-complete__percentage">{percentage}% correct</p>
        </div>

        <Link to={`/learn/${theme}/${region}`} className="link" key="flags">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="level-complete__button"
            onClick={onGoBack}
          >
            <ArrowLeft className="level-complete__button-icon" />
            Go Back to Levels
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};
