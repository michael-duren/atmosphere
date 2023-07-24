import { Song } from '../../models/song.ts';
import {
  bassSynth,
  delay,
  distortion,
  melodicSynth,
  reverb,
} from '../singleton.ts';

export const setToneParamsOnLoad = (currentSong: Song) => {
  distortion.wet.value = currentSong.distortion.mix;
  distortion.distortion = currentSong.distortion.amount;

  reverb.wet.value = currentSong.reverb.mix;
  reverb.decay = currentSong.reverb.decay;
  reverb.preDelay = currentSong.reverb.preDelay;

  delay.wet.value = currentSong.delay.mix;
  delay.delayTime.value = currentSong.delay.time;
  delay.feedback.value = currentSong.delay.feedback;

  melodicSynth.synth.envelope.attack = currentSong.melodicSynth.attack;
  melodicSynth.synth.envelope.decay = currentSong.melodicSynth.decay;
  melodicSynth.synth.envelope.sustain = currentSong.melodicSynth.sustain;
  melodicSynth.synth.envelope.release = currentSong.melodicSynth.release;
  melodicSynth.synth.oscillator.type = currentSong.melodicSynth.waveform;
  melodicSynth.chorus.wet.value = currentSong.melodicSynth.chorus;
  melodicSynth.filter.frequency.value =
    currentSong.melodicSynth.filterFrequency;
  melodicSynth.filter.type = currentSong.melodicSynth.filterType;
  melodicSynth.synth.modulationIndex.value = currentSong.melodicSynth.metal;
  melodicSynth.lfoFilter.frequency.value =
    currentSong.melodicSynth.lfoFrequency;
  melodicSynth.lfoFilter.type = currentSong.melodicSynth.lfoShape;
  melodicSynth.lfoFilter.min = currentSong.melodicSynth.filterMod;

  bassSynth.synth.envelope.attack = currentSong.bassSynth.attack;
};
