import { useEffect, useRef, useState } from 'react';
import { drawFader } from './drawFader.ts';

export default function MainFader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [volume, setVolume] = useState(1); // Default volume set to 0.5 (50%)
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    console.log(volume);

    // Draw the initial volume fader
    drawFader(
      ctx,
      canvas.width,
      canvas.height,
      volume * 100,
      '#FCA5A5',
      'black'
    );
  }, [volume]);

  const handleVolumeFaderDragStart = () => {
    setIsDragging(true);
  };

  const handleVolumeFaderDrag = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDragging) return;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const boundingRect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - boundingRect.top;
    const newVolume = Math.min(Math.max(0, 1 - mouseY / canvas.height), 1);

    setVolume(newVolume);
  };

  const handleVolumeFaderDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <canvas
        className={'bg-red-500 bg-opacity-90 rounded-lg'}
        ref={canvasRef}
        width={20} // Adjust width to your desired size
        height={250} // Adjust height to your desired size
        onMouseDown={handleVolumeFaderDragStart}
        onMouseMove={handleVolumeFaderDrag}
        onMouseUp={handleVolumeFaderDragEnd}
        onMouseLeave={handleVolumeFaderDragEnd}
      />
      <div className="text-center text-sm">{Math.floor(volume * 100)}</div>
    </div>
  );
}
