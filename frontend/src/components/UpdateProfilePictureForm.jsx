import { useState } from "react";
import { useAddProfilePictureToCloudMutation, useUpdateUserMutation, useGetSelectedUserInfoQuery, useRemoveProfilePictureFromCloudMutation } from "../slices/usersApiSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useGetAllPostsQuery } from "../slices/postApiSlice";

const UpdateProfilePictureForm = ({ setModalOpenStatus, setContentLoadingStatus }) => {
  const [fileError, setFileError] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const [addProfilePicture, { isLoading: addProfilePictureLoading }] = useAddProfilePictureToCloudMutation();
  const [updatedUser, { isLoading: updatedUserLoading }] = useUpdateUserMutation();
  const [removeProfilePictureFromCloud, { isLoading: removalFromCloudLoading }] = useRemoveProfilePictureFromCloudMutation();
  const { data: selectedUserInfo, refetch: refetchUserDetails } = useGetSelectedUserInfoQuery(userInfo.username);
  const { refetch: refetchAllPosts } = useGetAllPostsQuery();

  const handleChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContentLoadingStatus(true);

    if (!file) {
      setContentLoadingStatus(false)
      return setFileError('Please select a file to upload');
    }

    const previousProfilePictureId = await selectedUserInfo.profilePictureCloudId;
    const storedProfilePicture = await addProfilePicture({ image: image }).unwrap();
    const update = await updatedUser({ profilePicture: storedProfilePicture.url, profilePictureCloudId: storedProfilePicture.id }).unwrap();

    if (previousProfilePictureId) {
      await removeProfilePictureFromCloud({ image: previousProfilePictureId })
    }

    if (update) {
      setImageUploaded(true);
      await refetchUserDetails();
      await refetchAllPosts();
    } else {
      setFileError('Unable to update profile picture at this time.');
    }

    setContentLoadingStatus(false);

    setTimeout(() => {
      setModalOpenStatus(false)
    }, 1500);
  }

  return (
    <div className="formTemplate"  style={{ height: '310px'}}>
      { imageUploaded ? <h1 style={{ marginTop: '150px', marginLeft: '105px' }}>Success!</h1>
       : <form onSubmit={e => {handleSubmit(e)}}  autoComplete='off'>
        <h1>Update Profile Picture</h1>
          <label>Upload Image:</label>
          <input 
            className="fileUploader"
            type="file"
            onChange={e => handleChange(e)}
            accept="image/png, image/jpeg, image/jpg, image/jfif" 
            style={{ width: '290px', height: '42px' }}
          ></input>
          { fileError && <p className='error'>{fileError}</p> }
          { addProfilePictureLoading || updatedUserLoading || removalFromCloudLoading ? <button className='disabledButton' disabled><Loader /></button> : <button>Submit</button> }
        </form>
      }
    </div>
  )
}

export default UpdateProfilePictureForm