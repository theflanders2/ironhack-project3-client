import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";

const API_URL = import.meta.env.VITE_DEPLOYMENT_SERVER_URL;

function GameDetailsPage() {
  const [game, setGame] = useState(null);
  const { gameId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const getGame = () => {
    axios
      .get(`${API_URL}/api/games/${gameId}`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
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
          <img src={game.coverArt} />
          <h1>{game.name}</h1>
          <ul>
            <li>Release Year: {game.releasYear}</li>
            <li>Genre: {game.genre}</li>
            <li>Platform: {game.platform}</li>
            <li>Contributed by User: {game.contributedByUser}</li>
          </ul>
        </>
      )}
      <AddComment refreshGame={getGame} gameId={gameId} />
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
