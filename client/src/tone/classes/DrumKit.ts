import * as Tone from 'tone';
import { Gain, Sampler } from 'tone';
import { DrumNames } from '../../models/song.ts';

class DrumKit {
  private readonly _note: string;
  private _bd: { name: DrumNames; id: number; sampler: Sampler };
  private _sd: { name: DrumNames; id: number; sampler: Sampler };
  private _cl: { name: DrumNames; id: number; sampler: Sampler };
  private _ch: { name: DrumNames; id: number; sampler: Sampler };
  private _output: Tone.Gain;

  constructor() {
    this._note = 'C2' as const;

    this._output = new Tone.Gain();

    this._bd = {
      id: 0,
      name: 'BD',
      sampler: new Tone.Sampler({
        urls: {
          [this._note]: '/sounds/vocal-kick.wav',
        },
      }),
    };

    this._sd = {
      id: 1,
      name: 'SD',
      sampler: new Tone.Sampler({
        urls: {
          [this._note]: '/sounds/snare.wav',
        },
      }),
    };

    this._cl = {
      id: 2,
      name: 'CL',
      sampler: new Tone.Sampler({
        urls: {
          [this._note]: '/sounds/clap.wav',
        },
      }),
    };

    this._ch = {
      id: 3,
      name: 'CH',
      sampler: new Tone.Sampler({
        urls: { [this._note]: '/sounds/closed-hat.wav' },
      }),
    };

    this._bd.sampler.connect(this._output);
    this._sd.sampler.connect(this._output);
    this._cl.sampler.connect(this._output);
    this._ch.sampler.connect(this._output);
  }
  get output(): Gain {
    return this._output;
  }
  set output(value: Gain) {
    this._output = value;
  }
  get ch(): { name: DrumNames; id: number; sampler: Sampler } {
    return this._ch;
  }
  set ch(value: { name: DrumNames; id: number; sampler: Sampler }) {
    this._ch = value;
  }
  get cl(): { name: DrumNames; id: number; sampler: Sampler } {
    return this._cl;
  }
  set cl(value: { name: DrumNames; id: number; sampler: Sampler }) {
    this._cl = value;
  }
  get sd(): { name: DrumNames; id: number; sampler: Sampler } {
    return this._sd;
  }
  set sd(value: { name: DrumNames; id: number; sampler: Sampler }) {
    this._sd = value;
  }
  get bd(): { name: DrumNames; id: number; sampler: Sampler } {
    return this._bd;
  }
  set bd(value: { name: DrumNames; id: number; sampler: Sampler }) {
    this._bd = value;
  }
  get note(): string {
    return this._note;
  }
}

export default DrumKit;
