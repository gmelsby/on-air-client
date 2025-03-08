import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function CameraLight() {
  const ref = useRef<THREE.DirectionalLight>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.copy(camera.position);
    }
  });

  return (
    <directionalLight ref={ref} intensity={0.5} />
  );
}

function Lightbulb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current)
      (ref.current.rotation.x += delta);
  });
  return (
    <mesh
      ref={ref}>
      <boxGeometry args={[2, 2, 2,]} />
      <meshStandardMaterial />
    </mesh>

  );
}

export default function LightbulbScene() {

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.3} />
        <CameraLight />
        <Lightbulb />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}