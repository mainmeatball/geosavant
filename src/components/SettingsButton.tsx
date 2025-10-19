import React, { useState } from 'react';
import './SettingsButton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useGame } from '../context/GameContext';
import { AnswersType, Settings } from '../types';

export const SettingsButton = () => {
  const { settings, saveSettings } = useGame()

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [answerType, setAnswerType] = useState<AnswersType>("4-choices");

  const openSettings = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 100);
  };

  const closeSettings = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    saveSettings({ answersType: answerType });
    closeSettings();
  };

  return (
    <>
      <button 
        className={`settings-button ${isAnimating ? 'rotating' : ''}`} 
        onClick={openSettings}
      >
        <FontAwesomeIcon icon={faGear} />
      </button>

      {isOpen && (
        <div className="settings-overlay" onClick={closeSettings}>
          <div className="settings-popup" onClick={(e) => e.stopPropagation()}>
            <h2 className="settings-title">Settings</h2>
            
            <div className="settings-field">
              <label htmlFor="answer-type">Answer Type:</label>
              <select 
                id="answer-type"
                value={answerType}
                onChange={(e) => setAnswerType(e.target.value as AnswersType)}
                className="settings-dropdown"
              >
                <option value="4-choices">4 Choices</option>
                <option value="free-answer">Free answer</option>
              </select>
            </div>

            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}