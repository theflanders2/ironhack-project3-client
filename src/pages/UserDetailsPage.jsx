import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import usersService from "../services/users.service";
import UserCommentCard from "../components/UserCommentCard";
import GameCard from "../components/GameCard";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { language } = useContext(LanguageContext);

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
    <div className="ProfilePage">
      <h1>
        {language === "en-US" ? englishContent.userDetailsPage[0] : germanContent.userDetailsPage[0]}
      </h1>
      {user && (
        <>
          <img src={user.user.avatarUrl} />
          <h1>{user.user.username}</h1>
          <ul>
            <li>
              {language === "en-US" ? englishContent.userDetailsPage[1] : germanContent.userDetailsPage[1]}: {user.user.email}
            </li>
            <li>
              {language === "en-US" ? englishContent.userDetailsPage[2] : germanContent.userDetailsPage[2]}: {user.user.prestigeLevel}
            </li>
          </ul>
        </>
      )}
      <h2>
        {language === "en-US" ? englishContent.userDetailsPage[3] : germanContent.userDetailsPage[3]}
      </h2>
      {user &&
        user.user.comments.map((comment) => (
          <UserCommentCard key={comment._id} {...comment} />
        ))}
      <h2>
        {language === "en-US" ? englishContent.userDetailsPage[4] : germanContent.userDetailsPage[4]}
      </h2>
      {user &&
        user.user.gamesContributed.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
      <h2>
        {language === "en-US" ? englishContent.userDetailsPage[5] : germanContent.userDetailsPage[5]}
      </h2>
      {user &&
        user.user.gamesPlayed.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
      <h2>
        {language === "en-US" ? englishContent.userDetailsPage[6] : germanContent.userDetailsPage[6]}
      </h2>
      {user &&
        user.user.gamesCurrentlyPlaying.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
      <h2>
        {language === "en-US" ? englishContent.userDetailsPage[7] : germanContent.userDetailsPage[7]}
      </h2>
      {user &&
        user.user.wishlist.map((game) => (
          <GameCard key={game._id} {...game} />
        ))}
    </div>
  );
}

export default UserDetailsPage;
