import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_DEPLOYMENT_SERVER_URL;

function AddGame(props) {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, releaseYear, genre, platform };

    // Make an axios request to the API
    // If the POST request is successful, refresh the states and GamesListPage
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/api/games`, requestBody)
      .then(() => {
        // Refresh the state
        setName("");
        setReleaseYear(0);
        setGenre("");
        setPlatform("");

        props.refreshGames(); // Refresh the GamesListPage
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddGame">
      <h3>Add Game</h3>

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

        <button type="submit">Add Game</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddGame;
