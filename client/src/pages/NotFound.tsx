import HomeLayout from '../components/Layouts/HomeLayout';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const h1Text = 'ATMOSPHERE';

  return (
    <>
      <HomeLayout>
        <div>
          <h1 className="text-white font-title text-9xl ">{h1Text}</h1>
          <div className="flex rounded-xl py-4 mt-8 flex-col min-h-[20vh] items-center justify-between bg-dark-transparent">
            <h2 className="text-3xl">
              The Page you are looking for could not be found
            </h2>
            <h2 className="text-3xl">404</h2>
            <button className="border-2 px-2 rounded-xl py-2">
              <Link to="/">Return Home</Link>
            </button>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
