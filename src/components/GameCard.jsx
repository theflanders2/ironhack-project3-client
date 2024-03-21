import { Link } from "react-router-dom";

function GameCard({ _id, name, genre, platform, releaseYear }) {
  return (
    <div className="GameCard card">
      <Link to={`/games/${_id}`}>
        <h3>{name}</h3>
        <h4>
          {genre}, {platform}, {releaseYear}
        </h4>
      </Link>
    </div>
  );
}

export default GameCard;
