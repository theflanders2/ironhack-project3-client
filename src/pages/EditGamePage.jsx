import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_DEPLOYMENT_SERVER_URL;

function EditGamePage() {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");

  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/games/${gameId}`)
      .then((foundGame) => {
        // Update the state with the game data coming from the response.
        // This way the inputs show the actual current details of the game
        setName(foundGame.name);
        setReleaseYear(foundGame.releaseYear);
        setGenre(foundGame.genre);
        setPlatform(foundGame.platform);
      })
      .catch((error) => console.log(error));
  }, [gameId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, releaseYear, genre, platform };

    // Make an axios PUT request to the API to update game
    axios
      .put(`${API_URL}/api/games/${gameId}`, requestBody)
      .then(() => navigate(`/games/${gameId}`));
    // Once the request is resolved successfully and the game's details
    // are updated, navigate back to the details page
  };

  const deleteGame = () => {
    // Make an axios DELETE request to delete the game
    axios
      .delete(`${API_URL}/api/games/${gameId}`)
      .then(() => navigate("/games"))
      // Once the delete request is resolved successfully
      // navigate back to the list of games.
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditGamePage">
      <h3>Edit Game</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Release Year:</label>
        <input
          type="number"
          name="releaseYear"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <label>Platform:</label>
        <select
          name="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option></option>
          <option>PSOne</option>
          <option>PS2</option>
          <option>PS3</option>
          <option>PS4</option>
          <option>PS5</option>
        </select>

        <input type="submit" value="Accept Changes" />
      </form>

      <button onClick={deleteGame}>Delete Game</button>
    </div>
  );
}

export default EditGamePage;
