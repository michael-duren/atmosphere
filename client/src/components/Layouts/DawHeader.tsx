import { useAppSelector } from '../../store/hooks/useAppSelector.ts';
import { selectUser } from '../../store/slices/userSlice.ts';
import { splitCamelCase, toTitleCase } from '../../utils/string.ts';

export default function DawHeader() {
  const { user } = useAppSelector(selectUser);

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-full text-white flex items-center justify-center font-caps shadow-2xl h-24 w-24 text-3xl bg-black">
          {user!.username[0].toUpperCase()}
        </div>
        <h2 className="text-xl text-white">
          {toTitleCase(splitCamelCase(user!.username))}
        </h2>
      </div>
      <div>
        <h1 className="border-2 border-white bg-black bg-opacity-90 p-2 font-title text-xl text-white shadow-xl">
          Atmosphere
        </h1>
      </div>
    </header>
  );
}
