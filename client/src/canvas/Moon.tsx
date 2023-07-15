import { useRef } from 'react';
import { Mesh, Clock } from 'three';
import { useFrame } from '@react-three/fiber';

export default function Moon() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }: { clock: Clock }) => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32]} />
      <meshStandardMaterial color={'#a0a0a0'} />
    </mesh>
  );
}
