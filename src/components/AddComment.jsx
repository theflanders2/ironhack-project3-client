import { useState } from "react";
import commentsService from "../services/comments.service";

function AddComment({ gameId, refreshGame}) {
  const [content, setContent] = useState("");

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
    <div className="AddComment">
      <br />
      <h3>Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <label>Comment:</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddComment;
