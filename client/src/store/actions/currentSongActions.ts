export const CURRENT_SONG_ACTIONS = {
  SET_SONG_BPM_ASYNC: 'SET_SONG_BPM_ASYNC',
  SET_MASTER_VOLUME_ASYNC: 'SET_MASTER_VOLUME_ASYNC',
};

export interface SetSongBpmAsync {
  type: typeof CURRENT_SONG_ACTIONS.SET_SONG_BPM_ASYNC;
  payload: number;
}

export interface SetMasterVolumeAsync {
  type: typeof CURRENT_SONG_ACTIONS.SET_MASTER_VOLUME_ASYNC;
  payload: number;
}
