import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { bassSynth, melodicSynth } from '../../../../tone/singleton.ts';

export default function Oscilloscopes() {
  const canvasRefMelody = useRef<HTMLCanvasElement | null>(null);
  const canvasRefBass = useRef<HTMLCanvasElement | null>(null);
  const melodicWave = useRef<Tone.Waveform>(new Tone.Waveform(256));
  const bassWave = useRef<Tone.Waveform>(new Tone.Waveform(256));
  const [oscWidth, setOscWidth] = useState<number>(
    setCanvasWidth(window.innerWidth)
  );

  function setCanvasWidth(windowWidth: number) {
    if (windowWidth < 1280) {
      return windowWidth * 0.5;
    }
    return windowWidth * 0.13;
  }
  useEffect(() => {
    // Attach the handler
    const setWidth = () => setOscWidth(setCanvasWidth(window.innerWidth));
    window.addEventListener('resize', setWidth);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', setWidth);
  }, []);

  useEffect(() => {
    melodicSynth.synth.connect(melodicWave.current);
    bassSynth.synth.connect(bassWave.current);

    return () => {
      melodicSynth.synth.disconnect(melodicWave.current);
      melodicWave.current.dispose();
      bassSynth.synth.disconnect(bassWave.current); // Corrected to bassWave
      bassWave.current.dispose();
    };
  }, []);

  useEffect(() => {
    const melCanvas = canvasRefMelody.current;
    const bassCanvas = canvasRefBass.current; // Corrected to bassCanvas

    if (!melCanvas || !bassCanvas) return;

    const melCtx = melCanvas.getContext('2d');
    const bassCtx = bassCanvas.getContext('2d'); // Corrected to bassCtx

    if (!melCtx || !bassCtx) return;

    let melId: number;
    let bassId: number;

    const zoom = 1;
    const yScale = 2;

    const draw = (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      waveform: Float32Array, // Added to pass waveform
      idName: string
    ) => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      const visibleLength = Math.floor(waveform.length / zoom);

      for (let i = 0; i < visibleLength; i++) {
        const x = (i / visibleLength) * width;
        const y = (0.5 + (waveform[i] * yScale) / 2) * height;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'white';
      ctx.stroke();

      if (idName === 'melCanvas') {
        melId = requestAnimationFrame(() =>
          draw(canvas, ctx, melodicWave.current.getValue(), 'melCanvas')
        );
      } else if (idName === 'bassCanvas') {
        bassId = requestAnimationFrame(() =>
          draw(canvas, ctx, bassWave.current.getValue(), 'bassCanvas')
        );
      }
    };

    draw(melCanvas, melCtx, melodicWave.current.getValue(), 'melCanvas');
    draw(bassCanvas, bassCtx, bassWave.current.getValue(), 'bassCanvas'); // Added to draw bass waveform

    return () => {
      cancelAnimationFrame(melId);
      cancelAnimationFrame(bassId);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full justify-center items-center">
      <div>
        <h3 className="xl:text-lg text-base  font-caps">Melody</h3>
        <canvas
          height="100px"
          className="shadow-md rounded-xl shadow-gray-700"
          width={oscWidth}
          ref={canvasRefMelody}
        ></canvas>
      </div>
      <div>
        <h3 className="xl:text-lg text-base  font-caps">Bass</h3>
        <canvas
          className="shadow-md rounded-xl shadow-gray-700"
          height="100px"
          width={oscWidth}
          ref={canvasRefBass}
        ></canvas>
      </div>
    </div>
  );
}
