import { useState, useEffect, useContext } from "react";
import Search from "../components/Search";
import AddGame from "../components/AddGame";
import GameCard from "../components/GameCard";
import gamesService from "../services/games.service";
import { ThemeContext } from "../context/theme.context";

function GamesListPage() {
  const [games, setGames] = useState([]);
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const { theme } = useContext(ThemeContext);

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
    setIsLoading(false);
  }, []);

  let searchedContent = games.filter((game) =>
    game.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="GamesListPage">
      <h1>Games</h1>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <button className={`${theme}`} onClick={() => {setIsFormShowing(!isFormShowing)} }>{isFormShowing ? "Hide Add Game Form" : "Show Add Game Form"}</button>
      {isFormShowing && <AddGame refreshGames={getAllGames} />}
      <br />
      <br />
      {isLoading && <h1>Loading...</h1>}
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
