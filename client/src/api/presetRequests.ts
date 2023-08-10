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
  getMelodicSynthById: (id: number) =>
    requests.get(`/presets/instruments/melodic/${id}`),
  getBassSynthById: (id: number) =>
    requests.get(`/presets/instruments/bass/${id}`),
  createMelodicSynth: (melodicSynth: MelodicSynth) =>
    requests.post('/presets/instruments/melodicSynth', melodicSynth),
  createBassSynth: (bassSynth: BassSynth) =>
    requests.post('/presets/instruments/bassSynth', bassSynth),
  updateMelodicSynth: (melodicSynth: MelodicSynth) =>
    requests.put(
      `/presets/instruments/melodicSynth/${melodicSynth.id}`,
      melodicSynth
    ),
  updateBassSynth: (bassSynth: BassSynth) =>
    requests.put(`/presets/instruments/bassSynth/${bassSynth.id}`, bassSynth),
  deleteMelodicSynth: (id: number) =>
    requests.del(`/presets/instruments/melodicSynth/${id}`),
  deleteBassSynth: (id: number) =>
    requests.del(`/presets/instruments/bassSynth/${id}`),
};

const Patterns = {
  list: () => requests.get<PatternList>('/presets/patterns'),
  getMelodicPatternById: (id: number) =>
    requests.get(`/presets/patterns/melodic/${id}`),
  getKitPatternById: (id: number) =>
    requests.get(`/presets/patterns/kit/${id}`),
  createMelodicPattern: (pattern: MelodicPattern) =>
    requests.post('/presets/patterns/melodic', pattern),
  createKitPattern: (pattern: KitPattern) =>
    requests.post('/presets/patterns/kit', pattern),
  updateMelodicPattern: (pattern: MelodicPattern) =>
    requests.put(`/presets/patterns/melodic/${pattern.id}`, pattern),
  updateKitPattern: (pattern: KitPattern) =>
    requests.put(`/presets/patterns/kit/${pattern.id}`, pattern),
  deleteMelodicPattern: (id: number) =>
    requests.del(`/presets/patterns/melodic/${id}`),
  deleteKitPattern: (id: number) => requests.del(`/presets/patterns/kit/${id}`),
};

const Preset = {
  Effects,
  Instruments,
  Patterns,
};

export default Preset;
