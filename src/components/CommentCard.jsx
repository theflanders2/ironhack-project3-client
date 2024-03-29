

function CommentCard({ author, content }) {
  return (
    <div className="CommentCard card">
      <br />
      <h4>{author.username}</h4>
      <p>{content}</p>
    </div>
  );
}

export default CommentCard;
