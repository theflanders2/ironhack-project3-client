import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usersService from "../services/users.service";
import UserCommentCard from "../components/UserCommentCard";
import GameCard from "../components/GameCard";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const getUser = () => {
    usersService
      .getUser(userId)
      .then((foundUser) => setUser(foundUser.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="UserProfile">
      <h1>Profile Page</h1>
      <Link to={`/profile/edit/${userId}`}>
        <button>Edit Profile</button>
      </Link>
      {user && (
        <>
          <img src={user.user.avatarUrl} />
          <h1>{user.user.username}</h1>
          <ul>
            <li>Email: {user.user.email}</li>
            <li>Prestige Level: {user.user.prestigeLevel}</li>
          </ul>
        </>
      )}
      <h2>Comments</h2>
      {user &&
        user.user.comments.map((comment) => (
          <UserCommentCard key={comment._id} {...comment} />
        ))}
      <h2>Games Contributed</h2>
      {user &&
        user.user.gamesContributed.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
      <h2>Games Played</h2>
      {user &&
        user.user.gamesPlayed.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
      <h2>Games Currently Playing</h2>
      {user &&
        user.user.gamesCurrentlyPlaying.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
      <h2>Wishlist</h2>
      {user &&
        user.user.wishlist.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
    </div>
  );
}

export default ProfilePage;
