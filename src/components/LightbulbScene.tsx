import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize, Resolution } from "postprocessing";
import * as THREE from "three";

function CameraLight() {
  const ref = useRef<THREE.DirectionalLight>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.copy(camera.position);
    }
  });

  return <directionalLight ref={ref} intensity={0.5} />;
}

function Lightbulb({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta;
  });
  return (
    <group>
      <mesh ref={ref}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={"gray"}
          emissive={color}
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent={true}
          opacity={0.1}
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[14, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent={true}
          opacity={0.1}
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[24, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent={true}
          opacity={0.05}
          toneMapped={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function LightbulbScene({ color }: { color: string }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas
        camera={{
          position: [0, 0, 20],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.3} />
        <CameraLight />
        <Lightbulb color={color} />
        <EffectComposer>
          <Bloom
            blurPass={undefined}
            kernelSize={KernelSize.LARGE}
            resolutionX={Resolution.AUTO_SIZE}
            resolutionY={Resolution.AUTO_SIZE}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.5}
            intensity={5}
            mipMap={true}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
