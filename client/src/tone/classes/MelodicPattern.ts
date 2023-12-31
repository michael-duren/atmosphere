import * as Tone from 'tone';
import * as Tonal from 'tonal';
import { Pattern } from 'tone';
import { NoteName } from 'tonal';
import { modulo, random } from '../utils/utilities.ts';
import MelodicSynth from './MelodicSynth.ts';
import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import BassSynth from './BassSynth.ts';
import { MusicalKey } from '../../models/types/musicalKey.ts';
import { store } from '../../store/store.ts';
import { setIsPlaying } from '../../store/slices/transportSlice.ts';
import { setMelodicPatternSequence } from '../../store/slices/songSlice.ts';
import { MelodicPattern as MelodicPatternModel } from '../../models/song.ts';

class MelodicPattern {
  private _transpose: number;
  private _noteDuration: string;
  private _timeInterval: string;
  private _patternType: PatternName;
  private _melodyPattern: Pattern<number>;
  private _bassPattern: Pattern<number>;
  private _sequence: number[];
  private _notes: NoteName[];
  private readonly _melodySynth: MelodicSynth;
  private readonly _bassSynth: BassSynth;
  private _key: string;
  private _scale: string;
  private _length: number;
  private _noteChangeHandler: null | ((note: MusicalKey) => void) = null;
  constructor(
    melodySynth: MelodicSynth,
    bassSynth: BassSynth,
    transpose = 0,
    noteDuration = '64n',
    timeInterval = '32n',
    patternType: PatternName = 'upDown',
    key = 'C',
    scale = 'minor',
    length = 4
  ) {
    this._transpose = transpose;
    this._noteDuration = noteDuration;
    this._timeInterval = timeInterval;
    this._patternType = patternType;
    this._melodySynth = melodySynth;
    this._bassSynth = bassSynth;
    this._key = key;
    this._scale = scale;
    this._length = length;

    this._sequence = this.generateRandomSequence();
    // set sequence in store
    store.dispatch(setMelodicPatternSequence(this._sequence));
    this._notes = Tonal.Scale.get(`${this._key}4 ${this._scale}`).notes;

    this._melodyPattern = new Tone.Pattern(
      this.createMelodicPatternCallback,
      this._sequence,
      this._patternType
    );
    this._melodyPattern.interval = this._timeInterval;

    this._bassPattern = new Tone.Pattern(
      this.createBassPatternCallback,
      this._sequence,
      this._patternType
    );
    this._bassPattern.interval = '1n';
  }

  loadPattern(pattern: MelodicPatternModel) {
    const state = store.getState();
    const { isPlaying } = state.transport;
    const wasPlaying = isPlaying;
    if (isPlaying) {
      store.dispatch(setIsPlaying(false));
      Tone.Transport.stop();
      Tone.Transport.position = 0;
    }
    // set the params from the given pattern
    this._transpose = pattern.transpose;
    this._noteDuration = pattern.noteDuration;
    this._timeInterval = pattern.timeInterval;
    this._patternType = pattern.patternType;
    this._sequence = pattern.sequence;
    this._key = pattern.key;
    this._scale = pattern.scale;
    this._notes = Tonal.Scale.get(`${this._key}4 ${this._scale}`).notes;
    this._length = pattern.length;

    // update the melody pattern
    this._melodyPattern.callback = this.createMelodicPatternCallback();
    this._melodyPattern.values = this._sequence;
    this._melodyPattern.pattern = this.patternType;
    this._melodyPattern.interval = this._timeInterval;
    this._melodyPattern.start();

    // update the bass pattern
    this._bassPattern.callback = this.createBassPatternCallback();
    this._bassPattern.values = this._sequence.slice(0, 4);
    this._bassPattern.pattern = this.patternType;
    this._bassPattern.interval = '1n';
    this._bassPattern.start();

    // if was playing, start the transport again
    if (wasPlaying) {
      Tone.Transport.start();
      store.dispatch(setIsPlaying(true));
    }
  }

  generateNewPattern() {
    const state = store.getState();
    const { isPlaying } = state.transport;
    const wasPlaying = isPlaying;
    if (isPlaying) {
      store.dispatch(setIsPlaying(false));
      Tone.Transport.stop();
      Tone.Transport.position = 0;
    }
    this._sequence = this.generateRandomSequence();
    store.dispatch(setMelodicPatternSequence(this._sequence));

    this._notes = Tonal.Scale.get(`${this._key}4 ${this._scale}`).notes;
    this._melodyPattern.callback = this.createMelodicPatternCallback();
    this._melodyPattern.values = this._sequence;
    this._melodyPattern.pattern = this.patternType;
    this._melodyPattern.interval = this._timeInterval;
    this._melodyPattern.start();

    this._bassPattern.callback = this.createBassPatternCallback();
    this._bassPattern.values = this._sequence.slice(0, 4);
    this._bassPattern.pattern = this.patternType;
    this._bassPattern.interval = '1n';
    this._bassPattern.start();

    // set sequence in store
    store.dispatch(setMelodicPatternSequence(this._sequence));

    if (wasPlaying) {
      Tone.Transport.start();
      store.dispatch(setIsPlaying(true));
    }
  }

  updatePattern() {
    const state = store.getState();
    const { isPlaying } = state.transport;
    const wasPlaying = isPlaying;
    if (isPlaying) {
      store.dispatch(setIsPlaying(false));
      Tone.Transport.stop();
      Tone.Transport.position = 0;
    }
    this._notes = Tonal.Scale.get(`${this._key}4 ${this._scale}`).notes;
    this._melodyPattern.callback = this.createMelodicPatternCallback();
    this._melodyPattern.pattern = this.patternType;
    this._melodyPattern.interval = this._timeInterval;
    this._melodyPattern.start();

    this._bassPattern.callback = this.createBassPatternCallback();
    this._bassPattern.pattern = this.patternType;
    this._bassPattern.interval = '1n';
    this._bassPattern.start();
    if (wasPlaying) {
      Tone.Transport.start();
      store.dispatch(setIsPlaying(true));
    }
  }

  private mapNotes(noteNumber: number, notes: string[]): Tonal.NoteName {
    let numNotes = notes.length;
    // determine what note is below or above the current range
    let i = modulo(noteNumber, numNotes);
    //   if the note is too low or high determine octave
    const octave = Math.floor(noteNumber / numNotes);
    const interval = Tonal.Interval.fromSemitones(octave * 12);

    return Tonal.Note.transpose(notes[i], interval);
  }

  private createMelodicPatternCallback() {
    return (time: number, noteNumber?: number | undefined) => {
      const note = this.mapNotes(noteNumber! + this._transpose, this._notes);
      if (this._noteChangeHandler) this._noteChangeHandler(note as MusicalKey);
      this._melodySynth.synth.triggerAttackRelease(
        note,
        this._noteDuration,
        time
      );
    };
  }
  private createBassPatternCallback() {
    return (time: number, noteNumber?: number | undefined) => {
      const note = this.mapNotes(noteNumber! + -21, this._notes);
      this._bassSynth.synth.triggerAttackRelease(note, '2n', time);
    };
  }

  private generateRandomSequence(): number[] {
    const newSequence = [];
    //   number of notes in sequence
    const n = this._length;
    //   create random sequence
    for (let i = 0; i < n; i++) {
      newSequence[i] = Math.floor(random(0, 6));
    }

    return newSequence;
  }

  get sequence(): number[] {
    return this._sequence;
  }
  set sequence(value: number[]) {
    this._sequence = value;
  }
  get melodyPattern(): Pattern<number> {
    return this._melodyPattern;
  }
  set melodyPattern(value: Pattern<number>) {
    this._melodyPattern = value;
  }

  get bassPattern(): Pattern<number> {
    return this._bassPattern;
  }

  set bassPattern(value: Pattern<number>) {
    this._bassPattern = value;
  }
  get patternType(): PatternName {
    return this._patternType;
  }
  set patternType(value: PatternName) {
    this._patternType = value;
  }
  get timeInterval(): string {
    return this._timeInterval;
  }
  set timeInterval(value: string) {
    this._timeInterval = value;
  }
  get noteDuration(): string {
    return this._noteDuration;
  }
  set noteDuration(value: string) {
    this._noteDuration = value;
  }
  get transpose(): number {
    return this._transpose;
  }
  set transpose(value: number) {
    this._transpose = value;
  }
  get scale(): string {
    return this._scale;
  }
  set scale(value: string) {
    this._scale = value;
  }
  get key(): string {
    return this._key;
  }
  set key(value: string) {
    this._key = value;
  }
  get length(): number {
    return this._length;
  }
  set length(value: number) {
    this._length = value;
  }

  get noteChangeHandler(): ((note: MusicalKey) => void) | null {
    return this._noteChangeHandler;
  }

  set noteChangeHandler(value: ((note: MusicalKey) => void) | null) {
    this._noteChangeHandler = value;
  }
}

export default MelodicPattern;
