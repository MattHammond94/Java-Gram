import AddLikeButton from './AddLikeButton';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Post = ({ post }) => {

  return (
    <div className="postContainer" key={post._id}>
      <div className="postHeaderContainer">
        <img className="profilePicture" src="/Placeholder.jpg" alt="Users personal profile picture" />
        <a>{ post.user.username }</a>
        <p>{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }</p>
      </div>
      <div className="postImgContainer">
        <img src={post.image} alt={post.caption}/>
      </div>
      <div className="postFooterContainer">
        <a>{ post.user.username }</a>
        <p>{ post.caption }</p>
        <p>{ `${post.likedBy.length} likes` }</p>
        <AddLikeButton postId={post._id} />
      </div>
    </div>
  )
}

export default Post