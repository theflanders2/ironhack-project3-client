import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import commentsService from "../services/comments.service";

function EditCommentPage() {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

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
      <h3>Edit Comment</h3>
      <Link to={`/profile/${author}`}>
        <button>Back to Profile</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <label>Comment:</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Confirm Changes</button>
        <button onClick={deleteComment}>Delete Comment</button>


      </form>
    </div>
  );
}

export default EditCommentPage;
