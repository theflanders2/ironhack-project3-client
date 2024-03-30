import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

function UserCommentCard({ _id, game, content, createdAt }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`UserCommentCard card ${theme}`}>
      <Link to={`/comments/edit/${_id}`}>
        <button className={`${theme}`}>Edit Comment</button>
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
