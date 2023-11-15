import { useGetAllPostsQuery } from '../slices/postApiSlice';
import Loader from './Loader';
import Post from './Post';

const Feed = () => {
  const { data, error, isLoading } = useGetAllPostsQuery();

  if (!Array.isArray(data)) {
    return <h1>No posts exists yet</h1>
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='feedContainer'>
      {data && data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Feed