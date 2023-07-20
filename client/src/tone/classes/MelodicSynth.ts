import * as Tone from 'tone';
import { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';
import { Chorus, Filter, FMSynth, LFO } from 'tone';

class MelodicSynth {
  private _synth: Tone.FMSynth;
  private _chorus: Chorus;
  private _filter: Filter;
  private _filterTwo: Filter;
  private _lfoFilter: LFO;

  /*
   * Initialize synth with effects and modulation
   */
  constructor(oscillatorType: OmniOscillatorType = 'fatsine2') {
    this._synth = new Tone.FMSynth();
    this._synth.oscillator.type = oscillatorType;

    // effects
    this._filter = new Tone.Filter(100, 'lowpass');
    this._filterTwo = new Tone.Filter(100, 'lowpass');
    this._filter.rolloff = -48;
    this._filter.Q.value = 1;
    this._chorus = new Tone.Chorus(500, 0.01, 1);

    // modulation
    this._lfoFilter = new Tone.LFO('8n', 400, 20000);
    this._lfoFilter.connect(this._filterTwo.frequency);

    // connect
    this._synth.chain(this._chorus, this._filter, this._filterTwo);
  }

  get lfoFilter(): LFO {
    return this._lfoFilter;
  }
  set lfoFilter(value: LFO) {
    this._lfoFilter = value;
  }
  get filterTwo(): Filter {
    return this._filterTwo;
  }
  set filterTwo(value: Filter) {
    this._filterTwo = value;
  }
  get filter(): Filter {
    return this._filter;
  }
  set filter(value: Filter) {
    this._filter = value;
  }
  get chorus(): Chorus {
    return this._chorus;
  }
  set chorus(value: Chorus) {
    this._chorus = value;
  }
  get synth(): FMSynth {
    return this._synth;
  }
  set synth(value: FMSynth) {
    this._synth = value;
  }
}

export default MelodicSynth;
