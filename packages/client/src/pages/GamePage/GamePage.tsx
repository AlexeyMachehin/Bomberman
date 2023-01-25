import { useEffect, useRef } from 'react';
import { GameLoop } from '../../features/GameEngine/GameLoop';

export default function GamePage() {
  const canvasRef = useRef(null);

  const screenWidth = 500;
  const screenHeight = 500;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const gameLoop = new GameLoop({
      width: screenWidth,
      height: screenHeight,
      canvas: canvasRef.current,
    });
    gameLoop.run();
  }, []);

  return <canvas ref={canvasRef} width={screenHeight} height={screenHeight} />;
}
