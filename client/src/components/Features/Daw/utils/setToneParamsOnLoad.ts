import { Song } from '../../../../models/song.ts';
import { delay, distortion, reverb } from '../../../../tone/singleton.ts';

export const setToneParamsOnLoad = (currentSong: Song) => {
  distortion.wet.value = currentSong.distortion.mix;
  distortion.distortion = currentSong.distortion.amount;

  reverb.wet.value = currentSong.reverb.mix;
  reverb.decay = currentSong.reverb.decay;
  reverb.preDelay = currentSong.reverb.preDelay;

  delay.wet.value = currentSong.delay.mix;
  delay.delayTime.value = currentSong.delay.time;
  delay.feedback.value = currentSong.delay.feedback;
};
