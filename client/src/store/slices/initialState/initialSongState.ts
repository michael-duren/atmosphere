import { SongState } from '../songSlice.ts';

const initialSongState: SongState = {
  error: null,
  songList: [],
  currentSong: {
    songName: '',
    masterVolume: 1,
    drumVolume: 1,
    bassVolume: 1,
    melodicVolume: 1,
    bpm: 120,
    distortion: {
      mix: 0,
      amount: 0.5,
      filter: 1,
    },
    reverb: {
      mix: 0,
      decay: 0.5,
      preDelay: 0.2,
    },
    delay: {
      mix: 0,
      time: 0.5,
      feedback: 0.25,
    },
    bassSynth: {
      attack: 0,
      decay: 0,
      waveform: 'fatsine2',
      filter: 1,
    },
    melodicSynth: {
      waveform: 'fatsine1',
      attack: 0,
      decay: 0.5,
      sustain: 1,
      release: 0.5,
      filterFrequency: 22_000,
      filterMod: 0,
      filterType: 'lowpass',
      metal: 0,
      chorus: 0,
      lfoFrequency: '8n',
      lfoShape: 'sine2',
    },
    melodicPattern: {
      scale: 'C4 minor',
      sequence: [],
      patternType: 'up',
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
