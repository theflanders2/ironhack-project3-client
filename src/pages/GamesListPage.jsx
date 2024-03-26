import { useState, useEffect } from "react";
import Search from "../components/Search";
import AddGame from "../components/AddGame";
import GameCard from "../components/GameCard";
import gamesService from "../services/games.service";

function GamesListPage() {
  const [games, setGames] = useState([]);
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const getAllGames = () => {
    gamesService.getAllGames()
      .then((response) => {
        const allGames = response.data;
        setGames(allGames);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllGames();
  }, []);

  let searchedContent = games.filter((game) =>
    game.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="GamesListPage">
      <h1>Games</h1>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <button onClick={() => {setIsFormShowing(!isFormShowing)} }>{isFormShowing ? "Hide Add Game Form" : "Show Add Game Form"}</button>
      {isFormShowing && <AddGame refreshGames={getAllGames} />}

      <ul>
        <li>
          {searchedContent.map((game) => {
            return <GameCard key={game._id} {...game} />
          })}
        </li>
      </ul>
    </div>
  );
}

export default GamesListPage;
