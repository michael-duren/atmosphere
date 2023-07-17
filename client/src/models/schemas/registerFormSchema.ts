import * as Yup from 'yup';

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerFormSchema = Yup.object({
  username: Yup.string()
    .required("Username can't be empty")
    .min(6)
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Username name must contain only letters and numbers'
    ),
  password: Yup.string()
    .required("Password can't be empty")
    .min(8)
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
    ),
  reEnterPassword: Yup.string()
    .required('Please re-enter your password')
    .min(8, 'Password is too short')
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
    )
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  email: Yup.string()
    .required("Email can't be empty")
    .email('Email must be valid email'),
});
