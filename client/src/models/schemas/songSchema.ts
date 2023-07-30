import * as Yup from 'yup';

export const songSchema = Yup.object().shape({
  songName: Yup.string().required('Song name is required'),
  masterVolume: Yup.number()
    .min(0)
    .max(1)
    .required('Master volume is required'),
  drumVolume: Yup.number().min(0).max(1).required('Drum volume is required'),
  bassVolume: Yup.number().min(0).max(1).required('Bass volume is required'),
  melodicVolume: Yup.number()
    .min(0)
    .max(1)
    .required('Melodic volume is required'),
  bpm: Yup.number().min(20).max(400).required('BPM is required'),
  distortion: Yup.object().shape({
    songId: Yup.number().optional(),
    id: Yup.number().optional(),
    mix: Yup.number().min(0).max(1).required('Distortion mix is required'),
    amount: Yup.number()
      .min(0)
      .max(1)
      .required('Distortion amount is required'),
    filterFrequency: Yup.number()
      .min(1)
      .max(22_000)
      .required('Distortion filter frequency is required'),
  }),
  reverb: Yup.object().shape({
    id: Yup.number().optional(),
    songId: Yup.number().optional(),
    mix: Yup.number().min(0).max(1).required('Reverb mix is required'),
    decay: Yup.number().min(0).max(1).required('Reverb decay is required'),
    preDelay: Yup.number()
      .min(0)
      .max(1)
      .required('Reverb pre-delay is required'),
  }),
  delay: Yup.object().shape({
    id: Yup.number().optional(),
    songId: Yup.number().optional(),
    mix: Yup.number().min(0).max(1).required('Delay mix is required'),
    time: Yup.number().min(0).max(1).required('Delay time is required'),
    feedback: Yup.number().min(0).max(1).required('Delay feedback is required'),
  }),
  bassSynth: Yup.object().shape({
    id: Yup.number().optional(),
    songId: Yup.number().optional(),
    attack: Yup.number().min(0).max(1).required('Bass attack is required'),
    decay: Yup.number().min(0).max(1).required('Bass decay is required'),
    sustain: Yup.number().min(0).max(1).required('Bass sustain is required'),
    release: Yup.number().min(0).max(1).required('Bass release is required'),
    waveform: Yup.string().required('Bass waveform is required'),
    filterFrequency: Yup.number()
      .min(1)
      .max(22_000)
      .required('Bass filter frequency is required'),
  }),
  melodicSynth: Yup.object().shape({
    id: Yup.number().optional(),
    songId: Yup.number().optional(),
    waveform: Yup.string().required('Melodic waveform is required'),
    attack: Yup.number().min(0).max(1).required('Melodic attack is required'),
    decay: Yup.number().min(0).max(1).required('Melodic decay is required'),
    sustain: Yup.number().min(0).max(1).required('Melodic sustain is required'),
    release: Yup.number().min(0).max(1).required('Melodic release is required'),
    filterFrequency: Yup.number()
      .min(1)
      .max(22_000)
      .required('Melodic filter frequency is required'),
    filterMod: Yup.number()
      .min(0)
      .max(1)
      .required('Melodic filter mod is required'),
    filterType: Yup.string().required('Melodic filter type is required'),
    metal: Yup.number().min(0).max(1).required('Melodic metal is required'),
    chorus: Yup.number().min(0).max(1).required('Melodic chorus is required'),
    lfoFrequency: Yup.string().required('Melodic LFO frequency is required'),
    lfoShape: Yup.string().required('Melodic LFO shape is required'),
  }),
  melodicPattern: Yup.object().shape({
    id: Yup.number().optional(),
    songId: Yup.number().optional(),
    key: Yup.string().required('Melodic key is required'),
    scale: Yup.string().required('Melodic scale is required'),
    sequence: Yup.array()
      .of(Yup.number())
      .required('Melodic sequence is required'),
    patternType: Yup.string().required('Melodic pattern type is required'),
    transpose: Yup.number().required('Melodic transpose is required'),
    timeInterval: Yup.string().required('Melodic time interval is required'),
    noteDuration: Yup.string().required('Melodic note duration is required'),
    length: Yup.number().required('Melodic length is required'),
  }),
  kitPattern: Yup.object().shape({
    id: Yup.number().optional(),
    songId: Yup.number().optional(),
    patternLength: Yup.number().required('Pattern length is required'),
    bdSteps: Yup.array().of(Yup.boolean()).required('BD steps is required'),
    sdSteps: Yup.array().of(Yup.boolean()).required('SD steps is required'),
    clSteps: Yup.array().of(Yup.boolean()).required('CL steps is required'),
    chSteps: Yup.array().of(Yup.boolean()).required('CH steps is required'),
  }),
});
