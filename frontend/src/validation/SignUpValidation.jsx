function validation(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

  if (!values.name) {
    error.name = "Name is required";
  }

  if (!values.email) {
    error.email = "Email is required";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email did not match";
  }

  if (!values.password) {
    error.password = "Password is required";
  } else if (!password_pattern.test(values.password)) {
    error.password =
      "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
  }

  return error;
}
export default validation;
