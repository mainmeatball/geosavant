import React from "react";
import { regions } from "../../data/regions";
import { Link, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { useGame } from "../../context/GameContext";
import { BackButton } from "../../components/BackButton";
import { SettingsButton } from "../../components/SettingsButton";
import { LanguageButton } from "../../components/LanguageButton";

export const ThemePage: React.FC = () => {
  console.log("ThemePage rendering...");

  const { handleRegionClick } = useGame();
  const { theme } = useParams<{ theme: string }>();

  return (
    <div>
      <BackButton to={`/`} />
      <LanguageButton />
      <SettingsButton />
      <h1>{capitalizeFirstLetter(theme)} - Choose Region</h1>
      <div className="grid">
        {regions.map((region) => (
          <Link
            to={`/learn/${theme}/${region.id}`}
            className="link"
            key={region.id}
          >
            <div
              className="grid-item"
              onClick={() => handleRegionClick(theme!, region.id)}
            >
              <div className="icon">{region.icon}</div>
              {region.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
