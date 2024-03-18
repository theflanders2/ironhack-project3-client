import { useState, useEffect } from "react";
import axios from "axios";
import AddGame from "../components/AddGame";
import GameCard from "../components/GameCard";

const API_URL = import.meta.env.VITE_DEPLOYMENT_SERVER_URL;

function GamesListPage() {
  const [games, setGames] = useState([]);

  const getAllGames = () => {
    axios
      .get(`${API_URL}/api/games`)
      .then((allFoundGames) => setGames(allFoundGames.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div className="GamesListPage">
      <h1>Games</h1>
      <AddGame refreshGames={getAllGames} />

      {games.map((game) => {
        <GameCard key={game._id} {...game} />
        {
          /* {...game} automatically generates a prop for each property */
        }
      })}
    </div>
  );
}

export default GamesListPage;
