import React, { useEffect, useRef, useState } from "react";
import "./LanguageButton.scss";
import { useGame } from "../context/GameContext";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  // you can add more later like:
  // { code: "es", label: "Español" },
];

export const LanguageButton = () => {
  console.log("LanguageButton rendering...");

  const { lang, setLang } = useGame();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLang(code);
    localStorage.setItem("lang", code);
    setOpen(false);
    window.location.reload(); // optional if you’re not using i18n
  };

  return (
    <div className="language-dropdown" ref={dropdownRef}>
      <button className="language-button" onClick={() => setOpen(!open)}>
        {lang.toUpperCase()}
      </button>
      {open && (
        <ul className="language-menu">
          {LANGUAGES.map(({ code, label }) => (
            <li
              key={code}
              className={code === lang ? "active" : ""}
              onClick={() => handleSelect(code)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
