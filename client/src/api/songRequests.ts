import { requests } from './base.ts';
import { SongList } from '../models/songList.ts';
import { Song as SongType } from '../models/song.ts';

export const Song = {
  list: () => requests.get<SongList>('/songs'),
  single: (id: number) => requests.get<SongType>(`/songs/${id}`),
  create: (song: SongType) => requests.post<SongType>('/songs', song),
};
