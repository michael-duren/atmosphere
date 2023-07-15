import { Canvas } from '@react-three/fiber';
import { Cloud, Stars } from '@react-three/drei';
import Moon from './Moon'

export default function MoonCanvas() {
  return (
    <div className="-z-10 absolute w-full h-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight />
        <pointLight color={'#000000'} position={[10, 10, 10]} intensity={1} />
        <Cloud args={[3, 2]} />
        <Cloud color={'#05bfdb'} position={[-4, -2, 0]} args={[3, 2]} />
        <Cloud color={'#635985'} position={[-4, 2, 0]} args={[3, 2]} />
        <Moon />
        <Stars />
      </Canvas>
    </div>
  );
}
