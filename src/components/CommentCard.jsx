import { Link } from "react-router-dom";

function CommentCard(props) {
  return (
    <div className="CommentCard card">
      <Link to={`/profile/${props.author._id}`} ><h4>User: {props.author.username}</h4></Link>
      <p>{props.content}</p>
    </div>
  );
}

export default CommentCard;
