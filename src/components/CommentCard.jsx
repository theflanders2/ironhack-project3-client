import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

function CommentCard({ author, content }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`CommentCard card ${theme}`}>
      <br />
      <h4>{author.username}</h4>
      <p>{content}</p>
    </div>
  );
}

export default CommentCard;
