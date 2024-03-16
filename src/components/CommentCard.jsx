// Deconstructing props object directly in the parentheses of the function
function CommentCard(props) {
  return (
    <div className="CommentCard card">
      <h4>{props.author}</h4>
      <p>{props.content}</p>
    </div>
  );
}

export default CommentCard;
