import { SongState } from '../songSlice.ts';

const initialSongState: SongState = {
  error: null,
  songList: [],
  currentSong: {
    songName: '',
    masterVolume: 0.75,
    drumVolume: 0.75,
    bassVolume: 0.75,
    melodicVolume: 0.75,
    bpm: 120,
    distortion: {
      mix: 0,
      amount: 0.5,
      filterFrequency: 22_000,
    },
    reverb: {
      mix: 0.25,
      decay: 0.5,
      preDelay: 0.2,
    },
    delay: {
      mix: 0.1,
      time: 0.5,
      feedback: 0.25,
    },
    bassSynth: {
      attack: 0,
      decay: 0.25,
      sustain: 1,
      release: 0.25,
      waveform: 'fatsawtooth',
      filterFrequency: 22_000,
    },
    melodicSynth: {
      waveform: 'fatsawtooth',
      attack: 0,
      decay: 0.25,
      sustain: 0.25,
      release: 0.25,
      filterFrequency: 22_000,
      filterMod: 22_000,
      filterType: 'lowpass',
      metal: 0,
      chorus: 0,
      lfoFrequency: '8n',
      lfoShape: 'sine2',
    },
    melodicPattern: {
      key: 'C',
      scale: 'major',
      sequence: [],
      patternType: 'up',
      transpose: 0,
      timeInterval: '8n',
      noteDuration: '8n',
      length: 4,
    },
    kitPattern: {
      patternLength: 16,
      bdSteps: new Array(16).fill(false) as boolean[],
      sdSteps: new Array(16).fill(false) as boolean[],
      clSteps: new Array(16).fill(false) as boolean[],
      chSteps: new Array(16).fill(false) as boolean[],
    },
  },
};

export default initialSongState;
