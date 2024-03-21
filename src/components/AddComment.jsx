import { useState } from "react";
import commentsService from "../services/comments.service";

function AddComment(props) {
  //   const [game, setGame] = useState("");
  //   const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Game id is needed when creating a new comment
    const { gameId } = props;
    // Create an object representing the body of the POST request
    // Author will be retrieved from payload
    const requestBody = { content, gameId };

    commentsService.createComment(requestBody)
      .then((newComment) => {
        // Reset the state to clear the inputs
        console.log("newComment", newComment);
        setContent("");

        // Invoke the callback function coming through the props
        // from the GameDetailsPage, to refresh the game details
        props.refreshGame();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddComment">
      <h3>Add Comment</h3>

      <form onSubmit={handleSubmit}>
        <label>Comment:</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default AddComment;
