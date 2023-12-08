const updateUsernameValidator = (values) => {
  const errors = {}
  
  if (values.username.length <= 3 ) {
    errors.username = 'Username must contain more than 3 characters'
  }
  
  if (values.username.length > 15) {
    errors.username = 'Username cannot exceed 18 characters.'
  }

  if (values.username.length <= 0) {
    errors.username = 'Please complete this field to continue.'
  }

  if (/\s/g.test(values.username)) {
    errors.username = 'Username cannot include any spaces.'
  }

  if (/\W/.test(values.username)) {
    errors.username = 'Username cannot include any special characters.'
  }

  if (values.confirmUsername.length <= 0) {
    errors.confirmUsername = 'Please complete this field to continue'
  }
  
  if (values.username !== (values.confirmUsername)) {
    errors.confirmUsername = 'Usernames do not match'
  }
  
  return errors;
}

export default updateUsernameValidator;