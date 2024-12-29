import { useState, useContext } from "react";
import gamesService from "../services/games.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function ToggleGamesCurrentlyPlaying({ gameId }) {
  const [isOnList, setIsOnList] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const pageContent = language === "en-US" ? englishContent.toggleCurrentlyPlaying : germanContent.toggleCurrentlyPlaying;

  const addToGamesCurrentlyPlayingList = async () => {
    try {
      await gamesService.addToGamesCurrentlyPlayingList(gameId)
      setIsOnList(true);
      const successDescription = pageContent[0];
      setSuccessMessage(successDescription);
    } catch(error) {
        console.log(error);
        setIsOnList(true);
    }
  };

  const removeFromGamesCurrentlyPlayingList = async () => {
    try {
      await gamesService.removeFromGamesCurrentlyPlayingList(gameId)
      setIsOnList(false);
      const successDescription = pageContent[1];
      setSuccessMessage(successDescription);
    } catch(error) {
      console.log(error);
      setIsOnList(false);
    }
  };

  return (
    <div className="ToggleGamesCurrentlyPlaying">
      {!isOnList ? (
        <button className={`${theme}`} onClick={addToGamesCurrentlyPlayingList}>
          {pageContent[2]}
        </button>
      ) : (
        <button className={`${theme}`} onClick={removeFromGamesCurrentlyPlayingList}>
          {pageContent[3]}
        </button>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleGamesCurrentlyPlaying;
