function validate(user) {
  // Name
  const errors = {};

  if (!user.firstName) {
    errors.firstName = true;
    errors.name = 'Please enter a name';
  }

  if (!user.lastName) {
    errors.lastName = true;
    errors.name = 'Please enter a name';
  }

  // Email
  if (!(/\S+@\S+\.\S+/.test(user.email))) {
    errors.email = 'Please enter a valid email';
  }

  if (!(user.password === user.confirmPassword)) {
    errors.password = 'Passwords do not match';
  }

  // Password
  if (!user.password || user.password.length < 8) {
    errors.password = 'Password must have at least 8 characters';
  }

  return errors;
}

export default validate;
