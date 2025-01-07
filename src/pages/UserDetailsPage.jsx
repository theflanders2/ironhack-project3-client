import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import usersService from "../services/users.service";
import UserCommentCard from "../components/UserCommentCard";
import GameCard from "../components/GameCard";
import { LanguageContext } from "../context/language.context";
import { ThemeContext } from "../context/theme.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const [areCommentsShowing, setAreCommentsShowing] = useState(false);
  const [areGamesContributedShowing, setAreGamesContributedShowing] = useState(false);
  const [areGamesPlayedShowing, setAreGamesPlayedShowing] = useState(false);
  const [areGamesCurrentlyPlayingShowing, setAreGamesCurrentlyPlayingShowing] = useState(false);
  const [isWishlistShowing, setIsWishlistShowing] = useState(false);

  const { userId } = useParams();

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Map language to corresponding content dynamically
  const pageContent = language === "en-US" ? englishContent.userDetailsPage : germanContent.userDetailsPage;

  // Fetch user
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await usersService.getUser(userId);
        setUser(response.data)
      } catch(error) {
        console.log("Error retrieving user", error)
      }
    };
    getUser();
  }, [userId]);

  return (
    <div className="ProfilePage">
      <h1>{pageContent[0]}</h1>
      <br />
      {user && (
        <>
          <h1>{user.user.username}</h1>
          <ul>
            <li>{pageContent[1]}: {user.user.email}</li>
          </ul>
        </>
      )}
      <br />
      <button className={`${theme}`} onClick={() => {setAreCommentsShowing(!areCommentsShowing)} }>
        {areCommentsShowing ? pageContent[3] : pageContent[4]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && areCommentsShowing && user.user.comments.map((comment) => (
            <UserCommentCard key={comment._id} {...comment} />
          ))}
        </li>
      </ul>
      <br />
      <br />
      <button className={`${theme}`} onClick={() => {setAreGamesContributedShowing(!areGamesContributedShowing)} }>
        {areGamesContributedShowing ? pageContent[5] : pageContent[6]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && areGamesContributedShowing && user.user.gamesContributed.map((game) => (
            <GameCard key={game._id} {...game} />
          ))}
        </li>
      </ul>
      <br />
      <br />
      <button className={`${theme}`} onClick={() => {setAreGamesPlayedShowing(!areGamesPlayedShowing)} }>
        {areGamesPlayedShowing ? pageContent[7] : pageContent[8]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && areGamesPlayedShowing && user.user.gamesPlayed.map((game) => (
            <GameCard key={game._id} {...game} />
          ))}
        </li>
      </ul>
      <br />
      <br />
      <button className={`${theme}`} onClick={() => {setAreGamesCurrentlyPlayingShowing(!areGamesCurrentlyPlayingShowing)} }>
        {areGamesCurrentlyPlayingShowing ? pageContent[9] : pageContent[10]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && areGamesCurrentlyPlayingShowing && user.user.gamesCurrentlyPlaying.map((game) => (
            <GameCard key={game._id} {...game} />
          ))}
        </li>
      </ul>
      <br />
      <br />
        <button className={`${theme}`} onClick={() => {setIsWishlistShowing(!isWishlistShowing)} }>
        {isWishlistShowing ? pageContent[11] : pageContent[12]}
      </button>
      <br />
      <br />
      <ul>
        <li className="AllUserStats-ProfilePage">
          {user && isWishlistShowing && user.user.wishlist.map((game) => (
            <GameCard key={game._id} {...game} />
          ))}
        </li>
      </ul>
    </div>
  );
}

export default UserDetailsPage;
