import { useState, useContext } from "react";
import gamesService from "../services/games.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function ToggleGamesPlayed({ gameId }) {
  const [isOnList, setIsOnList] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Map language to corresponding content dynamically
  const pageContent = language === "en-US" ? englishContent.toggleGamesPlayed : germanContent.toggleGamesPlayed;

  const addToGamesPlayedList = async () => {
    try {
      await gamesService.addToGamesPlayedList(gameId);
      setIsOnList(true);
      const successDescription = pageContent[0];
      setSuccessMessage(successDescription);
    } catch (error) {
      console.log(error);
      setIsOnList(true);
    }
  };

  const removeFromGamesPlayedList = async () => {
    try {
      await gamesService.removeFromGamesPlayedList(gameId)
      setIsOnList(false);
      const successDescription = pageContent[1];
      setSuccessMessage(successDescription)
    } catch(error) {
      console.log(error);
      setIsOnList(false);
    }
  };

  return (
    <div className="ToggleGamesPlayed">
      {!isOnList ? (
        <button className={`${theme}`} onClick={addToGamesPlayedList}>
          {pageContent[2]}
        </button>
        ) : (
        <button className={`${theme}`} onClick={removeFromGamesPlayedList}>
          {pageContent[3]}
        </button>)}
        
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleGamesPlayed;
