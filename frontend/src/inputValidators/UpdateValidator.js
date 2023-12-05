const updateValidator = (values) => {
  const errors = {}
  const acceptedEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(values.firstName.length > 16) {
    errors.firstName = 'First name cannot exceed sixteen charcaters.'
  }

  if (/\s/g.test(values.firstName)) {
    errors.firstName = 'First name cannot include any spaces.'
  }

  if (/\W/.test(values.firstName)) {
    errors.firstName = 'First name cannot include any special characters.'
  }

  if(values.lastName.length > 16) {
    errors.lastName = 'Last name cannot exceed sixteen charcaters.'
  }

  if (/\s/g.test(values.lastName)) {
    errors.lastName = 'Last name cannot include any spaces.'
  }

  if (/\W/.test(values.lastName)) {
    errors.lastName = 'Last name cannot include any special characters.'
  }

  if (!acceptedEmail.test(values.email)) {
    errors.email = 'Please input a valid email address.'
  }

  if(values.bio.length > 100) {
    errors.bio = 'Bio cannot be longer than 100 characters.'
  }

  return errors;
}

export default updateValidator;