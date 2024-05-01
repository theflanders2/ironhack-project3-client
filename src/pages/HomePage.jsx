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
    setIsLoading(false);
  }, []);

  return (
    <div className="HomePage">
      <h1 className="header">
        {language === "en-US" ? englishContent.homePage[0] : germanContent.homePage[0]}
      </h1>
      <br />
      {isLoggedIn && (
        <>
          <h3 className="greeting">
            {language === "en-US" ? englishContent.homePage[1] : germanContent.homePage[1]}, <span>{user.username}</span>. {language === "en-US" ? englishContent.homePage[2] : germanContent.homePage[2]}
          </h3>
        </>
      )}
      <br />
      <h4>
        {language === "en-US" ? englishContent.homePage[3] : germanContent.homePage[3]}
      </h4>
      {!isLoggedIn && (
        <>
          <p><Link to={"/login"}>{language === "en-US" ? englishContent.homePage[4] : germanContent.homePage[4]}</Link> {language === "en-US" ? englishContent.homePage[5] : germanContent.homePage[5]}.</p>
          <p>
            {language === "en-US" ? englishContent.homePage[6] : germanContent.homePage[6]} <Link to={"/signup"}>{language === "en-US" ? englishContent.homePage[7] : germanContent.homePage[7]}</Link>
          </p>
        </>
      )}
      <br />
      <br />
      {isLoading && <h1>{language === "en-US" ? englishContent.homePage[8] : germanContent.homePage[8]}</h1>}
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
