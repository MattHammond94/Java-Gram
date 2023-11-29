import { useState } from 'react';
import { 
  useAddImageToCloudMutation, 
  useCreatePostMutation, 
  useGetAllPostsQuery, 
  useGetAllUsersPostsQuery
} from '../slices/postApiSlice';
import Loader from './Loader';
import { useSelector } from "react-redux";

const CreatePostForm = ({ setModalOpenStatus, setContentLoadingStatus }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [fileError, setFileError] = useState('');
  // const [captionError, setCaptionError] = useState('');

  const { userInfo } = useSelector((state) => state.auth)
  const [newPost, { isLoading: newPostLoading }] = useCreatePostMutation();
  const [addToCloud, { isLoading: addToCloudLoading }] = useAddImageToCloudMutation();
  const { refetch: refetchUsersPosts } = useGetAllUsersPostsQuery(userInfo._id);
  const { refetch: refetchAllPosts } = useGetAllPostsQuery();

  const handleChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setContentLoadingStatus(true);

    if (!file) {
      return setFileError('Please select a file to upload')
    }

    const storedImage = await addToCloud({ image: image }).unwrap();

    if (!storedImage) {
      return setFileError('Unable to connect to cloud at this moment in time.')
    }

    const postCreated = await newPost({ image: storedImage.url, imageCloudId: storedImage.id, caption: caption, user: userInfo._id });

    if (!postCreated) {
      return setFileError('Unable to create a post at this moment in time. Please try again.')
    } 

    setImageUploaded(true);
    await refetchAllPosts();
    await refetchUsersPosts();
    setContentLoadingStatus(false)

    setTimeout(() => {
      setModalOpenStatus(false);
    }, 1500);
  }

  return (
    <div className="formTemplate" style={{ height: '455px'}}>
      { imageUploaded ? <h1 style={{ marginTop: '150px', marginLeft: '105px' }}>Success!</h1>
       : <form onSubmit={e => {handleSubmit(e)}}  autoComplete='off'>
        <h1>Create A New Post</h1>
          <label>Upload Image:</label>
          <input 
            className="fileUploader"
            type="file"
            onChange={e => handleChange(e)}
            accept="image/png, image/jpeg, image/jpg, image/jfif" 
            style={{ width: '290px', height: '42px' }}
          ></input>
          { fileError && <p className='error'>{fileError}</p> }
          <label>Caption:</label>
          <textarea name="caption" value={ caption } onChange={ (e) => setCaption(e.target.value) } />
          { addToCloudLoading || newPostLoading ? <button className='disabledButton' disabled><Loader /></button> : <button>Submit</button> }
          {/* { captionError && <p className='error'>{captionError}</p> } */}
        </form>
      }
    </div>
  )
}

export default CreatePostForm