import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AddCommentButton from "./AddCommentButton";
import Comment from "./Comment";
import DeletePostButton from "./DeletePostButton";

const SelectedPost = ({ post: initialPost, username, setModalContent, setModalOpenStatus, setContentLoading, refetch }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [commentValue, setCommentValue] = useState('');
  const [commentError, setCommentError] = useState('');
  const [post, setPost] = useState(initialPost);

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  const handleUpdateComments = (newComment) => {
    try {
      const updatedPost = { ...post };
      const updatedComments = [...updatedPost.comments];
      updatedComments.push(newComment); 
      updatedPost.comments = updatedComments;
      setPost(updatedPost);
    } catch(err) {
      console.log(err);
      return setCommentError(err.message || err);
    }
  }

  const handleRemoveComment = (deletedCommentId) => {
    try {
      const updatedComments = post.comments.filter(comment => comment._id !== deletedCommentId.data);
      const updatedPost = { ...post, comments: updatedComments };
      setPost(updatedPost);
    } catch (err) {
      console.log(err);
      return setCommentError(`Unable to delete comment at this moment in time: ${err.message || err}`);
    }
  }

  return (
    <>
      <div className="selectedPostModal">
        <div className="selectedPostImageContainer">
          <img src={ post.image } />
        </div>
        <div className="selectedPostcontentContainer">
          <div className="selectedPostHeader">
            <p>{ post.user.username }</p>
            { userInfo.username === username ? <DeletePostButton post={ post } setModalContent={ setModalContent } setModalOpenStatus={ setModalOpenStatus } setContentLoading={ setContentLoading } refetch={ refetch } /> : null }
          </div>
          <p className="selectedPostCaption">{ post.caption }</p>
          <p className="selectedPostComments">Comments:</p>
          <div className="selectedPostLine"></div>
          <div className="commentsContainer">
            { post.comments && post.comments.length > 0 ? (post.comments.map((comment) => (
              <Comment key={comment._id} comment={ comment } loggedInUser={ userInfo.username } handleRemoveComment={ handleRemoveComment } refetch={ refetch }/>
              )))
              :
              (
                <div className="noCommentsContainer">
                  <p>0 comments</p>
                  <p>Be the first to comment on this post!</p>
                </div>
              )
            }
          </div>
          <div className="selectedPostLine"></div>
          <form className="selectedPostForm">
            <textarea name="comment" value={commentValue} onChange={ (e) => setCommentValue(e.target.value) }/>
            <AddCommentButton selectedPost={ post } caption={ commentValue } setCommentError={ setCommentError } refetch={ refetch } handleUpdateComments={ handleUpdateComments } setCommentValue={ setCommentValue } />
          </form>
          { commentError && <p className='commentError'>{commentError}</p> }
        </div>
      </div>
    </>
  )
}

export default SelectedPost