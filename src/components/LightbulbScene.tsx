import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize, Resolution } from "postprocessing";

import { useGLTF } from "@react-three/drei";

useGLTF.preload("/bulb/lightbulb.gltf");

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: AleixoAlonso (https://sketchfab.com/AleixoAlonso)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/incandescent-light-bulb-217c6b059c584243893b36ab76472ddd
Title: Incandescent Light Bulb
*/ export function Model({ color }: { color: string }) {
  const { nodes, materials } = useGLTF("/bulb/lightbulb.gltf");
  return (
    <group dispose={null} position={[0, -2, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={45}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.LMP0002_Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.LMP0002_GlassNo_Refraction}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.LMP0002_Plexiglass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_7.geometry}
            material={materials.LMP0002_Conductor}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.LMP0002_Filament}
          />
          <mesh castShadow receiveShadow geometry={nodes.Object_9.geometry}>
            <meshStandardMaterial
              color={"gray"}
              emissive={color}
              emissiveIntensity={15}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
      <pointLight
        intensity={75}
        decay={1}
        color={color}
        position={[0, 5.3, -3]}
      />
    </group>
  );
}

function Backdrop() {
  return (
    <mesh position={[0, 0, -10]}>
      <boxGeometry args={[100, 100, 3]} />
      <meshStandardMaterial color={"gray"} roughness={0.9} metalness={0.7} />
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
        <Model color={color} />
        <EffectComposer>
          <Bloom
            blurPass={undefined}
            kernelSize={KernelSize.LARGE}
            resolutionX={Resolution.AUTO_SIZE}
            resolutionY={Resolution.AUTO_SIZE}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.5}
            intensity={10}
            mipMap={true}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
