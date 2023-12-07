const signUpValidator = (values) => {
  const errors = {}
  const acceptedEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!acceptedEmail.test(values.email)) {
    errors.email = 'Please input a valid email address.'
  }

  if (values.email.length <= 0) {
    errors.email = 'Please complete this field to continue.'
  }
  
  if (values.username.length <= 3 ) {
    errors.username = 'Username must contain more than 3 characters'
  }
  
  if (values.username.length > 18) {
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

  if (values.password.length <= 10) {
    errors.password = 'Password must exceed 12 characters.'
  }

  if (values.password.length > 20) {
    errors.password = 'Password cannot contain more than 20 characters.'
  }

  if (!/[A-Z]/g.test(values.password)) {
    errors.password = 'Password must contain at least one uppercase character.'
  }

  if (/\s/g.test(values.password)) {
    errors.password = 'Password cannot contain any spaces.'
  }
  
  if (!/\W/.test(values.password)) {
    errors.password = 'Password must contain a special character.'
  }

  if (values.password.length <= 0) {
    errors.password = 'Please complete this field to continue.'
  }

  if (values.confirmPassword <= 0) {
    errors.confirmPassword = 'Please complete this field to continue.'
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors;
}

export default signUpValidator;