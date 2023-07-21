export const CURRENT_SONG_ACTIONS = {
  SET_SONG_BPM_ASYNC: 'SET_SONG_BPM_ASYNC',
};

export interface SetSongBpmAsync {
  type: typeof CURRENT_SONG_ACTIONS.SET_SONG_BPM_ASYNC;
  payload: number;
}
