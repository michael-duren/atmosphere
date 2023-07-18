import { darkInput } from '../../Ui/Styles/input.ts';
import { SetStateAction } from 'react';
import { useFormik } from 'formik';
import { loginFormSchema } from '../../../models/schemas/loginFormSchema.ts';
import { USER_ACTIONS } from '../../../store/actions/userActions.ts';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';
// import {useAppDispatch} from "../../../store/hooks/useAppDispatch.ts";

interface Props {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ setIsOpen }: Props) {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      errors: null,
    },
    validationSchema: loginFormSchema,
    onSubmit: async (values) => {
      try {
        dispatch({
          type: USER_ACTIONS.LOGIN_ASYNC,
          payload: { email: values.email, password: values.password },
        });
      } catch (e) {
        formik.setErrors({ errors: 'Invalid email or password' });
      }
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl opacity-90 mb-4 text-white">Login</h2>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-white font-caps mb-4 opacity-80 hover:opacity-100"
        >
          X
        </button>
      </div>
      <form
        className="text-white gap-8 flex flex-col"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase" htmlFor="email">
            Email
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
            name="email"
            className={darkInput}
            type="email"
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase" htmlFor="email">
            Password
          </label>
          <input
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            className={darkInput}
            type="password"
            placeholder="••••••••••"
          />
        </div>
        <button
          type="submit"
          className="hover:bg-gray-800 py-2 active:scale-105 transition-all duration-300 rounded-xl bg-opacity-80 bg-gray-900"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
