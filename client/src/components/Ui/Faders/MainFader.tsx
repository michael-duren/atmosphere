import React, { useEffect, useRef, useState } from 'react';
import { drawFader } from './drawFader.ts';
import { AnyAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';
import * as Tone from 'tone';
import { BsInfinity } from 'react-icons/bs';

interface Props {
  volume: number;
  backgroundColor: string;
  setTone: (num: number) => void;
  setStore: (num: number) => AnyAction;
  title: string;
  shadowColor: string;
}

export default function MainFader({
  volume,
  backgroundColor,
  setTone,
  setStore,
  title,
  shadowColor,
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
    drawFader(ctx, canvas.width, canvas.height, volumeValue * 100, 'black');
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
    console.log(newVolumeFixed);

    setVolumeValue(newVolumeFixed);
  };

  const handleVolumeFaderDragEnd = () => {
    setIsDragging(false);
    dispatch(setStore(volumeValue));
  };

  const volumeToDb = Math.floor(Tone.gainToDb(volumeValue));

  return (
    <div
      className={`w-10 shadow-xl pb-1 ${shadowColor}  rounded-lg flex flex-col items-center`}
    >
      <canvas
        className={`${backgroundColor} bg-opacity-90 rounded-lg`}
        ref={canvasRef}
        width={20}
        height={250}
        onMouseDown={handleVolumeFaderDragStart}
        onMouseMove={handleVolumeFaderDrag}
        onMouseUp={handleVolumeFaderDragEnd}
        onMouseLeave={handleVolumeFaderDragEnd}
      />
      <div className="text-center my-2 text-xs">
        {volumeToDb === -Infinity ? (
          <span className="flex items-center gap-1">
            -<BsInfinity className="mt-1" size={12} />
            db
          </span>
        ) : (
          <>
            {volumeToDb}
            <span className="ml-0.5">db</span>
          </>
        )}
      </div>
      <div className="text-xs uppercase font-caps">{title}</div>
    </div>
  );
}
