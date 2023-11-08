import { useState } from 'react';
import { useAddImageToCloudMutation, useCreatePostMutation } from '../slices/postApiSlice';
import Loader from './Loader';
import { useSelector } from "react-redux";

const CreatePostForm = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');

  const { userInfo } = useSelector((state) => state.auth)
  const [newPost, { isLoading }] = useCreatePostMutation();
  const [addToCloud] = useAddImageToCloudMutation();

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

    await newPost({ image: storedImage, caption: 'This was posted through frontend', user: userInfo._id })
    console.log('Post created')


    // First validate all fields before sending any req's to backend.
    // THEN send image to backend to be created in cloudinary 
    // get the response from that and store it in a var
    // Put that var into the image: attr in post 
    // send another req to backend to create post 

  }

  return (
    <div>
      <form onSubmit={e => {handleSubmit(e)}}>
        <label>Upload Image:</label>
        <input 
          type="file" 
          onChange={e => handleChange(e)} 
          required
          accept="image/png, image/jpeg, image/jpg, image/jfif" 
        ></input>
        { isLoading ? <button disabled><Loader /></button> : <button>Submit</button> }
      </form>
    </div>
  )
}

export default CreatePostForm