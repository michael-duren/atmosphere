import * as Tone from 'tone';
import { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';
import { Envelope, Filter, Synth } from 'tone';

class BassSynth {
  private _synth: Tone.Synth;
  private _filter: Filter;
  private _modFilter: Filter;
  private _filterEnvelope: Envelope;
  constructor(oscillatorType: OmniOscillatorType = 'fatsine2') {
    this._synth = new Tone.Synth();
    this._synth.oscillator.type = oscillatorType;
    this._filter = new Tone.Filter();
    this._modFilter = new Tone.Filter();
    this._filterEnvelope = new Tone.Envelope();
    this._synth.chain(this._filter, this._modFilter);
  }

  get synth(): Synth {
    return this._synth;
  }
  set synth(value: Synth) {
    this._synth = value;
  }
  get filter(): Filter {
    return this._filter;
  }
  set filter(value: Filter) {
    this._filter = value;
  }
  get modFilter(): Filter {
    return this._modFilter;
  }
  set modFilter(value: Filter) {
    this._modFilter = value;
  }
  get filterEnvelope(): Envelope {
    return this._filterEnvelope;
  }
  set filterEnvelope(value: Envelope) {
    this._filterEnvelope = value;
  }
}

export default BassSynth;
