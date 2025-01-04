import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import ToggleGamesPlayed from "../components/ToggleGamesPlayed";
import ToggleGamesCurrentlyPlaying from "../components/ToggleGamesCurrentlyPlaying";
import ToggleWishlist from "../components/ToggleWishlist";
import gamesService from "../services/games.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function GameDetailsPage() {
  const [game, setGame] = useState(null);

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const { gameId } = useParams();

  const pageContent = language === "en-US" ? englishContent.gameDetailsPage : germanContent.gameDetailsPage;

  // Fetch game
  const getGame = async () => {
    try {
      const foundGame = await gamesService.getGame(gameId);
      setGame(foundGame.data);
    } catch (error) {
      console.log("Error fetching game:", error)
    }
  }

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div className="GameDetailsPage">
      <ul className="ToggleLists-GameDetailsPage">
        <li><ToggleGamesPlayed gameId={gameId} /></li>
        <li><ToggleGamesCurrentlyPlaying gameId={gameId} /></li>
        <li><ToggleWishlist gameId={gameId} /></li>
      </ul>
      {game && (
        <>
          <img src={game.coverArtUrl} />
          <h1>{game.name}</h1>
          <ul>
            <li>{pageContent[0]}: {game.releaseYear}</li>
            <li>{pageContent[1]}: {game.genre.join(', ')}</li>
            <li>{pageContent[2]}: {game.platform.join(', ')}</li>
            <li>{pageContent[3]}: {game.contributedByUser}</li>
          </ul>
        </>
      )}
      <AddComment refreshGame={getGame} gameId={gameId} />
      <h2>{pageContent[4]}</h2>
      <ul className="CommentCard-GameDetailsPage">
        <li>
          {game && game.comments.map((comment) => (
            <CommentCard key={comment._id} {...comment} />
          ))}
        </li>
      </ul>

      <Link to="/games">
        <button className={`${theme}`}>{pageContent[5]}</button>
      </Link>

      <Link to={`/games/edit/${gameId}`}>
        <button className={`${theme}`}>{pageContent[6]}</button>
      </Link>
    </div>
  );
}

export default GameDetailsPage;
