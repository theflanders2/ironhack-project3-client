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

  const pageContent = language === "en-US" ? englishContent.editCommentPage : germanContent.editCommentPage;
  
  // Fetch comment data
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await commentsService.getComment(commentId);
        setContent(response.data.content)
        setAuthor(response.data.author)
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };
    fetchComment();
  }, [commentId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { content }; // Create an object representing the request body
    try {
      await commentsService.updateComment(commentId, requestBody);
      navigate(`/profile/${author}`);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // Handle delete action
  const deleteComment = async () => {
    try {
      await commentsService.deleteComment(commentId);
      navigate(`/profile/${author}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="EditCommentPage">
      <h3>{pageContent[0]}</h3>

      <Link to={`/profile/${author}`}>
        <button className={`${theme}`}>{pageContent[1]}</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <label>{pageContent[2]}:</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className={`${theme}`} type="submit">{pageContent[3]}</button>
        <button className={`${theme}`} type="button" onClick={deleteComment}>{pageContent[4]}</button>
      </form>
    </div>
  );
}

export default EditCommentPage;
