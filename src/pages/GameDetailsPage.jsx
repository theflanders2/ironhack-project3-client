import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
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
      {game &&
        game.comments.map((comment) => (
          <CommentCard key={comment._id} {...comment} />
        ))}

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
