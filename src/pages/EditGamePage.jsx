import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gamesService from "../services/games.service";

function EditGamePage() {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [coverArtUrl, setCoverArtUrl] = useState("");

  const { gameId } = useParams();
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadedCoverArt = new FormData();

    // coverArtUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new game in '/api/games' POST route
    uploadedCoverArt.append("coverArtUrl", e.target.files[0]);

    gamesService.uploadCoverArt(uploadedCoverArt)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "coverArtUrl" which we can use to update the state
        setCoverArtUrl(response.data.coverArtUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };
  
  useEffect(() => {
    gamesService.getGame(gameId)
      .then((response) => {
        // Update the state with the game data coming from the response.
        // This way the inputs show the actual current details of the game
        setName(response.data.name);
        setReleaseYear(response.data.releaseYear);
        setGenre(response.data.genre);
        setPlatform(response.data.platform);
        setCoverArtUrl(response.data.coverArtUrl);
      })
      .catch((error) => console.log(error));
  }, [gameId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, releaseYear, genre, platform, coverArtUrl };

    // Make an axios PUT request to the API to update game
    gamesService.updateGame(gameId, requestBody)
      .then(() => navigate(`/games/${gameId}`));
    // Once the request is resolved successfully and the game's details
    // are updated, navigate back to the details page
  };

  const deleteGame = () => {
    // Make an axios DELETE request to delete the game
    gamesService.deleteGame(gameId)
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

        <label>Cover Art:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />

        <button type="submit">Confirm Changes</button>
      </form>

      <button onClick={deleteGame}>Delete Game</button>
    </div>
  );
}

export default EditGamePage;
