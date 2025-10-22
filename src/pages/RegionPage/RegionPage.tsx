import React, { useEffect, useState } from "react";
import { getLevelsForThemeAndRegion } from "../../data/levels";
import { Link, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { useGame } from "../../context/GameContext";
import "./RegionPage.scss";
import { BackButton } from "../../components/BackButton";
import { SettingsButton } from "../../components/SettingsButton";
import { LanguageButton } from "../../components/LanguageButton";
import { UserState } from "../../types";

const user = "mainmeatball";

export const RegionPage: React.FC = () => {
  console.log("RegionPage rendering...");

  const {
    completedLevels,
    userState,
    handleLevelClick,
    loadUserState,
    setUserState,
  } = useGame();
  const { theme, region } = useParams<{ theme: string; region: string }>();
  const levels = getLevelsForThemeAndRegion(theme!, region!);

  // ✅ Extract user’s score data for this theme and region
  const userScores = userState.themes?.[theme!]?.[region!] || {};

  const getLevelClass = (
    index: number,
    level: { id: string; questionsNumber: number }
  ) => {
    const levelKey = level.id.toString();
    const maxSuccess = userScores[levelKey] ?? 0;

    console.log("Getting level class for level " + levelKey);
    console.log("maxSuccess=" + maxSuccess);

    // Level 1 is always open
    if (index === 0) {
      if (maxSuccess === 0) return "open";
      return maxSuccess === level.questionsNumber ? "perfect" : "progress";
    }

    // Check previous level to determine if current is locked
    const prevLevel = levels[index - 1];
    const prevScore = userScores[prevLevel.n.toString()] ?? 0;
    const prevTotal = prevLevel.questions.length;

    const isPrevComplete = prevScore === prevTotal;
    if (!isPrevComplete) return "locked";

    if (maxSuccess === 0) return "open";
    return maxSuccess === level.questionsNumber ? "perfect" : "progress";
  };

  const getLevelWithRandomFlags = () => {
    const levelN = (levels.length + 1).toString();
    const levelClass = getLevelClass(levels.length, {
      id: "flags-europe-random",
      questionsNumber: 51,
    });
    const isLocked = levelClass === "locked";
    const maxSuccess = userScores["flags-europe-random"] ?? 0;
    const progressPercent = (maxSuccess / 51) * 100;

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

    return (
      <Link
        to={`/learn/${theme}/${region}/level/infinite`}
        key={levelN}
        onClick={() => handleLevelClick(theme!, region!, "infinite")}
      >
        <div className={`grid-item open`}>
          <span>Infinite Level</span>
        </div>
      </Link>
    );
  };

  useEffect(() => {
    async function fetchUserState() {
      try {
        const state = await loadUserState(user);
        console.log("Fetched user state = " + state);
        setUserState(state || { settings: {}, themes: {} });
      } catch (err) {
        console.error("Failed to load user state:", err);
      }
    }
    console.log("Fetched user state = " + 123);
    fetchUserState();
  }, []);

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
          const levelClass = getLevelClass(index, {
            id: level.n.toString(),
            questionsNumber: level.questions.length,
          });
          const isLocked = levelClass === "locked";
          const levelKey = level.n.toString();
          const maxSuccess = userScores[levelKey] ?? 0;
          const progressPercent = (maxSuccess / level.questions.length) * 100;

          console.log(
            "Info for level: " +
              level.n +
              ". maxSuccess=" +
              maxSuccess +
              "progressPercent=" +
              progressPercent
          );

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
