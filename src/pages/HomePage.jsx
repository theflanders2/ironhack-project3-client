import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import GameCard from "../components/GameCard";
import gamesService from "../services/games.service";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function HomePage() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoggedIn, user } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  const pageContent = language === "en-US" ? englishContent.homePage : germanContent.homePage;

  // Fetch recently added games
  const getLatestTenGamesAdded = async () => {
    try {
      const response = await gamesService.getLatestTenGamesAdded()
      setGames(response.data);
    } catch(error) {
      console.log("Error fetching most recently added games", error);
    }
  };

  useEffect(() => {
    getLatestTenGamesAdded();
    setIsLoading(false);
  }, []);

  return (
    <div className="HomePage">
      <h1 className="header">{pageContent[0]}</h1>
      <br />
      {isLoggedIn && (
        <>
          <h3 className="greeting">{pageContent[1]} <span>{user.username}</span>. {pageContent[2]}</h3>
        </>
      )}
      <br />
      <h4>{pageContent[3]}</h4>
      {!isLoggedIn && (
        <>
          <p><Link to={"/login"}>{pageContent[4]}</Link> {pageContent[5]}.</p>
          <p>{pageContent[6]} <Link to={"/signup"}>{pageContent[7]}</Link></p>
        </>
      )}
      <br />
      <br />
      {isLoading && <h1>{pageContent[8]}</h1>}
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
