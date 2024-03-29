import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usersService from "../services/users.service";
import UserCommentCard from "../components/UserCommentCard";
import GameCard from "../components/GameCard";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [areCommentsShowing, setAreCommentsShowing] = useState(false);
  const [areGamesContributedShowing, setAreGamesContributedShowing] = useState(false);
  const [areGamesPlayedShowing, setAreGamesPlayedShowing] = useState(false);
  const [areGamesCurrentlyPlayingShowing, setAreGamesCurrentlyPlayingShowing] = useState(false);
  const [isWishlistShowing, setIsWishlistShowing] = useState(false);
  const { userId } = useParams();

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
      <h1>Profile Page</h1>
      <Link to={`/profile/edit/${userId}`}>
        <button>Edit Email Address</button>
      </Link>
      {user && (
        <>
          <img src={user.user.avatarUrl} />
          <h1>{user.user.username}</h1>
          <ul>
            <li>Email: {user.user.email}</li>
            {/* <li>Prestige Level: {user.user.prestigeLevel}</li> */}
          </ul>
        </>
      )}
      <br/>
      <br/>
      <button onClick={() => {setAreCommentsShowing(!areCommentsShowing)} }>{areCommentsShowing ? "Hide Comments" : "Show Comments"}</button>
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
      <button onClick={() => {setAreGamesContributedShowing(!areGamesContributedShowing)} }>{areGamesContributedShowing ? "Hide Games Contributed" : "Show Games Contributed"}</button>
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
      <button onClick={() => {setAreGamesPlayedShowing(!areGamesPlayedShowing)} }>{areGamesPlayedShowing ? "Hide Games Played" : "Show Games Played"}</button>
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
      <button onClick={() => {setAreGamesCurrentlyPlayingShowing(!areGamesCurrentlyPlayingShowing)} }>{areGamesCurrentlyPlayingShowing ? "Hide Games Currently Playing" : "Show Games Currently Playing"}</button>
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
      <button onClick={() => {setIsWishlistShowing(!isWishlistShowing)} }>{isWishlistShowing ? "Hide Wishlist" : "Show Wishlist"}</button>
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
