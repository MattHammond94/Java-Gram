const updatePasswordValidator = (values) => {
  const errors = {}

  // if (values.currentPassword) {
  //   errors.currentPassword = 'Current password is incorrect'
  // }
  
  if (values.newPassword.length <= 10) {
    errors.newPassword = 'Password must exceed 12 characters.'
  }

  if (values.newPassword.length > 20) {
    errors.newPassword = 'Password cannot contain more than 20 characters.'
  }

  if (!/[A-Z]/g.test(values.newPassword)) {
    errors.newPassword = 'Password must contain at least one uppercase character.'
  }

  if (/\s/g.test(values.newPassword)) {
    errors.newPassword = 'Password cannot contain any spaces.'
  }
  
  if (!/\W/.test(values.newPassword)) {
    errors.newPassword = 'Password must contain a special character.'
  }

  if (values.confirmPassword <= 0) {
    errors.confirmPassword = 'Please complete this field to continue.'
  }

  if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors;
}

export default updatePasswordValidator;