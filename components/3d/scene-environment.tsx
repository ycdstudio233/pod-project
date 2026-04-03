import {
  AccumulativeShadows,
  ContactShadows,
  Environment,
  Lightformer,
  RandomizedLight,
} from "@react-three/drei";
import type { LightingMode } from "@/types/configurator";

interface SceneEnvironmentProps {
  lighting: LightingMode;
  interactive?: boolean;
}

export function SceneEnvironment({ interactive = false, lighting }: SceneEnvironmentProps) {
  const isDay = lighting === "day";

  return (
    <>
      {/* Soft ambient fill */}
      <ambientLight color={isDay ? "#ffffff" : "#8899bb"} intensity={isDay ? 0.32 : 0.16} />

      {/* Hemisphere for sky/ground color bleed */}
      <hemisphereLight
        color={isDay ? "#e8f0ff" : "#3344667"}
        groundColor={isDay ? "#2a2018" : "#0a0810"}
        intensity={isDay ? 0.55 : 0.12}
      />

      {/* Key light — strong directional with good shadow */}
      <directionalLight
        castShadow
        color={isDay ? "#fff4e6" : "#7fa0ff"}
        intensity={isDay ? 2.2 : 0.7}
        position={[6, 8, 4]}
        shadow-mapSize-height={interactive ? 2048 : 1024}
        shadow-mapSize-width={interactive ? 2048 : 1024}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Fill light — opposite side, softer */}
      <directionalLight
        color={isDay ? "#d4e4ff" : "#445577"}
        intensity={isDay ? 0.6 : 0.2}
        position={[-4, 3, -2]}
      />

      {/* Rim / back light for edge definition */}
      <directionalLight
        color={isDay ? "#ffe8d0" : "#8de4d4"}
        intensity={isDay ? 0.8 : 0.45}
        position={[-3, 5, -5]}
      />

      {/* Top-down fill for roof/canopy highlights */}
      <directionalLight
        color="#ffffff"
        intensity={isDay ? 0.35 : 0.08}
        position={[0, 10, 0]}
      />

      {/* Accumulative soft shadows on ground plane — premium look */}
      {interactive ? (
        <AccumulativeShadows
          alphaTest={0.7}
          color={isDay ? "#1a1a1a" : "#000000"}
          colorBlend={2}
          frames={60}
          opacity={isDay ? 0.55 : 0.75}
          position={[0, -0.97, 0]}
          scale={12}
          temporal
        >
          <RandomizedLight
            ambient={0.4}
            amount={8}
            bias={0.001}
            intensity={isDay ? 1.2 : 0.6}
            position={[6, 8, 4]}
            radius={6}
            size={8}
          />
          <RandomizedLight
            ambient={0.3}
            amount={4}
            bias={0.001}
            intensity={isDay ? 0.4 : 0.2}
            position={[-4, 5, -3]}
            radius={4}
            size={6}
          />
        </AccumulativeShadows>
      ) : (
        <ContactShadows
          blur={2.8}
          color={isDay ? "#1a1a1a" : "#000000"}
          far={6}
          opacity={isDay ? 0.4 : 0.65}
          position={[0, -0.97, 0]}
          scale={10}
        />
      )}

      {/* Reflective ground plane — subtle, like a showroom floor */}
      <mesh position={[0, -0.98, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color={isDay ? "#e8eaed" : "#0c0e12"}
          envMapIntensity={isDay ? 0.3 : 0.15}
          metalness={isDay ? 0.05 : 0.1}
          roughness={isDay ? 0.85 : 0.7}
        />
      </mesh>

      {/* HDRI environment with custom lightformers for studio look */}
      <Environment background={false} environmentIntensity={isDay ? 0.9 : 0.5} resolution={256}>
        {/* Large overhead softbox — key studio element */}
        <Lightformer
          color={isDay ? "#ffffff" : "#aabbdd"}
          form="rect"
          intensity={isDay ? 1.8 : 0.6}
          position={[0, 5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 4, 1]}
        />
        {/* Front fill softbox */}
        <Lightformer
          color={isDay ? "#fff8f0" : "#6688aa"}
          form="rect"
          intensity={isDay ? 0.8 : 0.3}
          position={[0, 2, 5]}
          scale={[8, 3, 1]}
        />
        {/* Side accent — warm */}
        <Lightformer
          color={isDay ? "#ffe4c8" : "#8de4d4"}
          form="rect"
          intensity={isDay ? 0.5 : 0.4}
          position={[-5, 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[6, 2, 1]}
        />
        {/* Opposite side — cool fill */}
        <Lightformer
          color={isDay ? "#d8e8ff" : "#334466"}
          form="rect"
          intensity={isDay ? 0.4 : 0.2}
          position={[5, 1.5, -2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[5, 2, 1]}
        />
        {/* Ground bounce */}
        <Lightformer
          color={isDay ? "#f0ebe4" : "#1a1a22"}
          form="rect"
          intensity={isDay ? 0.3 : 0.1}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[10, 10, 1]}
        />
        {/* Back rim for edge highlights */}
        <Lightformer
          color={isDay ? "#ffffff" : "#8899cc"}
          form="ring"
          intensity={isDay ? 1.2 : 0.5}
          position={[0, 3, -6]}
          scale={3}
        />
      </Environment>
    </>
  );
}
