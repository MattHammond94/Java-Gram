import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useState } from 'react';
import { useAddLikeToPostMutation } from "../slices/postApiSlice";
import { useNavigate } from 'react-router-dom';

// Icons:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Post = ({ post }) => {
  const[likeCount, setLikeCount] = useState(post.likedBy.length);
  const [like] = useAddLikeToPostMutation();

  const navigate = useNavigate();

  const handleNavigate = () => {
    console.log(post.user.username);
    navigate(`/user/${post.user.username}`)
  }

  const handleLike = async () => {
    const updatedPost = await like({ id: post._id });
    setLikeCount(updatedPost.data.likedBy.length);
  }

  return (
    <div className="postContainer" key={post._id}>
      <div className="postHeaderContainer">
        <img onClick={ handleNavigate } className="profilePicture" src="/Placeholder.jpg" alt="Users personal profile picture" />
        <p onClick={ handleNavigate }>{ post.user.username }</p>
        <p>{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }</p>
      </div>
      <div className="postImgContainer">
        <img src={post.image} alt={post.caption}/>
      </div>
      <div className="postFooterContainer">
        <p>{ `${likeCount} likes` }</p>
        <p  onClick={ handleNavigate }>{ post.user.username }</p>
        <p>{ post.caption }</p>
      </div>
      <div className='likeIconContainer' onClick={ handleLike }>
        <FontAwesomeIcon icon={faHeart} className="heartIcon" />
      </div>
    </div>
  )
}

export default Post