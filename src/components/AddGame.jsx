import { useState, useContext } from "react";
import gamesService from "../services/games.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";
import SelectGenre from "./SelectGenre";
import SelectPlatform from "./SelectPlatform";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function AddGame({ refreshGames }) {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [coverArtUrl, setCoverArtUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isUploadingCoverArt, setIsUploadingCoverArt] = useState(false)
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

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
    <div className={`AddGame ${theme}`}>
      <h3>
        {language === "en-US" ? englishContent.addGame[0] : germanContent.addGame[0]}
      </h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
        {language === "en-US" ? englishContent.addGame[1] : germanContent.addGame[1]}:
        </label>
        <input
          type="text"
          name="name"
          value={name}
          id="name"
          placeholder="ex. Mortal Kombat, Apex Legends"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="releaseYear">
          {language === "en-US" ? englishContent.addGame[2] : germanContent.addGame[2]}:
        </label>
        <input
          type="number"
          name="releaseYear"
          value={releaseYear}
          id="releaseYear"
          min={1995}
          max={2040}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <label htmlFor="genre">
          {language === "en-US" ? englishContent.addGame[3] : germanContent.addGame[3]}:
        </label>
        <select
          name="genre"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <SelectGenre />
        </select>

        <label htmlFor="platform">
          {language === "en-US" ? englishContent.addGame[4] : germanContent.addGame[4]}:
        </label>
        <select
          name="platform"
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <SelectPlatform />
        </select>

        <label htmlFor="coverArtUrl">
        {language === "en-US" ? englishContent.addGame[5] : germanContent.addGame[5]}:
        </label>
        <input className="coverArtUrl" type="file" name="coverArtUrl" id="coverArtUrl" onChange={(e) => handleFileUpload(e)} />

        {!isUploadingCoverArt ? (
          <button className={`${theme}`} type="submit">
            {language === "en-US" ? englishContent.addGame[0] : germanContent.addGame[0]}
          </button>
        ) : (
          <button className={`${theme}`} type="submit" disabled>
            {language === "en-US" ? englishContent.addGame[6] : germanContent.addGame[6]}:
          </button>)}
        
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddGame;

