import { requests } from './base.ts';
import { SongList } from '../models/songList.ts';

export const Song = {
  list: () => requests.get<SongList>('/songs'),
};
