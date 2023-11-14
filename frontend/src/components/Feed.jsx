// import { useEffect, useState } from 'react';
import { useGetAllPostsQuery } from '../slices/postApiSlice';
import Loader from './Loader';
import AddLikeButton from './AddLikeButton';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Feed = () => {

  const { data, error, isLoading } = useGetAllPostsQuery();

  const allPosts = data;

  if(!Array.isArray(allPosts)) {
    return <Loader />
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='feedContainer'>
      {allPosts.map((post) => (
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
            <AddLikeButton post={post._id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed