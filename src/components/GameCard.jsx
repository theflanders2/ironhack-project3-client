import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

import { Link } from "react-router-dom";

function GameCard({ _id, name, genre, platform, releaseYear, coverArtUrl }) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`GameCard card ${theme}`}>
      <Link to={`/games/${_id}`}>
        <img src={coverArtUrl} />
        <h4>{name}</h4>
        <h5>
        {platform.join(', ')} | {genre.join(', ')} | {releaseYear}
        </h5>
      </Link>
    </div>
  );
}

export default GameCard;
