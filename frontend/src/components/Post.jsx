import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useState, useEffect } from 'react';
import { useAddLikeToPostMutation } from "../slices/postApiSlice";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

// Icons:
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

const Post = ({ post }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const[likeCount, setLikeCount] = useState(post.likedBy.length - 1);
  const [likeContent, setLikeContent] = useState('')
  const [like] = useAddLikeToPostMutation();

  useEffect(() => {
    if (post.likedBy.length < 1) {
      setLikeContent('0 likes');
    } else if (post.likedBy.length === 1) {
      setLikeContent(`${post.likedBy[0].username} likes this`);
    } else if (post.likedBy.length === 2) {
      setLikeContent(`${post.likedBy[0].username} and 1 other like this`);
    } else {
      setLikeContent(`${post.likedBy[0].username} and ${likeCount} others like this`);
    }
  }, [post.likedBy, likeCount]);

  // const[userLiked, setUserLiked] = useState(false);
  
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/user/${post.user.username}`)
  }

  const handleLike = async () => {
    const updatedPost = await like({ id: post._id });
    setLikeCount(updatedPost.data.likedBy.length - 1)

    // console.log(post.likedBy)
    // console.log(userInfo._id)

    // console.log(post.likedBy[0].username)
    // console.log(post.likedBy[0]._id)

    // console.log(post.likedBy[0] === userInfo._id)

    // console.log(post.likedBy.some((user) => {
    //   user._id === userInfo._id
    // }))
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
        <p className='postLikeCount'>{ likeContent }</p>
        <p className='postUsernameLink' onClick={ handleNavigate }>{ post.user.username }</p>
        <div className='postLine'></div>
        <p className='postCaption'>{ post.caption }</p>
      </div>
      <div className='likeIconContainer' onClick={ handleLike }>
        {/* liked ?  */}
        <HiOutlineHeart className="heartIcon" /> 
        {/* : <HiHeart className="heartIcon"/> */}
      </div>
    </div>
  )
}

export default Post