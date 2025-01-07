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

  // Map language to corresponding content dynamically
  const pageContent = language === "en-US" ? englishContent.addGame : germanContent.addGame;

  const handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadedCoverArt = new FormData();
    uploadedCoverArt.append("coverArtUrl", e.target.files[0]);
    // coverArtUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new game in '/api/games' POST route
    try {
      setIsUploadingCoverArt(true)
      const response = await gamesService.uploadCoverArt(uploadedCoverArt)
      setCoverArtUrl(response.data.coverArtUrl);
      setIsUploadingCoverArt(false)
    } catch (error) {
      console.log("Error while uploading the file: ", error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, releaseYear, genre, platform, coverArtUrl };
    try {
      await gamesService.addGame(requestBody)
      // Refresh the state
      setName("");
      setReleaseYear(0);
      setGenre("");
      setPlatform("");
      setCoverArtUrl("");

      refreshGames();
    } catch (error){
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className={`AddGame ${theme}`}>
      <h3>{pageContent[0]}</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">{pageContent[1]}:</label>
        <input
          type="text"
          name="name"
          value={name}
          id="name"
          placeholder="ex. Mortal Kombat, Apex Legends"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="releaseYear">
          {pageContent[2]}:
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
          {pageContent[3]}:
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
          {pageContent[4]}:
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
        {pageContent[5]}:
        </label>
        <input className="coverArtUrl" type="file" name="coverArtUrl" id="coverArtUrl" onChange={(e) => handleFileUpload(e)} />

        {!isUploadingCoverArt ? (
          <button className={`${theme}`} type="submit">
            {pageContent[0]}
          </button>
        ) : (
          <button className={`${theme}`} type="submit" disabled>
            {pageContent[6]}:
          </button>)}
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddGame;

