import { useRef } from 'react';
import { Mesh, Clock, TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import moonTexture from '../assets/images/texture-3.jpg';

export default function Moon() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }: { clock: Clock }) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32]} />
      <meshStandardMaterial
        map={new TextureLoader().load(moonTexture)}
        color={'#a0a0a0'}
      />
    </mesh>
  );
}
