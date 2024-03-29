import { Link } from "react-router-dom";

function UserCommentCard({ _id, game, content, createdAt }) {
  return (
    <div className="UserCommentCard card">
      <Link to={`/comments/edit/${_id}`}>
        <button>Edit Comment</button>
      </Link>
      <br />
      <br />
      <Link to={`/games/${game._id}`}>
        <h4>{game.name}</h4>
      </Link>
      <p className="Content-UserCommentCard">{content}</p>
      <p>{createdAt}</p>
    </div>
  );
}

export default UserCommentCard;
