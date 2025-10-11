import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Question, Feedback, CompletedLevels } from '../types';
import { getLevelDataForThemeAndRegion } from '../data/levels';
import { generateQuestionsFromConfigs } from '../utils/questionGenerator';
import { FEEDBACK_DELAY } from '../constants';
import useSound from 'use-sound';

interface GameContextType {
  // state
  questions: Question[];
  currentIndex: number;
  feedback: Feedback | null;
  score: number;
  completedLevels: CompletedLevels;
  selectedTheme: string | null;
  selectedRegion: string | null;
  selectedLevel: number | null;

  // actions
  handleThemeClick: (theme: string) => void;
  handleRegionClick: (theme: string, region: string) => void;
  handleLevelClick: (theme: string, region: string, level: number) => void;
  handleChoiceClick: (choice: string, index: number, currentQuestion: Question) => void;
  goBackToRegions: () => void;
  goBackToLevels: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<CompletedLevels>({});
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [playCorrect] = useSound('/sounds/answer-correct2.wav');
  const [playWrong] = useSound('/sounds/answer-wrong.mp3');


  // Generate questions when starting a level
  useEffect(() => {
    if (selectedTheme && selectedRegion && selectedLevel) {
      const levelData = getLevelDataForThemeAndRegion(selectedTheme, selectedRegion, selectedLevel);
      if (levelData) {
        const newQuestions = generateQuestionsFromConfigs(levelData.questions);
        setQuestions(newQuestions);
        setCurrentIndex(0);
        setScore(0);
      }
    }
  }, [selectedTheme, selectedRegion, selectedLevel]);

  // Mark level as completed
  useEffect(() => {
    if (
      currentIndex >= questions.length &&
      selectedTheme &&
      selectedRegion &&
      selectedLevel &&
      questions.length > 0
    ) {
      setCompletedLevels((prev) => ({
        ...prev,
        [`${selectedTheme}-${selectedRegion}-${selectedLevel}`]: { 
          scorePercent: (score / questions.length) * 100,
          score: score, 
          isPerfect: questions.length === score 
        }
      }));
    }
  }, [currentIndex, questions.length, selectedTheme, selectedRegion, selectedLevel]);

  // Actions
  const handleThemeClick = (theme: string) => setSelectedTheme(theme);
  const handleRegionClick = (theme: string, region: string) => {
    setSelectedTheme(theme);
    setSelectedRegion(region);
  }
  const handleLevelClick = (theme: string, region: string, level: number) => {
    setSelectedTheme(theme);
    setSelectedRegion(region);
    setSelectedLevel(level);
  }

  const handleChoiceClick = (choice: string, index: number, currentQuestion: Question) => {
    if (feedback) return;
    const isCorrect = choice === currentQuestion.correctName;
    const correctIndex = currentQuestion.choices.findIndex(
      (c) => c === currentQuestion.correctName
    );

    setFeedback({ buttonIndex: index, isCorrect, correctIndex });

    if (isCorrect) {
      playCorrect();
    } else {
      playWrong();
    }

    setTimeout(() => {
      setFeedback(null);
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setCurrentIndex((prev) => prev + 1);
    }, FEEDBACK_DELAY);
  };

  const goBackToRegions = () => {
    setSelectedLevel(null);
    setSelectedRegion(null);
    setQuestions([]);
    setCurrentIndex(0);
    setFeedback(null);
  };

  const goBackToLevels = () => {
    setSelectedLevel(null);
    setQuestions([]);
    setCurrentIndex(0);
    setFeedback(null);
  };

  const resetGame = () => {
    setSelectedTheme(null);
    setSelectedRegion(null);
    setSelectedLevel(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <GameContext.Provider
      value={{
        questions,
        currentIndex,
        feedback,
        score,
        completedLevels,
        selectedTheme,
        selectedRegion,
        selectedLevel,
        handleThemeClick,
        handleRegionClick,
        handleLevelClick,
        handleChoiceClick,
        goBackToRegions,
        goBackToLevels,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
