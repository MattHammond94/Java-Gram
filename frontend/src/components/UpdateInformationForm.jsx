import { useState, useEffect } from "react";
import { useUpdateUserMutation, useGetUserInfoQuery } from "../slices/usersApiSlice";
import UpdateValidator from "../inputValidators/UpdateValidator";
import Loader from "./Loader"

const UpdateInformationForm = ({ setContentLoading, setModalOpenStatus, refetch }) => {
  const [formValues, setFormValues] = useState({ firstName: '', lastName: '', email: '', dateOfBirth: '', bio: '' });
  const [completionStatus, setCompletionStatus] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [apiError, setApiError] = useState('');

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data: userInfo, error: getUserError, isLoading: getUserLoading } = useGetUserInfoQuery();

  useEffect(() => {
    if (userInfo) {
      const formattedDate = userInfo.dateOfBirth ? new Date(userInfo.dateOfBirth).toISOString().split('T')[0] : '';

      const initialState = {
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        dateOfBirth: formattedDate || '',
        bio: userInfo.bio || '',
      };

      setFormValues(initialState);
    }
  }, [userInfo]);

  if (getUserLoading) {
    return <Loader />
  }

  if (getUserError) {
    return <div>Error: {getUserError.message}</div>;
  }

  const handleChange = (e) => {
    const { name, value  } = e.target
    setFormValues({ ...formValues, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = UpdateValidator(formValues);
    setErrorMessages(errors);
    
    if (Object.keys(errors).length === 0) {
      setContentLoading(true);

      try {
        const { firstName, lastName, email, dateOfBirth, bio } = formValues;
        const response = await updateUser({ firstName, lastName, email, dateOfBirth, bio }).unwrap();
        if (response) {
          await refetch();
          setCompletionStatus(true);
          setContentLoading(false);
          setTimeout(() => {
            setModalOpenStatus(false);
          }, 1500);
        }
      } catch(err) {
        setContentLoading(false);
        return setApiError(err?.data?.message || err.error);
      }
    }
  }

  return (
    <div className="formTemplate updateInfoForm" style={{ width: '360px', height: Object.keys(errorMessages).length > 1 ? '650px' : '620px' }}>
      { completionStatus ? <h1>Details successfully updated!</h1> : 
      <form autoComplete="off" onSubmit={ submitHandler } style={{ marginTop: '16px' }}>
        <h1>Update Profile Information</h1>
        <label>First Name:</label>
        <input type="text" name="firstName" value={ formValues.firstName } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.firstName }</p>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={ formValues.lastName } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.lastName }</p>
        <label>Email Address:</label>
        <input type="text" name="email" value={ formValues.email } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.email }</p>
        <label>Date of Birth:</label>
        <input type="date" max={new Date().toISOString().split('T')[0]} min="1904-01-01" name="dateOfBirth" value={ formValues.dateOfBirth } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.dateOfBith }</p>
        <label>Bio:</label>
        <textarea name="bio" value={ formValues.bio } onChange={ handleChange }/>
        <p className='error'>{ errorMessages.bio }</p>
        <p className='error'>{ apiError }</p>
        { isLoading ? <button disabled><Loader /></button> : <button>Update</button> }
      </form>
      }
    </div>
  )
}

export default UpdateInformationForm