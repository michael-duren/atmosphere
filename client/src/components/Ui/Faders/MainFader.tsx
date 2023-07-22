import { useEffect, useRef, useState } from 'react';
import { drawFader } from './drawFader.ts';
import { AnyAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';

interface Props {
  volume: number;
  handleColor: string;
  backgroundColor: string;
  setTone: (num: number) => void;
  setStore: (num: number) => AnyAction;
}

export default function MainFader({
  volume,
  handleColor,
  backgroundColor,
  setTone,
  setStore,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [volumeValue, setVolumeValue] = useState<number>(volume); // [0, 1
  const dispatch = useAppDispatch();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the initial volume fader
    drawFader(
      ctx,
      canvas.width,
      canvas.height,
      volumeValue * 100,
      handleColor,
      'black'
    );
  }, [volumeValue]);

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
    const newVolumeFixed = +newVolume.toFixed(2);

    setTone(newVolumeFixed);

    setVolumeValue(newVolumeFixed);
  };

  const handleVolumeFaderDragEnd = () => {
    setIsDragging(false);
    dispatch(setStore(volumeValue));
  };

  return (
    <div>
      <canvas
        className={`${backgroundColor} bg-opacity-90 rounded-lg`}
        ref={canvasRef}
        width={20} // Adjust width to your desired size
        height={250} // Adjust height to your desired size
        onMouseDown={handleVolumeFaderDragStart}
        onMouseMove={handleVolumeFaderDrag}
        onMouseUp={handleVolumeFaderDragEnd}
        onMouseLeave={handleVolumeFaderDragEnd}
      />
      <div className="text-center text-sm">{Math.floor(volumeValue * 100)}</div>
    </div>
  );
}
