import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Question,
  Feedback,
  CompletedLevels,
  Settings,
  Choice,
} from "../types";
import { getLevelDataForThemeAndRegion } from "../data/levels";
import {
  generateInfiniteFlagQuestionsForRegion,
  generateQuestionsFromConfigs,
  generateRandomFlagQuestionsForRegion,
} from "../utils/questionGenerator";
import { FEEDBACK_DELAY } from "../constants";
import useSound from "use-sound";
import { isTMA, postEvent, retrieveLaunchParams } from "@tma.js/bridge";

interface GameContextType {
  // state
  settings: Settings;
  questions: Question[];
  questionsGenerator: Generator<Question>;
  currentIndex: number;
  feedback: Feedback | null;
  score: number;
  completedLevels: CompletedLevels;
  selectedTheme: string | null;
  selectedRegion: string | null;
  selectedLevel: string | null;
  lang: string;

  // actions
  handleThemeClick: (theme: string) => void;
  handleRegionClick: (theme: string, region: string) => void;
  handleLevelClick: (theme: string, region: string, level: string) => void;
  handleChoiceClick: (
    choice: Choice,
    index: number,
    currentQuestion: Question
  ) => void;
  handleAnswerInputSend: (choice: string, currentQuestion: Question) => void;
  handleLevelComplete: (theme: string, region: string, level: number) => void;
  goBackToRegions: () => void;
  goBackToLevels: () => void;
  resetGame: () => void;
  saveSettings: (settings: Settings) => void;
  setLang: (lang: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsGenerator, setQuestionsGenerator] = useState<
    Generator<Question>
  >(() => (function* () {})());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<CompletedLevels>({});
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({
    // default settings
    answersType: "4-choices",
  });
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [playCorrect] = useSound(
    `${import.meta.env.BASE_URL}sounds/answer-correct2.wav`
  );
  const [playWrong] = useSound(
    `${import.meta.env.BASE_URL}sounds/answer-wrong.mp3`
  );
  const [playLevelComplete] = useSound(
    `${import.meta.env.BASE_URL}sounds/level-complete.mp3`
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    if (!isTMA()) {
      return;
    }
    postEvent("web_app_setup_back_button", { is_visible: true });
  }, []);

  // Generate questions when starting a level
  useEffect(() => {
    if (selectedTheme && selectedRegion && selectedLevel) {
      if (selectedLevel === "random") {
        const newQuestions =
          generateRandomFlagQuestionsForRegion(selectedRegion);
        setQuestions(newQuestions);
        setCurrentIndex(0);
        setScore(0);
      } else if (selectedLevel === "infinite") {
        const infiniteQuestionsGenerator =
          generateInfiniteFlagQuestionsForRegion(selectedRegion);
        setQuestionsGenerator(infiniteQuestionsGenerator);
        setCurrentIndex(0);
        setScore(0);
      } else {
        const levelData = getLevelDataForThemeAndRegion(
          selectedTheme,
          selectedRegion,
          selectedLevel
        );
        if (levelData) {
          const newQuestions = generateQuestionsFromConfigs(
            levelData.questions
          );
          setQuestions(newQuestions);
          setCurrentIndex(0);
          setScore(0);
        }
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
          isPerfect: questions.length === score,
        },
      }));
    }
  }, [
    currentIndex,
    questions.length,
    selectedTheme,
    selectedRegion,
    selectedLevel,
  ]);

  // Actions
  const handleThemeClick = (theme: string) => setSelectedTheme(theme);
  const handleRegionClick = (theme: string, region: string) => {
    setSelectedTheme(theme);
    setSelectedRegion(region);
  };
  const handleLevelClick = (theme: string, region: string, level: string) => {
    setSelectedTheme(theme);
    setSelectedRegion(region);
    setSelectedLevel(level);
  };

  const handleLevelComplete = (
    theme: string,
    region: string,
    level: number
  ) => {
    playLevelComplete();
  };

  const handleChoiceClick = (
    choice: Choice,
    index: number,
    currentQuestion: Question
  ) => {
    if (feedback) return;
    const isCorrect =
      choice.en.toLowerCase() === currentQuestion.correctEnName.toLowerCase() ||
      choice.ru.toLowerCase() === currentQuestion.correctRuName.toLowerCase();
    const correctIndex = currentQuestion.choices.findIndex(
      (c) =>
        c.en.toLowerCase() === currentQuestion.correctEnName.toLowerCase() ||
        c.ru.toLowerCase() === currentQuestion.correctRuName.toLowerCase()
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

  const handleAnswerInputSend = (input: string, currentQuestion: Question) => {
    const isCorrect =
      input.toLowerCase() === currentQuestion.correctEnName.toLowerCase() ||
      input.toLowerCase() === currentQuestion.correctRuName.toLowerCase();

    setFeedback({ isCorrect: isCorrect });

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

  const saveSettings = (settings: Settings) => {
    console.log("Saved settings:", settings.answersType);
    setSettings(settings);
  };

  return (
    <GameContext.Provider
      value={{
        settings,
        questions,
        questionsGenerator,
        currentIndex,
        feedback,
        score,
        completedLevels,
        selectedTheme,
        selectedRegion,
        selectedLevel,
        lang,
        handleThemeClick,
        handleRegionClick,
        handleLevelClick,
        handleChoiceClick,
        handleAnswerInputSend,
        handleLevelComplete,
        goBackToRegions,
        goBackToLevels,
        resetGame,
        saveSettings,
        setLang,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
