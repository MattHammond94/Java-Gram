import { useState } from "react";
import DeleteCommentButton from './DeleteCommentButton';
import UpdateCommentButton from "./UpdateCommentButton";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

//Icons:
import { FaPencilAlt } from "react-icons/fa";

const Comment = ({ comment, loggedInUser, handleRemoveComment, handleUpdateComment, refetch }) => {
  const[updateCaptionStatus, setUpdateCaptionStatus] = useState(false);
  const[updateValue, setUpdateValue] = useState(comment.caption);
  const[updateError, setUpdateError] = useState('');

  return (
    <div className="commentContainer">
      <div className="commentHeaderContainer">
        <img src={comment.user.profilePicture} alt="Users profile picture" />
        <a href={`/user/${comment.user.username}`}>{comment.user.username}</a>
        <p>{ formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }</p>
      </div>
      <div className="commentCaptionContainer">
        { updateCaptionStatus ? 
          (<form>
            <textarea name="updateComment" value={ updateValue } onChange={ (e) => setUpdateValue(e.target.value) }/>
            <UpdateCommentButton commentId={ comment._id } caption={ updateValue } setUpdateError={ setUpdateError } setUpdateCaptionStatus={ setUpdateCaptionStatus }  handleUpdateComment={ handleUpdateComment } refetch={ refetch }/>
          </form>)
          : 
          (<p>{ comment.caption }</p>)}
        { loggedInUser === comment.user.username ? 
          (<div className="commentIconsContainer">
            <DeleteCommentButton commentId={ comment._id } handleRemoveComment={ handleRemoveComment } refetch={ refetch }/>
            <FaPencilAlt className="commentIcons" onClick={ () => setUpdateCaptionStatus(prevUpdateCaptionStatus => !prevUpdateCaptionStatus) }/>
          </div>) 
          : 
          null 
        }
      </div>
      { updateError && <p className="updateError">{ updateError }</p> }
      <div className="commentDivider"></div>
    </div>
  )
}

export default Comment