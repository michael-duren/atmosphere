import { requests } from './base.ts';
import {
  BassSynth,
  Delay,
  Distortion,
  KitPattern,
  MelodicPattern,
  MelodicSynth,
  Reverb,
} from '../models/song.ts';

export type EffectList = {
  distortionPresets: Distortion[];
  reverbPresets: Reverb[];
  delayPresets: Delay[];
};

export type InstrumentList = {
  melodicSynths: MelodicSynth[];
  bassSynths: BassSynth[];
};

export type PatternList = {
  melodicPatterns: MelodicPattern[];
  kitPatterns: KitPattern[];
};

const Effects = {
  list: () => requests.get<EffectList>('/presets/effects'),
  getDistortionById: (id: number) =>
    requests.get<Distortion>(`/presets/distortion/${id}`),
  getReverbById: (id: number) => requests.get<Reverb>(`/presets/reverb/${id}`),
  getDelayById: (id: number) => requests.get<Delay>(`/presets/delay/${id}`),
  createDistortion: (distortion: Distortion) =>
    requests.post<Distortion>('/presets/distortion', distortion),
  createReverb: (reverb: Reverb) =>
    requests.post<Reverb>('/presets/reverb', reverb),
  createDelay: (delay: Delay) => requests.post<Delay>('/presets/delay', delay),
  updateDistortion: (distortion: Distortion) =>
    requests.put<Distortion>(
      `/presets/distortion/${distortion.id}`,
      distortion
    ),
  updateReverb: (reverb: Reverb) =>
    requests.put<Reverb>(`/presets/reverb/${reverb.id}`, reverb),
  updateDelay: (delay: Delay) =>
    requests.put<Delay>(`/presets/delay/${delay.id}`, delay),
  deleteDistortion: (distortion: Distortion) =>
    requests.del(`/presets/distortion/${distortion.id}`),
  deleteReverb: (reverb: Reverb) =>
    requests.del(`/presets/reverb/${reverb.id}`),
  deleteDelay: (delay: Delay) => requests.del(`/presets/delay/${delay.id}`),
};

const Instruments = {
  list: () => requests.get<InstrumentList>('/presets/instruments'),
  createMelodicSynth: (melodicSynth: MelodicSynth) =>
    requests.post('/presets/melodicSynth', melodicSynth),
  createBassSynth: (bassSynth: BassSynth) =>
    requests.post('/presets/bassSynth', bassSynth),
  updateMelodicSynth: (melodicSynth: MelodicSynth) =>
    requests.put(`/presets/melodicSynth/${melodicSynth.id}`, melodicSynth),
  updateBassSynth: (bassSynth: BassSynth) =>
    requests.put(`/presets/bassSynth/${bassSynth.id}`, bassSynth),
  deleteMelodicSynth: (id: number) =>
    requests.del(`/presets/melodicSynth/${id}`),
  deleteBassSynth: (id: number) => requests.del(`/presets/bassSynth/${id}`),
};

const Patterns = {
  list: () => requests.get<PatternList>('/presets/patterns'),
  createMelodicPattern: (pattern: MelodicPattern) =>
    requests.post('/presets/melodicPattern', pattern),
  createKitPattern: (pattern: KitPattern) =>
    requests.post('/presets/kit', pattern),
  updateMelodicPattern: (pattern: MelodicPattern) =>
    requests.put(`/presets/melodicPattern/${pattern.id}`, pattern),
  updateKitPattern: (pattern: KitPattern) =>
    requests.put(`/presets/kit/${pattern.id}`, pattern),
  deleteMelodicPattern: (id: number) =>
    requests.del(`/presets/melodicPattern/${id}`),
  deleteKitPattern: (id: number) => requests.del(`/presets/kit/${id}`),
};

const Preset = {
  Effects,
  Instruments,
  Patterns,
};

export default Preset;
