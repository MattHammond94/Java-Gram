import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useState, useEffect } from 'react';
import { useAddLikeToPostMutation } from "../slices/postApiSlice";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

// Icons:
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

const Post = ({ post }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [likeContent, setLikeContent] = useState(null);
  const [like] = useAddLikeToPostMutation();
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    console.log(post.likedBy.some(user => user._id === userInfo._id));
    setUserLiked(post.likedBy.some(user => user._id === userInfo._id));

    let likeStatement = null;

    if (post.likedBy.length < 1) {
      likeStatement = <p className='postLikeCount'>0 likes</p>;
    } else if (post.likedBy.length === 1) {
      likeStatement = <p className='postLikeCount'>{post.likedBy[0].username} likes this</p>;
    } else if (post.likedBy.length === 2) {
      likeStatement = <p className='postLikeCount'>{post.likedBy[0].username} and {post.likedBy.length - 1} other like this</p>
    } else {
      likeStatement = <p className='postLikeCount'>{post.likedBy[0].username} and {post.likedBy.length - 1} others like this</p>
    }
      setLikeContent(likeStatement);
  }, [post.likedBy, userInfo._id]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/user/${post.user.username}`)
  }

  const handleLike = async () => {
    const updatedPost = await like({ id: post._id });
    console.log(updatedPost)
    let likeStatement = null;

    setUserLiked(prevUserLiked => !prevUserLiked);

    // if (updatedPost.likedBy) {
    //   setUserLiked(updatedPost.likedBy.some(user => user._id === userInfo._id));
    // }

    if (updatedPost.data.likedBy.length < 1) {
      likeStatement = <p className='postLikeCount'>0 likes</p>;
    } else if (updatedPost.data.likedBy.length === 1) {
      likeStatement = <p className='postLikeCount'>{updatedPost.data.likedBy[0].username} likes this</p>
    } else if (updatedPost.data.likedBy.length === 2) {
      likeStatement = <p className='postLikeCount'>{updatedPost.data.likedBy[0].username} and 1 other likes this</p>
    } else {
      likeStatement = <p className='postLikeCount'>{updatedPost.data.likedBy[0].username} and {updatedPost.data.likedBy.length - 1} others like this</p>
    }
    
    setLikeContent(likeStatement);
  }

  return (
    <div className="postContainer" key={post._id}>
      <div className="postHeaderContainer">
        <img onClick={ handleNavigate } className="profilePicture" src={ post.user.profilePicture } alt="Users personal profile picture" />
        <p className='postUsername' onClick={ handleNavigate }>{ post.user.username }</p>
        <p className='postDate'>{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }</p>
      </div>
      <div className="postImgContainer">
        <img src={post.image} alt={post.caption}/>
      </div>
      <div className="postFooterContainer">
        { likeContent }
        <p className='postUsernameLink' onClick={ handleNavigate }>{ post.user.username }</p>
        <div className='postLine'></div>
        <p className='postCaption'>{ post.caption }</p>
      </div>
      <div className='likeIconContainer' onClick={ handleLike }>
        { userLiked ? <HiHeart className="heartIcon"/> : <HiOutlineHeart className="heartIcon" /> }
      </div>
    </div>
  )
}

export default Post