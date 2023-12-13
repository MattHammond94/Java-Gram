import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Comment = ({ comment }) => {
  return (
    <div className="commentContainer">
      <div className="commentHeaderContainer">
        <img src={comment.user.profilePicture} alt="Users profile picture" />
        <a href={`/user/${comment.user.username}`}>{comment.user.username}</a>
        <p>{ formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }</p>
      </div>
      <div className="commentCaptionContainer">
        <p>{ comment.caption }</p>
      </div>
      <div className="commentDivider"></div>
    </div>
  )
}

export default Comment