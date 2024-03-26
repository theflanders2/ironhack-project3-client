import { useState } from "react";
import gamesService from "../services/games.service";

function AddGame({ refreshGames }) {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [coverArtUrl, setCoverArtUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadedCoverArt = new FormData();

    // coverArtUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new game in '/api/games' POST route
    uploadedCoverArt.append("coverArtUrl", e.target.files[0]);

    gamesService.uploadCoverArt(uploadedCoverArt)
      .then((response) => {
        console.log("response.data.coverArtUrl is: ", response.data.coverArtUrl);
        // response carries "coverArtUrl" which we can use to update the state
        setCoverArtUrl(response.data.coverArtUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, releaseYear, genre, platform, coverArtUrl };

    // Make an axios request to the API
    // If the POST request is successful, refresh the states and GamesListPage
    // If the request resolves with an error, set the error message in the state
    gamesService.addGame(requestBody)
      .then(() => {
        // Refresh the state
        setName("");
        setReleaseYear(0);
        setGenre("");
        setPlatform("");
        setCoverArtUrl("");

        refreshGames();
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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          id="name"
          placeholder="ex. Mortal Kombat, Apex Legends"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="releaseYear">Release Year:</label>
        <input
          type="number"
          name="releaseYear"
          value={releaseYear}
          id="releaseYear"
          min={1995}
          max={2030}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          name="genre"
          id="genre"
          value={genre}
          placeholder="ex. First-person shooter, Action-Adventure"
          onChange={(e) => setGenre(e.target.value)}
        />

        <label htmlFor="platform">Platform:</label>
        <select
          name="platform"
          id="platform"
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

        <label htmlFor="coverArtUrl">Cover Art:</label>
        <input type="file" name="coverArtUrl" id="coverArtUrl" onChange={(e) => handleFileUpload(e)} />

        <button type="submit">Add Game</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddGame;
