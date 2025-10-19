import { useParams } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { ChoiceButton } from "../../components/ChoiceButton";
import "./LevelPage.scss";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { BackButton } from "../../components/BackButton";
import { SettingsButton } from "../../components/SettingsButton";
import { Choice, Question } from "../../types";
import { LanguageButton } from "../../components/LanguageButton";

export const InfiniteLevelPage: React.FC = () => {
  const {
    questionsGenerator,
    feedback,
    score,
    handleChoiceClick,
    goBackToLevels,
  } = useGame();

  const { theme, region, levelNumber } = useParams<{
    theme: string;
    region: string;
    levelNumber: string;
  }>();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionCount, setQuestionCount] = useState(0);

  const [playLevelComplete] = useSound(
    `${import.meta.env.BASE_URL}sounds/level-complete.mp3`
  );

  useEffect(() => {
    if (!questionsGenerator) return;

    const { value: firstQuestion } = questionsGenerator.next();
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion);
      setQuestionCount(1);
    }
  }, [questionsGenerator]);

  const handleInfiniteChoiceClick = (
    choice: Choice,
    idx: number,
    question: Question
  ) => {
    handleChoiceClick(choice, idx, question);

    // Fetch the next question after short delay
    setTimeout(() => {
      const { value: nextQuestion } = questionsGenerator.next();
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setQuestionCount((c) => c + 1);
      } else {
        // Should never happen since generator is infinite
        playLevelComplete();
        goBackToLevels();
      }
    }, 600);
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <>
      <BackButton to={`/learn/${theme}/${region}`} />
      <LanguageButton />
      <SettingsButton />

      <div className="quiz-container">
        <span className="question-counter">Highscore: {score}</span>
        <h1 className="levelTitle">Infinite Level</h1>
        <img src={currentQuestion.flagUrl} alt="Flag" className="flag-image" />
        <div className="choices">
          {currentQuestion.choices.map((choice, idx) => (
            <ChoiceButton
              key={idx}
              choice={choice}
              index={idx}
              feedback={feedback}
              onClick={(c) =>
                handleInfiniteChoiceClick(c, idx, currentQuestion)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};
