import { Link } from "react-router-dom";

function GameCard(props) {
  return (
    <div className="GameCard card">
      <Link to={`/games/${props._id}`}>
        <h3>{props.name}</h3>
        <h4>
          {props.genre}, {props.platform}, {props.releaseYear}
        </h4>
      </Link>
    </div>
  );
}

export default GameCard;
