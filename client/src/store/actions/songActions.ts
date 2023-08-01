import { SongListItem } from '../../models/songList.ts';
import { Song } from '../../models/song.ts';

export const SONG_ACTIONS = {
  GET_SONG_LIST_ASYNC: 'GET_SONG_LIST_ASYNC',
  LOAD_SONG_TO_CURRENT_ASYNC: 'LOAD_SONG_TO_CURRENT',
  SET_NEW_SONG_ASYNC: 'SET_NEW_SONG_ASYNC',
  CREATE_NEW_SONG_ASYNC: 'CREATE_NEW_SONG_ASYNC',
  UPDATE_SONG_ASYNC: 'UPDATE_SONG_ASYNC',
  DELETE_SONG_ASYNC: 'DELETE_SONG_ASYNC',
  SET_SONG_BPM_ASYNC: 'SET_SONG_BPM_ASYNC',
  SET_MASTER_VOLUME_ASYNC: 'SET_MASTER_VOLUME_ASYNC',
  SET_CURRENT_SONG_PATTERN_KEY: 'SET_CURRENT_SONG_PATTERN_KEY',
};
export interface SetSongBpmAsync {
  type: typeof SONG_ACTIONS.SET_SONG_BPM_ASYNC;
  payload: number;
}

export interface SetMasterVolumeAsync {
  type: typeof SONG_ACTIONS.SET_MASTER_VOLUME_ASYNC;
  payload: number;
}

export interface LoadSongToCurrentAsync {
  type: typeof SONG_ACTIONS.LOAD_SONG_TO_CURRENT_ASYNC;
  payload: SongListItem;
}

export interface CreateNewSongAsync {
  type: typeof SONG_ACTIONS.CREATE_NEW_SONG_ASYNC;
  payload: Song;
}

export interface UpdateSongAsync {
  type: typeof SONG_ACTIONS.UPDATE_SONG_ASYNC;
  payload: Song;
}

export interface DeleteSongAsync {
  type: typeof SONG_ACTIONS.DELETE_SONG_ASYNC;
  payload: SongListItem;
}
