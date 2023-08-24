import { useAppSelector } from '../../../store/hooks/useAppSelector.ts';
import DawDropdownMenu from '../Dropdowns/DawDropdownMenu.tsx';
import { selectUser } from '../../../store/slices/userSlice.ts';
import { Link } from 'react-router-dom';

export default function DawHeader() {
  const { songName } = useAppSelector((store) => store.song.currentSong);
  const { user } = useAppSelector(selectUser);
  const songNameDisplayed = songName ? songName : 'Untitled';

  return (
    <header className="flex bg-black shadow-2xl rounded-xl px-2 shadow-gray-800 font-caps items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="border-2 border-white bg-black bg-opacity-90 p-2 font-title text-base  sm:text-lg md:text-xl text-white shadow-xl">
          <Link to={'/'}>Atmosphere</Link>
        </div>
      </div>

      <div className="flex md:text-base text-sm items-center gap-4">
        <h2 className="text-gray-200">Song: {songNameDisplayed}</h2>
        <h2 className="text-gray-200">User: {user!.username}</h2>
        <DawDropdownMenu />
      </div>
    </header>
  );
}
