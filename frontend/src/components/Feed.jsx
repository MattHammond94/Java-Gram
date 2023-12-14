import { useGetAllPostsQuery } from '../slices/postApiSlice';
import Loader from './Loader';
import Post from './Post';

const Feed = () => {
  const { data, error, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <Loader variant={'large'}/>;
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