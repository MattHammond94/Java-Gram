import DeleteCommentButton from './DeleteCommentButton';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Comment = ({ comment, loggedInUser, handleRemoveComment, refetch }) => {
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
      { loggedInUser === comment.user.username ? 
        (<div>
          <DeleteCommentButton commentId={ comment._id } handleRemoveComment={ handleRemoveComment } refetch={ refetch }/>
        </div>) 
        : 
        null 
      }
      <div className="commentDivider"></div>
    </div>
  )
}

export default Comment