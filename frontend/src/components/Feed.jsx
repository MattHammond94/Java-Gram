import { useGetAllPostsQuery } from '../slices/postApiSlice';
import Loader from './Loader';
import Post from './Post';

const Feed = () => {
  const { data, error, isLoading } = useGetAllPostsQuery();

  // const allPosts = data;

  // if(!Array.isArray(allPosts)) {
  //   return <Loader />
  // }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='feedContainer'>
      {data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Feed