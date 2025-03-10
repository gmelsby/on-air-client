import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize, Resolution } from "postprocessing";
import * as THREE from "three";

function Lightbulb({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
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

      <pointLight intensity={75} decay={1} color={color} />
    </group>
  );
}

function Backdrop() {
  return (
    <mesh position={[0, 0, -10]}>
      <boxGeometry args={[100, 100, 3]} />
      <meshStandardMaterial color={"gray"} roughness={0.4} metalness={0.5} />
    </mesh>
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
        <ambientLight intensity={0.5} />
        <Backdrop />
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
