import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_DEPLOYMENT_SERVER_URL;

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

    axios
      .post(`${API_URL}/api/comments`, requestBody)
      .then((newComment) => {
        // Reset the state to clear the inputs
        console.log('newComment', newComment);
        setContent("");
      
        // Invoke the callback function coming through the props
        // from the ProjectDetailsPage, to refresh the project details
        props.refreshProject();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddComment">
      <h3>Add Comment</h3>

      <form onSubmit={handleSubmit}>
        {/* <label>Game:</label>
        <input
          type="text"
          name="game"
          value={game}
          onChange={(e) => setGame(e.target.value)}
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        /> */}

        <label>Comment:</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddComment;
