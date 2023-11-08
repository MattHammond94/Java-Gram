import { useState } from 'react';
import { useAddImageToCloudMutation, useCreatePostMutation } from '../slices/postApiSlice';
import Loader from './Loader';
import { useSelector } from "react-redux";

const CreatePostForm = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const { userInfo } = useSelector((state) => state.auth)
  const [newPost, { isLoading: newPostLoading }] = useCreatePostMutation();
  const [addToCloud, { isLoading: addToCloudLoading }] = useAddImageToCloudMutation();

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
    console.log(`This is the image as a BASE64: ${image}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedImage = await addToCloud({ image: image }).unwrap();

    console.log(storedImage);

    await newPost({ image: storedImage, caption: caption, user: userInfo._id });
    console.log('Post created');
    setImageUploaded(true);
  }

  return (
    <div className="formTemplate">
      { imageUploaded ? <h1>Post successfully posted</h1>
       : <form onSubmit={e => {handleSubmit(e)}}>
        <h1>Create A New Post!</h1>
          <label>Upload Image:</label>
          <input 
            className="fileUploader"
            type="file"
            onChange={e => handleChange(e)} 
            required
            accept="image/png, image/jpeg, image/jpg, image/jfif" 
          ></input>
          <label>Caption:</label>
          <input type="text" name="caption" value={ caption } onChange={ (e) => setCaption(e.target.value) } />
          { addToCloudLoading || newPostLoading ? <button className='disabledButton' disabled><Loader /></button> : <button>Submit</button>}
        </form>
      }
    </div>
  )
}

export default CreatePostForm