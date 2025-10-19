import React from "react";
import { getLevelsForThemeAndRegion } from "../../data/levels";
import { Link, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { useGame } from "../../context/GameContext";
import "./RegionPage.scss";
import { BackButton } from "../../components/BackButton";
import { SettingsButton } from "../../components/SettingsButton";
import { LanguageButton } from "../../components/LanguageButton";

export const RegionPage: React.FC = () => {
  const { completedLevels, handleLevelClick } = useGame();
  const { theme, region } = useParams<{ theme: string; region: string }>();
  const levels = getLevelsForThemeAndRegion(theme!, region!);

  const getLevelClass = (index: number, level: { id: string | number }) => {
    const completedLevel = completedLevels[level.id];
    if (index === 0) {
      if (completedLevel) {
        return completedLevel.isPerfect ? "perfect" : "progress";
      }
      return "open";
    }

    const prevLevel = levels[index - 1];
    const prevCompleted = completedLevels[prevLevel.id];

    if (!prevCompleted) return "locked";
    if (completedLevel) {
      return completedLevel.isPerfect ? "perfect" : "progress";
    }
    return "open";
  };

  const getLevelWithRandomFlags = () => {
    const levelN = (levels.length + 1).toString();
    const levelClass = getLevelClass(levels.length, {
      id: "flags-europe-random",
    });
    const completedLevel = completedLevels["flags-europe-random"];
    const progressPercent = completedLevel?.scorePercent ?? 0;
    const isLocked = levelClass === "locked";
    return (
      <Link
        to={!isLocked ? `/learn/${theme}/${region}/level/random` : "#"}
        key={levelN}
        onClick={() => !isLocked && handleLevelClick(theme!, region!, "random")}
      >
        <div
          className={`grid-item ${levelClass}`}
          style={
            levelClass === "progress"
              ? ({ "--progress": `${progressPercent}%` } as React.CSSProperties)
              : undefined
          }
        >
          <span>All Flags</span>
        </div>
      </Link>
    );
  };

  const getLevelWithInfiniteFlags = () => {
    const levelN = (levels.length + 2).toString();
    const isLocked = !!completedLevels[levels[levels.length - 1].id];
    const levelClass = isLocked ? "locked" : "open";
    return (
      <Link
        to={!isLocked ? `/learn/${theme}/${region}/level/infinite` : "#"}
        key={levelN}
        onClick={() =>
          !isLocked && handleLevelClick(theme!, region!, "infinite")
        }
      >
        <div className={`grid-item ${levelClass}`}>
          <span>Infinite Level</span>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <BackButton to={`/learn/${theme}`} />
      <LanguageButton />
      <SettingsButton />
      <h1>
        {capitalizeFirstLetter(theme)} - {capitalizeFirstLetter(region)}
      </h1>
      <div className="grid">
        {levels.map((level, index) => {
          const completedLevel = completedLevels[level.id];
          const progressPercent = completedLevel?.scorePercent ?? 0;
          const levelClass = getLevelClass(index, level);
          const isLocked = levelClass === "locked";

          return (
            <Link
              to={
                !isLocked ? `/learn/${theme}/${region}/level/${level.n}` : "#"
              }
              key={level.id}
              onClick={() =>
                !isLocked &&
                handleLevelClick(theme!, region!, level.n.toString())
              }
            >
              <div
                className={`grid-item ${levelClass}`}
                style={
                  levelClass === "progress"
                    ? ({
                        "--progress": `${progressPercent}%`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <span>{level.name}</span>
              </div>
            </Link>
          );
        })}
        {getLevelWithRandomFlags()}
        {getLevelWithInfiniteFlags()}
      </div>
    </div>
  );
};
