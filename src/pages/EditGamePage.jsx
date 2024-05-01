import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gamesService from "../services/games.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function EditGamePage() {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [coverArtUrl, setCoverArtUrl] = useState("");
  const [isUploadingCoverArt, setIsUploadingCoverArt] = useState(false)
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const { gameId } = useParams();
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadedCoverArt = new FormData();

    // coverArtUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new game in '/api/games' POST route
    uploadedCoverArt.append("coverArtUrl", e.target.files[0]);

    try {
      setIsUploadingCoverArt(true)
      const response = await gamesService.uploadCoverArt(uploadedCoverArt)
      setCoverArtUrl(response.data.coverArtUrl);
      setIsUploadingCoverArt(false)
    } catch (error) {
      console.log("Error while uploading the file: ", error)
    }
      // .then((response) => {
      //   console.log("response.data.coverArtUrl is: ", response.data.coverArtUrl);
      //   // response carries "coverArtUrl" which we can use to update the state
      //   setCoverArtUrl(response.data.coverArtUrl);
      // })
      // .catch((err) => console.log("Error while uploading the file: ", err));
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

  // const deleteGame = () => {
  //   // Make an axios DELETE request to delete the game
  //   gamesService.deleteGame(gameId)
  //     .then(() => navigate("/games"))
  //     // Once the delete request is resolved successfully
  //     // navigate back to the list of games.
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className={`EditGamePage ${theme}`}>
      <h3>
        {language === "en-US" ? englishContent.editGamePage[0] : germanContent.editGamePage[0]}
      </h3>
      <Link to={`/games/${gameId}`}><button className={`${theme}`}>
        {language === "en-US" ? englishContent.editGamePage[1] : germanContent.editGamePage[1]}
      </button></Link>

      <form onSubmit={handleSubmit}>
        <label>
          {language === "en-US" ? englishContent.editGamePage[2] : germanContent.editGamePage[2]}:
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>
          {language === "en-US" ? englishContent.editGamePage[3] : germanContent.editGamePage[3]}:
        </label>
        <input
          type="number"
          name="releaseYear"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <label>
          {language === "en-US" ? englishContent.editGamePage[4] : germanContent.editGamePage[4]}:
        </label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <label>
          {language === "en-US" ? englishContent.editGamePage[5] : germanContent.editGamePage[5]}:
        </label>
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

        <label htmlFor="coverArtUrl">
          {language === "en-US" ? englishContent.editGamePage[6] : germanContent.editGamePage[6]}:
        </label>
        <input className="coverArtUrl" type="file" name="coverArtUrl" id="coverArtUrl" onChange={(e) => handleFileUpload(e)} />

        {!isUploadingCoverArt ? (
          <button className={`${theme}`} type="submit">
          {language === "en-US" ? englishContent.editGamePage[7] : germanContent.editGamePage[7]}
          </button>
          ) : (
          <button className={`${theme}`} type="submit" disabled>
          {language === "en-US" ? englishContent.editGamePage[8] : germanContent.editGamePage[8]}
          </button>)}

      </form>

      {/* <button className={`${theme}`} onClick={deleteGame}>Delete Game</button> */}
    </div>
  );
}

export default EditGamePage;
