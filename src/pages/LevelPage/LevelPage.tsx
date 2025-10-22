import { Link, useParams } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { ProgressBar } from "../../components/ProgressBar";
import { ChoiceButton } from "../../components/ChoiceButton";
import { LevelComplete } from "../../components/LevelComplete";
import "./LevelPage.scss";
import { useEffect, useRef, useState, useMemo } from "react";
import useSound from "use-sound";
import { BackButton } from "../../components/BackButton";
import { SettingsButton } from "../../components/SettingsButton";
import Fuse from "fuse.js";
import { getCountries } from "../../constants";
import { LanguageButton } from "../../components/LanguageButton";
import { UserState } from "../../types";

const user = "mainmeatball";

export const LevelPage: React.FC = () => {
  const {
    settings,
    questions,
    currentIndex,
    feedback,
    score,
    userState,
    handleChoiceClick,
    handleAnswerInputSend,
    goBackToLevels,
    saveUserState,
    setUserState,
  } = useGame();
  const { theme, region, levelNumber } = useParams<{
    theme: string;
    region: string;
    levelNumber: string;
  }>();
  const [freeAnswerInput, setFreeAnswerInput] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const countries = getCountries().flatMap((c) => [c.nameEn, c.nameRu]);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(countries, {
        threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
        distance: 100,
        minMatchCharLength: 1,
      }),
    []
  );

  const hints = useMemo(() => {
    if (freeAnswerInput.length < 1) return [];
    const results = fuse.search(freeAnswerInput);
    return results.slice(0, 5).map((result) => result.item); // Top 5 matches
  }, [freeAnswerInput, fuse]);

  const doSaveUserState = (user: string, newUserState: UserState) => {
    setUserState(newUserState); // update local state immediately
    saveUserState(user, newUserState);
  };

  console.log("I am here");

  const handleFreeAnswerSubmit = () => {
    if (freeAnswerInput.trim() === "") return;

    handleAnswerInputSend(freeAnswerInput, currentQuestion);

    // Clear the input after submission
    setFreeAnswerInput("");
    setShowHints(false);
  };

  const handleHintClick = (country: string) => {
    setFreeAnswerInput(country);
    setShowHints(false);
  };

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const [playLevelComplete] = useSound(
    `${import.meta.env.BASE_URL}sounds/level-complete.mp3`
  );
  const previousIndexRef = useRef(currentIndex);

  // Play sound only when transitioning to completion
  useEffect(() => {
    const wasNotComplete = previousIndexRef.current < questions.length;
    const isNowComplete = currentIndex >= questions.length;

    if (wasNotComplete && isNowComplete) {
      playLevelComplete();
    }

    previousIndexRef.current = currentIndex;
  }, [currentIndex, questions.length, playLevelComplete]);

  if (currentIndex >= questions.length) {
    return (
      <LevelComplete
        theme={theme}
        region={region}
        lvl={levelNumber}
        score={score}
        totalQuestions={questions.length}
        user={user}
        userState={userState}
        saveUserState={doSaveUserState}
        onGoBack={goBackToLevels}
      />
    );
  }

  if (!currentQuestion) return <div>Loading...</div>;

  const handleKeyDown = (e) => {
    if (hints.length === 0) return;

    if (e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < hints.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : hints.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleHintClick(hints[highlightedIndex]);
        setShowHints(false);
        setHighlightedIndex(-1);
      } else {
        handleFreeAnswerSubmit();
      }
    } else if (e.key === "Escape") {
      setShowHints(false);
    }
  };

  // Compute a CSS class based on feedback
  const feedbackClass =
    feedback && feedback.isCorrect === true
      ? "correct"
      : feedback && feedback.isCorrect === false
      ? "incorrect"
      : "";

  return (
    <>
      <BackButton to={`/learn/${theme}/${region}`} />
      <LanguageButton />
      <SettingsButton />
      <div className="quiz-container">
        <ProgressBar progress={progress} />
        <span className="question-counter">
          ({currentIndex + 1}/{questions.length})
        </span>
        <h1 className="levelTitle">Level {levelNumber}</h1>
        <img src={currentQuestion.flagUrl} alt="Flag" className="flag-image" />

        {settings.answersType === "4-choices" ? (
          <div className="choices">
            {currentQuestion.choices.map((choice, idx) => (
              <ChoiceButton
                key={idx}
                choice={choice}
                index={idx}
                feedback={feedback}
                onClick={(c) => handleChoiceClick(c, idx, currentQuestion)}
              />
            ))}
          </div>
        ) : (
          <form
            className="free-answer-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleFreeAnswerSubmit();
            }}
          >
            <div className="input-wrapper">
              <input
                type="text"
                className={`free-answer-input ${feedbackClass}`}
                placeholder="Type your answer..."
                value={freeAnswerInput}
                onChange={(e) => {
                  setFreeAnswerInput(e.target.value);
                  setShowHints(true);
                  setHighlightedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowHints(true)}
                onBlur={() => {
                  setTimeout(() => setShowHints(false), 200);
                }}
              />

              {showHints && hints.length > 0 && (
                <div className="hints-dropdown">
                  {hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className={`hint-item ${
                        highlightedIndex === idx ? "highlighted" : ""
                      }`}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      onClick={() => handleHintClick(hint)}
                    >
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="submit-answer-btn">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};
