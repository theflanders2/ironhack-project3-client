import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";


import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function CommentCard({ author, content }) {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  return (
    <div className={`CommentCard card ${theme}`}>
      <br />
      <h4>{author.username}</h4>
      <p>{content}</p>
    </div>
  );
}

export default CommentCard;
