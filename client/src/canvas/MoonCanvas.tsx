import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud, Stars } from '@react-three/drei';
import Moon from './Moon';

function CameraAnimation({
  zoom,
  time,
  initialZ,
}: {
  zoom: number;
  time: number;
  initialZ: number;
}) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const zoomFactor = Math.sin((clock.getElapsedTime() / time) * Math.PI * 2);
    camera.position.z = initialZ + zoomFactor * zoom;
  });

  return null;
}

export default function MoonCanvas() {
  return (
    <div className="-z-10 absolute w-full h-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight />
        <pointLight color={'#000000'} position={[10, 10, 10]} intensity={1} />
        <Cloud args={[3, 2]} />
        <Cloud color={'#05bfdb'} position={[-4, -2, 2]} args={[3, 2]} />
        <Cloud color={'#635985'} position={[-4, 2, 0]} args={[3, 2]} />
        <Cloud color={'#05bfdb'} position={[-4, -2, 10]} args={[3, 2]} />
        <Cloud color={'#635985'} position={[-4, 2, 10]} args={[3, 2]} />
        <Cloud args={[3, 2]} />
        <Cloud color={'#05bfdb'} position={[-4, -2, 2]} args={[3, 2]} />
        <Cloud color={'#635985'} position={[-4, 2, 0]} args={[3, 2]} />
        <Cloud color={'#05bfdb'} position={[-4, -2, 10]} args={[3, 2]} />
        <Cloud color={'#635985'} position={[-4, 2, 10]} args={[3, 2]} />
        <Moon />
        <Stars />
        <CameraAnimation zoom={8} time={30} initialZ={15} />
      </Canvas>
    </div>
  );
}
