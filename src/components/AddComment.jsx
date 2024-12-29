import { useState, useContext } from "react";
import commentsService from "../services/comments.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";


import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function AddComment({ gameId, refreshGame}) {
  const [content, setContent] = useState("");

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const pageContent = language === "en-US" ? englishContent.addCommentComponent : germanContent.addCommentComponent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    // Comment's author will be retrieved from payload on back end
    const requestBody = { content, gameId };
    try {
      await commentsService.createComment(requestBody)
      setContent("");
        
      refreshGame();
    } catch (error) {
      console.log("Error while adding comment:", error);
    }
  };

  return (
    <div className={`AddComment ${theme}`}>
      <br />
      <h3>{pageContent[0]}</h3>
      <form onSubmit={handleSubmit}>
        <label>{pageContent[1]}</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className={`${theme}`} type="submit">{pageContent[2]}</button>
      </form>
    </div>
  );
}

export default AddComment;
