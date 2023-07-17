import * as Yup from 'yup';

export const loginFormSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required("Email can't be empty"),
  password: Yup.string().required("Password can't be empty"),
});
