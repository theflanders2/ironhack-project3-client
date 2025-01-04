import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function UserCommentCard({ _id, game, content, createdAt }) {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const pageContent = language === "en-US" ? englishContent.userCommentCard : germanContent.userCommentCard;

  return (
    <div className={`UserCommentCard card ${theme}`}>
      <Link to={`/comments/edit/${_id}`}>
        <button className={`${theme}`}>{pageContent[0]}</button>
      </Link>
      <br />
      <br />
      <Link to={`/games/${game._id}`}>
        <h4>{game.name}</h4>
      </Link>
      <p className="Content-UserCommentCard">{content}</p>
      <p>{createdAt}</p>
    </div>
  );
}

export default UserCommentCard;
