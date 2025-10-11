import { Link, useParams } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { ProgressBar } from '../../components/ProgressBar';
import { ChoiceButton } from '../../components/ChoiceButton';
import { LevelComplete } from '../../components/LevelComplete';
import './LevelPage.scss';
import useSound from 'use-sound';


export const LevelPage: React.FC = () => {
  const { questions, currentIndex, feedback, score, handleChoiceClick, goBackToLevels } = useGame();
  const { theme, region, levelNumber } = useParams<{ theme: string; region: string; levelNumber: string }>();

  const level = Number(levelNumber);
  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const [playLevelCompete] = useSound('/sounds/level-complete.mp3');

  if (currentIndex >= questions.length) {
    playLevelCompete();
    return <LevelComplete
      theme={theme}
      region={region}
      score={score} 
      totalQuestions={questions.length} 
      onGoBack={goBackToLevels}/>
  }

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div style={{ position: 'relative' }}>
      <ProgressBar progress={progress} />
      <h1 className="levelTitle">Level {level}</h1>
      <img src={currentQuestion.flagUrl} alt="Flag" className="flag-image" />
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
    </div>
  );
};
