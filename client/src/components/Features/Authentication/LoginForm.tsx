import { darkInput } from '../../Ui/Styles/input.ts';
import { SetStateAction } from 'react';
// import {useAppDispatch} from "../../../store/hooks/useAppDispatch.ts";

interface Props {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ setIsOpen }: Props) {
  // const dispatch = useAppDispatch();
  //
  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch()
  // }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl opacity-90 mb-4 text-white">Login</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white font-caps mb-4 opacity-80 hover:opacity-100"
        >
          X
        </button>
      </div>
      <form className="text-white gap-8 flex flex-col">
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase" htmlFor="email">
            Email
          </label>
          <input
            className={darkInput}
            type="email"
            placeholder="example@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase" htmlFor="email">
            Password
          </label>
          <input
            className={darkInput}
            type="password"
            placeholder="••••••••••"
          />
        </div>
        <button className="hover:bg-gray-800 py-2 active:scale-105 transition-all duration-300 rounded-xl bg-opacity-80 bg-gray-900">
          Sign in
        </button>
      </form>
    </div>
  );
}
