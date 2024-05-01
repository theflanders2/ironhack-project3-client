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

  const addToGamesCurrentlyPlayingList = () => {
    // Make an axios PUT request to append (push) to gamesPlayed list
    gamesService.addToGamesCurrentlyPlayingList(gameId)
      .then(() => {
        setIsOnList(true);
        const successDescription = () => {
          if (language === "en-US") {
          return englishContent.toggleCurrentlyPlaying[0]
        }
          else {
          return germanContent.toggleCurrentlyPlaying[0]
        }
      }
        setSuccessMessage(successDescription);
      })
      .catch((error) => {
        console.log(error);
        setIsOnList(true);
      });
  };

  const removeFromGamesCurrentlyPlayingList = () => {
    // Make an axios PUT request to remove (pull) from gamesPlayed list
    gamesService.removeFromGamesCurrentlyPlayingList(gameId)
      .then(() => {
        setIsOnList(false);
        const successDescription = () => {
          if (language === "en-US") {
            return englishContent.toggleCurrentlyPlaying[1]
          }
          else {
            return germanContent.toggleCurrentlyPlaying[1]
          }
        }
        setSuccessMessage(successDescription);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ToggleGamesCurrentlyPlaying">
      {!isOnList ? (
        <button className={`${theme}`} onClick={addToGamesCurrentlyPlayingList}>
        {language === "en-US" ? englishContent.toggleCurrentlyPlaying[2] : germanContent.toggleCurrentlyPlaying[2]}
        </button>
      ) : (
        <button className={`${theme}`} onClick={removeFromGamesCurrentlyPlayingList}>
         {language === "en-US" ? englishContent.toggleCurrentlyPlaying[3] : germanContent.toggleCurrentlyPlaying[3]}
        </button>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleGamesCurrentlyPlaying;
