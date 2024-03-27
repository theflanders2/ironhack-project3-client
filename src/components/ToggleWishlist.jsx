import { useState } from "react";
import gamesService from "../services/games.service";

function ToggleWishlist({ gameId }) {
  const [isOnList, setIsOnList] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  
  const addToWishlist = () => {
    // Make an axios PUT request to append (push) to wishlist
    gamesService.addToWishlist(gameId)
      .then(() => {
        setIsOnList(true);
        const successDescription = "Game successfully added to wishlist."
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
        const successDescription = "Game successfully removed from wishlist."
        setSuccessMessage(successDescription)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ToggleWishlist">
      {!isOnList ? <button onClick={addToWishlist}>Add to Wishlist</button> : <button onClick={removeFromWishlist}>Remove from Wishlist</button>}
      
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ToggleWishlist;
