import { SongListItem } from '../../models/songList.ts';

export const SONG_ACTIONS = {
  GET_SONG_LIST_ASYNC: 'GET_SONG_LIST_ASYNC',
  SET_SONG_BPM_ASYNC: 'SET_SONG_BPM_ASYNC',
  SET_MASTER_VOLUME_ASYNC: 'SET_MASTER_VOLUME_ASYNC',
  SET_CURRENT_SONG_PATTERN_KEY: 'SET_CURRENT_SONG_PATTERN_KEY',
  LOAD_SONG_TO_CURRENT: 'LOAD_SONG_TO_CURRENT',
  SET_NEW_SONG_ASYNC: 'SET_NEW_SONG_ASYNC',
};
export interface SetSongBpmAsync {
  type: typeof SONG_ACTIONS.SET_SONG_BPM_ASYNC;
  payload: number;
}

export interface SetMasterVolumeAsync {
  type: typeof SONG_ACTIONS.SET_MASTER_VOLUME_ASYNC;
  payload: number;
}

export interface LoadSongToCurrent {
  type: typeof SONG_ACTIONS.LOAD_SONG_TO_CURRENT;
  payload: SongListItem;
}
