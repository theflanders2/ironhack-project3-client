import { useState, useEffect } from "react";
import AddGame from "../components/AddGame";
import GameCard from "../components/GameCard";
import gamesService from "../services/games.service";

function GamesListPage() {
  const [games, setGames] = useState([]);

  const getAllGames = () => {
    gamesService.getAllGames()
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
        return <GameCard key={game._id} {...game} />;
      })}
    </div>
  );
}

export default GamesListPage;
