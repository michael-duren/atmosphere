import * as Tone from 'tone';
import * as Tonal from 'tonal';
import { Pattern } from 'tone';
import { NoteName } from 'tonal';
import { modulo, random } from '../utils/utilities.ts';
import MelodicSynth from './MelodicSynth.ts';
import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import BassSynth from './BassSynth.ts';

class MelodicPattern {
  private _transpose: number;
  private _noteDuration: string;
  private _timeInterval: string;
  private _patternType: PatternName;
  private _melodyPattern: Pattern<number>;
  private _bassPattern: Pattern<number>;
  private _sequence: number[];
  private _notes: NoteName[];
  private _melodySynth: MelodicSynth;
  private _bassSynth: BassSynth;
  constructor(
    melodySynth: MelodicSynth,
    bassSynth: BassSynth,
    transpose = 0,
    noteDuration = '8n',
    timeInterval = '8n',
    patternType: PatternName = 'upDown'
  ) {
    this._transpose = transpose;
    this._noteDuration = noteDuration;
    this._timeInterval = timeInterval;
    this._patternType = patternType;
    this._melodySynth = melodySynth;
    this._bassSynth = bassSynth;

    this._sequence = this.generateRandomSequence();
    this._notes = Tonal.Scale.get('C4 minor').notes;

    this._melodyPattern = new Tone.Pattern(
      (time: number, noteNumber: number) => {
        const note = this.mapNotes(noteNumber + this._transpose, this._notes);
        this._melodySynth.synth.triggerAttackRelease(
          note,
          this._noteDuration,
          time
        );
      },
      this._sequence,
      this._patternType
    );
    this._melodyPattern.interval = this._timeInterval;

    this._bassPattern = new Tone.Pattern(
      (time: number, noteNumber: number) => {
        const note = this.mapNotes(noteNumber + -21, this._notes);
        console.log(note);
        this._bassSynth.synth.triggerAttackRelease(note, '2n', time);
      },
      this._sequence,
      this._patternType
    );
    this._bassPattern.interval = '1n';
  }

  mapNotes(noteNumber: number, notes: string[]): Tonal.NoteName {
    let numNotes = notes.length;
    // determine what note is below or above the current range
    let i = modulo(noteNumber, numNotes);
    //   if the note is too low or high determine octave
    const octave = Math.floor(noteNumber / numNotes);
    const interval = Tonal.Interval.fromSemitones(octave * 12);

    return Tonal.Note.transpose(notes[i], interval);
  }

  generateRandomSequence(): number[] {
    const newSequence = [];
    //   number of notes in sequence
    const n = Math.floor(random(3, 9));
    //   create random sequence
    for (let i = 0; i < n; i++) {
      newSequence[i] = Math.floor(random(0, 6));
    }
    return newSequence;
  }

  get melodySynth(): MelodicSynth {
    return this._melodySynth;
  }

  set melodySynth(value: MelodicSynth) {
    this._melodySynth = value;
  }
  get notes(): NoteName[] {
    return this._notes;
  }
  set notes(value: NoteName[]) {
    this._notes = value;
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
}

export default MelodicPattern;
