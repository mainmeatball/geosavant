import React from "react";
import { themes } from "../../constants";
import { Link } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { SettingsButton } from "../../components/SettingsButton";
import { LanguageButton } from "../../components/LanguageButton";

export const MainPage: React.FC = () => {
  const { handleThemeClick } = useGame();
  return (
    <div>
      <LanguageButton />
      <SettingsButton />
      <h1>Learn Flags</h1>
      <div className="grid">
        {themes.map((theme) => (
          <Link to={`/learn/${theme.code}`} className="link" key={theme.name}>
            <div
              key={theme.name}
              className="grid-item"
              onClick={() => handleThemeClick(theme.name)}
            >
              <div className="icon">{theme.icon}</div>
              {theme.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
