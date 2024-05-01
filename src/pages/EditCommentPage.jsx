import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import commentsService from "../services/comments.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function EditCommentPage() {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const { commentId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    commentsService.getComment(commentId)
      .then((response) => {
        setContent(response.data.content)
        setAuthor(response.data.author)
        console.log(response.data)
      })
        // Update the state with the game data coming from the response.
        // This way the inputs show the actual current details of the game
      .catch((error) => console.log(error));
  }, [commentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { content };

    // Make an axios PUT request to the API to update game
    commentsService.updateComment(commentId, requestBody)
      .then(() => navigate(`/profile/${author}`));
    // Once the request is resolved successfully and the game's details
    // are updated, navigate back to the user's profile page
  };

  const deleteComment = () => {
    // Make an axios DELETE request to delete the game
    commentsService.deleteComment(commentId)
      .then(() => navigate(`/profile/${author}`))
      // Once the delete request is resolved successfully
      // navigate back to the user's profile page
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditCommentPage">
      <h3>
        {language === "en-US" ? englishContent.editCommentPage[0] : germanContent.editCommentPage[0]}
      </h3>
      <Link to={`/profile/${author}`}>
        <button className={`${theme}`}>
          {language === "en-US" ? englishContent.editCommentPage[1] : germanContent.editCommentPage[1]}
        </button>
      </Link>

      <form onSubmit={handleSubmit}>
        <label>
          {language === "en-US" ? englishContent.editCommentPage[2] : germanContent.editCommentPage[2]}:
        </label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className={`${theme}`} type="submit">
          {language === "en-US" ? englishContent.editCommentPage[3] : germanContent.editCommentPage[3]}
        </button>
        <button className={`${theme}`} onClick={deleteComment}>
          {language === "en-US" ? englishContent.editCommentPage[4] : germanContent.editCommentPage[4]}
        </button>


      </form>
    </div>
  );
}

export default EditCommentPage;
