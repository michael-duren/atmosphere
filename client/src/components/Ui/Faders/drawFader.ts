export const drawFader = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  volume: number,
  backgroundColor: string
) => {
  ctx.clearRect(0, 0, width, height);

  // Draw the fader background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(width / 2 - 5, 0, 10, height);

  // Calculate the clamped handleY to keep the fader handle within the canvas
  const handleHeight = 15;
  const handleWidth = 18;
  const handleX = width / 2 - handleWidth / 2; // Center the handle within the fader background
  const handleY = Math.max(
    0,
    Math.min((1 - (volume + 7) / 100) * height, height - handleHeight) // move the handle as the volume changes
  );

  // Draw the fader handle
  ctx.strokeStyle = 'black';
  ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
  ctx.lineWidth = 1.25;

  ctx.beginPath();
  ctx.moveTo(handleX, handleY);
  ctx.lineTo(handleX + handleWidth, handleY);
  ctx.lineTo(handleX + handleWidth / 2, handleY + handleHeight);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};
