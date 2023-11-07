import { useEffect, useState } from 'react';
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

  console.log(allPosts)

  return (
    <div >
        {allPosts.map((post) => (
          <div key={post._id}>
            <h1>{ post.image }</h1>
            <h1>{ post.caption }</h1>
            <p>{ post.createdAt }</p>
          </div>
        ))}
    </div>
  );
}

export default Feed