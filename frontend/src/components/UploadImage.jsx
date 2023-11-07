import { useState } from 'react';
import { useAddImageToCloudMutation } from '../slices/postApiSlice';
import Loader from './Loader';

const UploadImage = () => {
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');

  const [addToCloud, { isLoading }] = useAddImageToCloudMutation();

  const previewFiles = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file)
    }

    reader.onloadend = () => {
      setImage(reader.result)
    }
    
    console.log(`This is the image as a BASE64: ${image}`);
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    setFile(file);
    previewFiles(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedImage = await addToCloud({ image: image }).unwrap();

    console.log(storedImage);

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

export default UploadImage