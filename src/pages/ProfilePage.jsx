import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import usersService from "../services/users.service";
import UserCommentCard from "../components/UserCommentCard";
import GameCard from "../components/GameCard";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [areCommentsShowing, setAreCommentsShowing] = useState(false);
  const [areGamesContributedShowing, setAreGamesContributedShowing] = useState(false);
  const [areGamesPlayedShowing, setAreGamesPlayedShowing] = useState(false);
  const [areGamesCurrentlyPlayingShowing, setAreGamesCurrentlyPlayingShowing] = useState(false);
  const [isWishlistShowing, setIsWishlistShowing] = useState(false);
  const { userId } = useParams();
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const getUser = () => {
    usersService.getUser(userId)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="ProfilePage">
      <h1>
       {language === "en-US" ? englishContent.profilePage[0] : germanContent.profilePage[0]}
      </h1>
      <Link to={`/profile/edit/${userId}`}>
        <button className={`${theme}`}>
          {language === "en-US" ? englishContent.profilePage[1] : germanContent.profilePage[1]}
        </button>
      </Link>
      {user && (
        <>
          <img src={user.user.avatarUrl} />
          <h1>{user.user.username}</h1>
          <ul>
            <li>
              {language === "en-US" ? englishContent.profilePage[2] : germanContent.profilePage[2]}: {user.user.email}
            </li>
            {/* <li>Prestige Level: {user.user.prestigeLevel}</li> */}
          </ul>
        </>
      )}
      <br/>
      <br/>
      <button className={`${theme}`} onClick={() => {setAreCommentsShowing(!areCommentsShowing)} }>
      {areCommentsShowing && language === "en-US" ? englishContent.profilePage[3] : areCommentsShowing && language !== "en-US" ? germanContent.profilePage[3] : !areCommentsShowing && language === "en-US" ? englishContent.profilePage[4] : germanContent.profilePage[4]}
        </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && areCommentsShowing &&
          user.user.comments.map((comment) => (
            <UserCommentCard key={comment._id} {...comment} />
          ))}
        </li>
      </ul>
      <br />
      <br />
      <button className={`${theme}`} onClick={() => {setAreGamesContributedShowing(!areGamesContributedShowing)} }>
      {areGamesContributedShowing && language === "en-US" ? englishContent.profilePage[5] : areGamesContributedShowing && language !== "en-US" ? germanContent.profilePage[5] : !areGamesContributedShowing && language === "en-US" ? englishContent.profilePage[6] : germanContent.profilePage[6]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && areGamesContributedShowing &&
          user.user.gamesContributed.map((game) => (
            <GameCard key={game._id} {...game} />
          ))}
        </li>
      </ul>
      <br />
      <br />
      <button className={`${theme}`} onClick={() => {setAreGamesPlayedShowing(!areGamesPlayedShowing)} }>
      {areGamesPlayedShowing && language === "en-US" ? englishContent.profilePage[7] : areGamesPlayedShowing && language !== "en-US" ? germanContent.profilePage[7] : !areGamesPlayedShowing && language === "en-US" ? englishContent.profilePage[8] : germanContent.profilePage[8]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && areGamesPlayedShowing &&
          user.user.gamesPlayed.map((game) => (
            <GameCard key={game._id} {...game} />
          ))}
        </li>
      </ul>
      <br />
      <br />
      <button className={`${theme}`} onClick={() => {setAreGamesCurrentlyPlayingShowing(!areGamesCurrentlyPlayingShowing)} }>
      {areGamesCurrentlyPlayingShowing && language === "en-US" ? englishContent.profilePage[9] : areGamesCurrentlyPlayingShowing && language !== "en-US" ? germanContent.profilePage[9] : !areGamesCurrentlyPlayingShowing && language === "en-US" ? englishContent.profilePage[10] : germanContent.profilePage[10]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && areGamesCurrentlyPlayingShowing &&
          user.user.gamesCurrentlyPlaying.map((game) => (
            <GameCard key={game._id} {...game} />
          ))}
        </li>
      </ul>
      <br />
      <br />
      <button className={`${theme}`} onClick={() => {setIsWishlistShowing(!isWishlistShowing)} }>
      {isWishlistShowing && language === "en-US" ? englishContent.profilePage[11] : isWishlistShowing && language !== "en-US" ? germanContent.profilePage[11] : !isWishlistShowing && language === "en-US" ? englishContent.profilePage[12] : germanContent.profilePage[12]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && isWishlistShowing &&
          user.user.wishlist.map((game) => (
            <GameCard key={game._id} {...game} />
          ))}
        </li>
      </ul>
    </div>
  );
}

export default ProfilePage;
