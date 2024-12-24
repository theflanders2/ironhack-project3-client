import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gamesService from "../services/games.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";
import SelectGenre from "../components/SelectGenre";
import SelectPlatform from "../components/SelectPlatform";

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

  // Map language to corresponding content dynamically
  const pageContent = language === "en-US" ? englishContent.editGamePage : germanContent.editGamePage;

  // Handle file upload
  const handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadedCoverArt = new FormData();
    uploadedCoverArt.append("coverArtUrl", e.target.files[0]);
    // coverArtUrl => this name has to be the same as in the model
    try {
      setIsUploadingCoverArt(true)
      const response = await gamesService.uploadCoverArt(uploadedCoverArt)
      setCoverArtUrl(response.data.coverArtUrl);
      setIsUploadingCoverArt(false)
    } catch (error) {
      console.log("Error while uploading the file: ", error)
    }
  };
  
  // Fetch game data
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response  = await gamesService.getGame(gameId);
        setName(response.data.name);
        setReleaseYear(response.data.releaseYear);
        setGenre(response.data.genre);
        setPlatform(response.data.platform);
        setCoverArtUrl(response.data.coverArtUrl);
      } catch (error) {
        console.log("Error fetching game data:", error);
      }
    };
    fetchGame();
  }, [gameId]);

  // Handle for submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, releaseYear, genre, platform, coverArtUrl };
    try {
      await gamesService.updateGame(gameId, requestBody)
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.log("Error updating game:", error);
    }
  };

  return (
    <div className={`EditGamePage ${theme}`}>
      <h3>{pageContent[0]}</h3>
      <Link to={`/games/${gameId}`}>
        <button className={`${theme}`}>{pageContent[1]}</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <label>{pageContent[2]}:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>{pageContent[3]}:</label>
        <input
          type="number"
          name="releaseYear"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <label>{pageContent[4]}:</label>
        <select
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <SelectGenre />
        </select>

        <label>{pageContent[5]}:</label>
        <select
          name="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <SelectPlatform />
        </select>

        <label htmlFor="coverArtUrl">{pageContent[6]}:</label>
        <input className="coverArtUrl" type="file" name="coverArtUrl" id="coverArtUrl" onChange={(e) => handleFileUpload(e)} />

        {!isUploadingCoverArt ? (
          <button className={`${theme}`} type="submit">
          {pageContent[7]}
          </button>
          ) : (
          <button className={`${theme}`} type="submit" disabled>
          {pageContent[8]}
          </button>)}
      </form>
    </div>
  );
}

export default EditGamePage;
