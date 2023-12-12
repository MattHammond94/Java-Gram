import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Comment = ({ comment }) => {
  return (
    <div className="commentContainer">
      <div className="commentHeaderContainer">
        <img src={comment.user.profilePicture} alt="Users profile picture" />
        <h1>{comment.user.username}</h1>
      </div>
      <div className="commentCaptionContainer">
        { comment.caption }
      </div>
      <div className="commentDateContainer">
        { formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }
      </div>
    </div>
  )
}

export default Comment