// import { useEffect, useState } from 'react';
import { useGetAllPostsQuery } from '../slices/postApiSlice';
import Loader from './Loader';

const Feed = () => {

  const { data, error, isLoading } = useGetAllPostsQuery();

  const allPosts = data || [];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='feedContainer'>
      {allPosts.map((post) => (
        <div key={post._id}>
          <img src={post.image} alt={post.caption}/>
          <h1>{ post.caption }</h1>
          <p>{ post.createdAt }</p>
          <p>{ post.user.username }</p>
        </div>
      ))}
    </div>
  );
}

export default Feed