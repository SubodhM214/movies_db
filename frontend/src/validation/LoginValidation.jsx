function validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // pattern (requires at least 8 chars with 1 number, 1 uppercase, 1 lowercase)
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

  if (values.email === "") {
    error.email = "Email is required";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email did not match";
  }

  if (values.password === "") {
    error.password = "Password is required";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password did not match";
  }
  return error;
}

export default validation;
