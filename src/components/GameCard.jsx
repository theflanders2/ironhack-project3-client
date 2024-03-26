import { Link } from "react-router-dom";

function GameCard({ _id, name, genre, platform, releaseYear, coverArtUrl }) {
  return (
    <div className="GameCard card">
      <Link to={`/games/${_id}`}>
        <img src={coverArtUrl} />
        <h3>{name}</h3>
        <h5>
        {platform} | {genre} | {releaseYear}
        </h5>
      </Link>
    </div>
  );
}

export default GameCard;
