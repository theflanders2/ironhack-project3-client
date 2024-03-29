import { useState } from "react";
import gamesService from "../services/games.service";

function ToggleGamesPlayed({ gameId }) {
  const [isOnList, setIsOnList] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  
  const addToGamesPlayedList = () => {
    // Make an axios PUT request to append (push) to gamesPlayed list
    gamesService.addToGamesPlayedList(gameId)
      .then(() => {
        setIsOnList(true);
        const successDescription = "Game successfully added to Games Played list."
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
        const successDescription = "Game successfully removed from Games Played list."
        setSuccessMessage(successDescription)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ToggleGamesPlayed">
      {!isOnList ? <button onClick={addToGamesPlayedList}>Add to Games Played List</button> : <button onClick={removeFromGamesPlayedList}>Remove from Games Played List</button>}
      
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleGamesPlayed;
