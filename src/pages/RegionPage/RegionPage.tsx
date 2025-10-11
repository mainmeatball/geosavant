import React from 'react';
import { getLevelsForThemeAndRegion } from '../../data/levels';
import { Link, useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import { useGame } from '../../context/GameContext';
import './RegionPage.scss';

export const RegionPage: React.FC = () => {
  const { completedLevels, handleLevelClick } = useGame();
  const { theme, region } = useParams<{ theme: string; region: string }>();
  const levels = getLevelsForThemeAndRegion(theme!, region!);

  const getLevelClass = (index: number, level: { id: string | number }) => {
    const completedLevel = completedLevels[level.id];
    if (index === 0) {
      return completedLevel ? "progress" : "open";
    }

    const prevLevel = levels[index - 1];
    const prevCompleted = completedLevels[prevLevel.id];

    if (!prevCompleted) return "locked";
    return completedLevel ? "progress" : "open";
  };

  return (
    <div>
      <h1>{capitalizeFirstLetter(theme)} - {capitalizeFirstLetter(region)}</h1>
      <div className="grid">
        {levels.map((level, index) => {
          const completedLevel = completedLevels[level.id];
          const progressPercent = completedLevel?.scorePercent ?? 0;
          console.log(progressPercent)
          const levelClass = getLevelClass(index, level);
          const isLocked = levelClass === "locked";

          return (
            <Link
              to={!isLocked ? `/learn/${theme}/${region}/level/${level.n}` : "#"}
              key={level.id}
              onClick={() => !isLocked && handleLevelClick(theme!, region!, level.n)}
            >
              <div
                className={`grid-item ${levelClass}`}
                style={
                  levelClass === "progress"
                    ? { "--progress": `${progressPercent}%` } as React.CSSProperties
                    : undefined
                }
              >
                <span>{level.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};