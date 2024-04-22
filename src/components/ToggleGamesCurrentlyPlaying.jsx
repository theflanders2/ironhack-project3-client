import { useState } from "react";
import gamesService from "../services/games.service";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

function ToggleGamesCurrentlyPlaying({ gameId }) {
  const [isOnList, setIsOnList] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const { theme } = useContext(ThemeContext);

  const addToGamesCurrentlyPlayingList = () => {
    // Make an axios PUT request to append (push) to gamesPlayed list
    gamesService.addToGamesCurrentlyPlayingList(gameId)
      .then(() => {
        setIsOnList(true);
        const successDescription = "Game successfully added to Games Currently Playing list."
        setSuccessMessage(successDescription)
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
        const successDescription = "Game successfully removed from Games Currently Playing list."
        setSuccessMessage(successDescription)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ToggleGamesCurrentlyPlaying">
      {!isOnList ? <button className={`${theme}`} onClick={addToGamesCurrentlyPlayingList}>+ Currently Playing</button> : <button className={`${theme}`} onClick={removeFromGamesCurrentlyPlayingList}>- Currently Playing</button>}
      
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleGamesCurrentlyPlaying;
