import SimpleSpinner from '../../../Ui/Spinners/SimpleSpinner.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectCommon } from '../../../../store/slices/commonSlice.ts';
import { darkInput } from '../../../Ui/Styles/input.ts';
import { Fragment, useState } from 'react';
import { SONG_ACTIONS } from '../../../../store/actions/songActions.ts';
import { Song } from '../../../../models/song.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import FormWarning from '../../../Ui/Warnings/FormWarning.tsx';

export default function SongForm() {
  const { appLoaded } = useAppSelector(selectCommon);
  const error = useAppSelector((store) => store.song.error);
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((store) => store.song.currentSong);
  const isNewSong = !currentSong.id; // if currentSong.id is undefined, it's a new song
  const songToSaveName = currentSong.songName
    ? currentSong.songName
    : 'Untitled';
  const [songToSaveNameInput, setSongToSaveNameInput] =
    useState(songToSaveName);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submission
    const songToSave = { ...currentSong }; // make a copy of state to send to server
    if (isNewSong) {
      // if the song is new, set the song name to the input value
      songToSave.songName = songToSaveNameInput;
      await submitNewSong(songToSave); // submit the song to the server
      return;
    }

    // if the song is not new, update the song
    await submitUpdatedSong();
  };

  const submitNewSong = async (songToSave: Song) => {
    dispatch({ type: SONG_ACTIONS.CREATE_NEW_SONG_ASYNC, payload: songToSave });
  };
  const submitUpdatedSong = async () => {};

  return (
    <div className="text-white flex items-center flex-col">
      <h2 className="text-2xl opacity-90 mb-4 text-white">Save Song</h2>
      <form onSubmit={onSubmit} className="flex gap-8 flex-col">
        <div className="flex flex-col gap-2">
          <label className="font-caps uppercase">Song Name</label>
          <input
            type="text"
            value={songToSaveNameInput}
            onChange={(e) => setSongToSaveNameInput(e.target.value)}
            className={darkInput}
          />
        </div>

        {Array.isArray(error) &&
          error.map((error, i) => {
            return (
              <Fragment key={i}>
                <FormWarning touched={true} warning={error} />
              </Fragment>
            );
          })}
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
