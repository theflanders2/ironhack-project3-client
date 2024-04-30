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



  const handleSubmit = (e) => {
    e.preventDefault();

    // Comment's author will be retrieved from payload on back end
    const requestBody = { content, gameId };

    commentsService.createComment(requestBody)
      .then(() => {
        // Reset the state to clear the inputs
        setContent("");
        
        refreshGame();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`AddComment ${theme}`}>
      <br />
      <h3>
      {language === "en-US" ? englishContent.addCommentComponent[0] : germanContent.addCommentComponent[0]}
      </h3>
      <form onSubmit={handleSubmit}>
        <label>
        {language === "en-US" ? englishContent.addCommentComponent[1] : germanContent.addCommentComponent[1]}
        </label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className={`${theme}`} type="submit">
        {language === "en-US" ? englishContent.addCommentComponent[2] : germanContent.addCommentComponent[2]}
        </button>
      </form>
    </div>
  );
}

export default AddComment;
