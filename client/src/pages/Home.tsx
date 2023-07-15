import HomeLayout from '../components/Layouts/HomeLayout';
import { useState } from 'react';

export default function Home() {
  const h1Text = 'ATMOSPHERE';
  const [loginAnimationEnd, setLoginAnimationEnd] = useState(false);
  const [registerAnimationEnd, setRegisterAnimationEnd] = useState(false);
  const [hOneAnimationEnd, setHOneAnimationEnd] = useState(false);

  const handleLoginAnimationEnd = () => {
    setLoginAnimationEnd(true);
  };

  const handleRegisterAnimationEnd = () => {
    setRegisterAnimationEnd(true);
  };

  const handleH1AnimationEnd = () => {
    setHOneAnimationEnd(true);
  };

  return (
    <HomeLayout>
      <div
        className={`${
          loginAnimationEnd &&
          registerAnimationEnd &&
          hOneAnimationEnd &&
          'animate-pulse'
        }`}
      >
        <h1
          onAnimationEnd={handleH1AnimationEnd}
          className="text-white font-title text-9xl animation-up"
        >
          {h1Text.split('').map((char, i) => {
            return (
              <span
                style={{
                  animation: hOneAnimationEnd
                    ? 'none'
                    : `fade-in-stunted 5s ${i / 10}s forwards`,
                  opacity: hOneAnimationEnd ? 0.75 : 0,
                }}
                key={i}
              >
                {char}
              </span>
            );
          })}
        </h1>
        <div className="flex justify-between">
          <button
            onAnimationEnd={handleLoginAnimationEnd}
            className={`uppercase ${
              loginAnimationEnd
                ? 'hover:opacity-100 opacity-75'
                : 'opacity-0 animation-login-buttons'
            } font-caps text-5xl `}
          >
            Login
          </button>
          <button
            onAnimationEnd={handleRegisterAnimationEnd}
            className={`uppercase ${
              registerAnimationEnd
                ? 'opacity-75 hover:opacity-100'
                : 'opacity-0 animation-login-buttons'
            } font-caps text-5xl`}
          >
            Register
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}
