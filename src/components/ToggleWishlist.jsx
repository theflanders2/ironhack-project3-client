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

  // Map language to corresponding content dynamically
  const pageContent = language === "en-US" ? englishContent.toggleWishlist : germanContent.toggleWishlist;

  const addToWishlist = async () => {
    try {
      await gamesService.addToWishlist(gameId)
      setIsOnList(true);
      const successDescription = pageContent[0];
      setSuccessMessage(successDescription)
    } catch(error) {
      console.log(error);
      setIsOnList(true);
    }
  };

  const removeFromWishlist = async () => {
    try {
      await gamesService.removeFromWishlist(gameId)
      setIsOnList(false);
      const successDescription = pageContent[1];
      setSuccessMessage(successDescription)
    } catch(error) {
      console.log(error);
      setIsOnList(false);
    }
  };

  return (
    <div className="ToggleWishlist">
      {!isOnList ? (
        <button className={`${theme}`} onClick={addToWishlist}>
        {pageContent[2]}
        </button>
      ) : (
        <button className={`${theme}`} onClick={removeFromWishlist}>
         {pageContent[3]}
        </button>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleWishlist;
