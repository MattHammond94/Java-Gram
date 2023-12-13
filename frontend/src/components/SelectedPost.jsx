import { useSelector } from "react-redux";
import { useState } from "react";
import { useDeletePostMutation, useRemovePostImageFromCloudMutation, useGetAllPostsQuery } from "../slices/postApiSlice";
import Loader from "./Loader";
import AddCommentButton from "./AddCommentButton";
import Comment from "./Comment";

// Icon:
import { IoTrashSharp } from "react-icons/io5";

const SelectedPost = ({ post, username, setModalContent, setModalOpenStatus, setContentLoading, refetch }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [deletePost, { isLoading: deletePostLoading }] = useDeletePostMutation();
  const [deletePostImageFromCloud, { isLoading: deleteFromCloudLoading }] = useRemovePostImageFromCloudMutation();
  const { refetch: refetchAllPosts } = useGetAllPostsQuery();
  const [commentValue, setCommentValue] = useState('');
  const [commentError, setCommentError] = useState('');

  const handleDeletePost = async (post) => {
    const deletedPost = await deletePost(`${post._id}`)

    setContentLoading(true);

    if (!deletedPost) {
      return setModalContent(
        <div className="modalError">
          <h1>Error</h1>
          <p>Unable to delete this post at this moment in time</p>
          <p>Please try again later</p>
        </div>
      )
    }

    await deletePostImageFromCloud({ image: post.imageCloudId})

    await refetch();

    if(deletePostLoading || deleteFromCloudLoading) {
      setModalContent(
        <div className="deletePostContent">
          <Loader />
        </div>
      )
    } else {
      setModalContent(
        <div className="deletePostContent">
          <h1>This post was successfully deleted</h1>
        </div>
      )
    }

    await refetchAllPosts();

    setContentLoading(false);

    setTimeout(() => {
      setModalOpenStatus(false);
    }, 1500);
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
            { userInfo.username === username ? <IoTrashSharp className="bin" onClick={ () => handleDeletePost(post) }/> : null }
          </div>
          <p className="selectedPostCaption">{ post.caption }</p>
          <p className="selectedPostComments">Comments:</p>
          <div className="selectedPostLine"></div>
          <div className="commentsContainer">
            { post.comments && post.comments.length > 0 ? (post.comments.map((comment) => (
              <Comment key={comment._id}  comment={ comment }/>
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
            <AddCommentButton selectedPost={ post } caption={ commentValue } setCommentError={ setCommentError } />
          </form>
          { commentError && <p className='commentError'>{commentError}</p> }
        </div>
      </div>
    </>
  )
}

export default SelectedPost