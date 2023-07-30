import SimpleSpinner from '../../../Ui/Spinners/SimpleSpinner.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectCommon } from '../../../../store/slices/commonSlice.ts';
import { darkInput } from '../../../Ui/Styles/input.ts';

export default function SongForm() {
  const { appLoaded } = useAppSelector(selectCommon);
  const currentSong = useAppSelector((store) => store.song.currentSong);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('YOU GOT ME');
    console.log(currentSong);
  };

  return (
    <div className="text-white flex items-center flex-col">
      <h2 className="text-2xl opacity-90 mb-4 text-white">Save Song</h2>
      <form onSubmit={onSubmit} className="flex gap-8 flex-col">
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase">Song Name</label>
          <input type="text" className={darkInput} />
        </div>
        <button
          type="submit"
          className="hover:bg-gray-800 py-2 active:scale-105 transition-all duration-300 rounded-xl bg-opacity-80 bg-gray-900"
        >
          {!appLoaded ? <SimpleSpinner size={20} /> : 'Save'}
        </button>
      </form>
    </div>
  );
}
