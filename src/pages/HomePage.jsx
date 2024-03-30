import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import GameCard from "../components/GameCard";
import gamesService from "../services/games.service";

function HomePage() {
  const [games, setGames] = useState([]);
  
  const { isLoggedIn, user } = useContext(AuthContext);

  const getLatestTenGamesAdded = () => {
    gamesService.getLatestTenGamesAdded()
      .then((response) => {
        const latestTenGamesAdded = response.data;
        setGames(latestTenGamesAdded);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLatestTenGamesAdded();
  }, []);

  return (
    <div className="HomePage">
      <h1 className="header">Welcome to Gameodex</h1>

      {isLoggedIn && (
        <>
          <h3 className="greeting">It feels good to welcome you back, <span>{user.username}</span>. Next time make sure not to stay away for so long!</h3>
        </>
      )}
      <h4>Here are the 10 most recently added games</h4>
      {!isLoggedIn && (
        <>
          <p><Link to={"/login"}>Login</Link> to view the entire game catalog.</p>
          <p>If you do not have an account yet, you can create your account <Link to={"/signup"}>here</Link></p>
        </>
      )}
      <br />
      <br />
      <ul>
        <li>
          {games.map((game) => {
            return <GameCard key={game._id} {...game} />
          })}
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
