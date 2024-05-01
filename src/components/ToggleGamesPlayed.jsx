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

  const addToGamesPlayedList = () => {
    // Make an axios PUT request to append (push) to gamesPlayed list
    gamesService.addToGamesPlayedList(gameId)
      .then(() => {
        setIsOnList(true);
        const successDescription = () => {
          if (language === "en-US") {
          return englishContent.toggleGamesPlayed[0]
        }
        else {
          return germanContent.toggleGamesPlayed[0]
        }
      }
        setSuccessMessage(successDescription)
      })
      .catch((error) => {
        console.log(error);
        setIsOnList(true);
      });
  };

  const removeFromGamesPlayedList = () => {
    // Make an axios PUT request to remove (pull) from gamesPlayed list
    gamesService.removeFromGamesPlayedList(gameId)
      .then(() => {
        setIsOnList(false);
        const successDescription = () => {
          if (language === "en-US") {
          return englishContent.toggleGamesPlayed[1]
        }
        else {
          return germanContent.toggleGamesPlayed[1]
        }
      }
        setSuccessMessage(successDescription)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ToggleGamesPlayed">
      {!isOnList ? (
        <button className={`${theme}`} onClick={addToGamesPlayedList}>
          {language === "en-US" ? englishContent.toggleGamesPlayed[2] : germanContent.toggleGamesPlayed[2]}
        </button>
        ) : (
          <button className={`${theme}`} onClick={removeFromGamesPlayedList}>
          {language === "en-US" ? englishContent.toggleGamesPlayed[3] : germanContent.toggleGamesPlayed[3]}
           </button>)}
      
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleGamesPlayed;
