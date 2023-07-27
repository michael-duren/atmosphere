import { darkInput } from '../../Ui/Styles/input.ts';
import { Fragment, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { USER_ACTIONS } from '../../../store/actions/userActions.ts';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';
import { registerFormSchema } from '../../../models/schemas/registerFormSchema.ts';
import FormWarning from '../../Ui/Warnings/FormWarning.tsx';
import { useAppSelector } from '../../../store/hooks/useAppSelector.ts';
import { selectUser } from '../../../store/slices/userSlice.ts';
import SimpleSpinner from '../../Ui/Spinners/SimpleSpinner.tsx';

interface Props {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function RegisterForm({ setIsOpen }: Props) {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(selectUser);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      reEnterPassword: '',
      errors: null,
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values) => {
      const { username, email, password } = values;
      try {
        dispatch({
          type: USER_ACTIONS.REGISTER_ASYNC,
          payload: { username, email, password },
        });
      } catch (e: any) {
        formik.setErrors({ errors: e.message });
      }
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl opacity-90 mb-4 text-white">Register</h2>
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
            onBlur={formik.handleBlur}
            value={formik.values.email}
            id="email"
            name="email"
            className={darkInput}
            type="email"
            placeholder="example@example.com"
            required
          />
        </div>
        <div>
          {error &&
            error.map((error, i) => {
              if (error.toLowerCase().includes('email')) {
                return (
                  <Fragment key={i}>
                    <FormWarning warning={error} touched={true} />
                  </Fragment>
                );
              }
            })}
          <FormWarning
            warning={formik.errors.email}
            touched={formik.touched.email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase" htmlFor="email">
            Username
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            id="username"
            name="username"
            className={darkInput}
            type="username"
            placeholder="JohnDoe"
            required
          />
        </div>
        <div>
          {error &&
            error.map((error, i) => {
              if (error.toLowerCase().includes('username')) {
                return (
                  <Fragment key={i}>
                    <FormWarning warning={error} touched={true} />
                  </Fragment>
                );
              }
            })}
          <FormWarning
            warning={formik.errors.username}
            touched={formik.touched.username}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase" htmlFor="email">
            Password
          </label>
          <input
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            className={darkInput}
            type="password"
            placeholder="••••••••••"
          />
        </div>
        <FormWarning
          warning={formik.errors.password}
          touched={formik.touched.password}
        />
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase" htmlFor="email">
            Re-enter Password
          </label>
          <input
            id="reEnterPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reEnterPassword}
            name="reEnterPassword"
            className={darkInput}
            type="password"
            placeholder="••••••••••"
          />
        </div>
        <FormWarning
          warning={formik.errors.reEnterPassword}
          touched={formik.touched.reEnterPassword}
        />
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className={`${
            !formik.isValid || formik.isSubmitting
              ? 'bg-gray-500'
              : 'bg-gray-900 hover:bg-gray-800 active:scale-105'
          } py-2  transition-all duration-300 rounded-xl bg-opacity-80 `}
        >
          {isLoading ? <SimpleSpinner size={20} /> : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
