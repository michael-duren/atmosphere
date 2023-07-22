export const drawFader = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  volume: number,
  handleColor: string,
  backgroundColor: string
) => {
  ctx.clearRect(0, 0, width, height);

  // Draw the fader background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(width / 2 - 5, 0, 10, height);

  // Calculate the clamped handleY to keep the fader handle within the canvas
  const handleHeight = 15;
  const handleWidth = 30; // Adjust the handle width as per your preference
  const handleX = width / 2 - handleWidth / 2; // Center the handle within the fader background
  const handleY = Math.max(
    0,
    Math.min((1 - (volume + 7) / 100) * height, height - handleHeight)
  );

  const cornerRadius = 10; // Adjust the corner radius to make the handle rounded

  ctx.fillStyle = handleColor;
  ctx.strokeStyle = `${handleColor}EE`;

  ctx.beginPath();
  ctx.moveTo(handleX + cornerRadius, handleY);
  ctx.arcTo(
    handleX + handleWidth,
    handleY,
    handleX + handleWidth,
    handleY + handleHeight,
    cornerRadius
  );
  ctx.arcTo(
    handleX + handleWidth,
    handleY + handleHeight,
    handleX,
    handleY + handleHeight,
    cornerRadius
  );
  ctx.arcTo(handleX, handleY + handleHeight, handleX, handleY, cornerRadius);
  ctx.arcTo(handleX, handleY, handleX + handleWidth, handleY, cornerRadius);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};
