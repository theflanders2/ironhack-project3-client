import { Link } from "react-router-dom";

function CommentCard({ author, content }) {
  return (
    <div className="CommentCard card">
      <Link to={`/users/${author._id}`}>
        <h4>User: {author.username}</h4>
      </Link>
      <p>{content}</p>
    </div>
  );
}

export default CommentCard;
