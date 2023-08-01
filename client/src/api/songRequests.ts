import { requests } from './base.ts';
import { SongList, SongListItem } from '../models/songList.ts';
import { Song as SongType } from '../models/song.ts';

export const Song = {
  list: () => requests.get<SongList>('/songs'),
  single: (id: number) => requests.get<SongType>(`/songs/${id}`),
  create: (song: SongType) => requests.post<SongType>('/songs', song),
  update: (song: SongType) => requests.put<SongType>(`/songs/${song.id}`, song),
  delete: (song: SongListItem) => requests.del(`/songs/${song.id}`),
};
