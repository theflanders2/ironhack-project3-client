import { useState, useContext } from "react";
import gamesService from "../services/games.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function ToggleWishlist({ gameId }) {
  const [isOnList, setIsOnList] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const addToWishlist = () => {
    // Make an axios PUT request to append (push) to wishlist
    gamesService.addToWishlist(gameId)
      .then(() => {
        setIsOnList(true);
        const successDescription = () => {
          if (language === "en-US") {
          return englishContent.toggleWishlist[0]
        }
        else {
          return germanContent.toggleWishlist[0]
        }
      }
        setSuccessMessage(successDescription)
      })
      .catch((error) => {
        console.log(error);
        setIsOnList(true);
      });
  };

  const removeFromWishlist = () => {
    // Make an axios PUT request to remove (pull) from wishlist
    gamesService.removeFromWishlist(gameId)
      .then(() => {
        setIsOnList(false);
        const successDescription = () => {
          if (language === "en-US") {
          return englishContent.toggleWishlist[1]
        }
        else {
          return germanContent.toggleWishlist[1]
        }
      }
        setSuccessMessage(successDescription)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ToggleWishlist">
      {!isOnList ? (
        <button className={`${theme}`} onClick={addToWishlist}>
        {language === "en-US" ? englishContent.toggleWishlist[2] : germanContent.toggleWishlist[2]}
        </button>
      ) : (
        <button className={`${theme}`} onClick={removeFromWishlist}>
         {language === "en-US" ? englishContent.toggleWishlist[3] : germanContent.toggleWishlist[3]}
        </button>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleWishlist;
