import { SongListItem } from '../../models/songList.ts';

export const CURRENT_SONG_ACTIONS = {
  SET_SONG_BPM_ASYNC: 'SET_SONG_BPM_ASYNC',
  SET_MASTER_VOLUME_ASYNC: 'SET_MASTER_VOLUME_ASYNC',
  SET_CURRENT_SONG_PATTERN_KEY: 'SET_CURRENT_SONG_PATTERN_KEY',
  LOAD_SONG_TO_CURRENT: 'LOAD_SONG_TO_CURRENT',
};

export interface SetSongBpmAsync {
  type: typeof CURRENT_SONG_ACTIONS.SET_SONG_BPM_ASYNC;
  payload: number;
}

export interface SetMasterVolumeAsync {
  type: typeof CURRENT_SONG_ACTIONS.SET_MASTER_VOLUME_ASYNC;
  payload: number;
}

export interface LoadSongToCurrent {
  type: typeof CURRENT_SONG_ACTIONS.LOAD_SONG_TO_CURRENT;
  payload: SongListItem;
}
