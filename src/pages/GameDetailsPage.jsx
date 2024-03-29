import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import ToggleGamesPlayed from "../components/ToggleGamesPlayed";
import ToggleGamesCurrentlyPlaying from "../components/ToggleGamesCurrentlyPlaying";
import ToggleWishlist from "../components/ToggleWishlist";
import gamesService from "../services/games.service";

function GameDetailsPage() {
  const [game, setGame] = useState(null);
  const { gameId } = useParams();

  const getGame = () => {
    gamesService.getGame(gameId)
      .then((foundGame) => setGame(foundGame.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div className="GameDetails">
      <ul className="ToggleLists">
        <li>
          <ToggleGamesPlayed gameId={gameId} />
        </li>
        <li>
          <ToggleGamesCurrentlyPlaying gameId={gameId} />
        </li>
        <li>
          <ToggleWishlist gameId={gameId} />
        </li>
      </ul>
      {game && (
        <>
          <img src={game.coverArtUrl} />
          <h1>{game.name}</h1>
          <ul>
            <li>Release Year: {game.releaseYear}</li>
            <li>Genre: {game.genre}</li>
            <li>Platform: {game.platform}</li>
            <li>Contributed by User: {game.contributedByUser}</li>
          </ul>
        </>
      )}
      <AddComment refreshGame={getGame} gameId={gameId} />
      <h2>Comments</h2>
      <ul className="CommentCardList">
        <li>
          {game && game.comments.map((comment) => (
            <CommentCard key={comment._id} {...comment} />
          ))}
        </li>
      </ul>

      <Link to="/games">
        <button>Back to Games</button>
      </Link>

      <Link to={`/games/edit/${gameId}`}>
        <button>Edit Game</button>
      </Link>
    </div>
  );
}

export default GameDetailsPage;
