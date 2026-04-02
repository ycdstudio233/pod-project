import { ContactShadows, Environment } from "@react-three/drei";
import type { LightingMode } from "@/types/configurator";

interface SceneEnvironmentProps {
  lighting: LightingMode;
  interactive?: boolean;
}

export function SceneEnvironment({ interactive = false, lighting }: SceneEnvironmentProps) {
  const isDay = lighting === "day";
  const shadowMapSize = interactive ? 2048 : 1024;

  return (
    <>
      <ambientLight color={isDay ? "#ffffff" : "#8899bb"} intensity={isDay ? 0.44 : 0.22} />
      <hemisphereLight
        color="#fff1da"
        groundColor="#1a1520"
        intensity={isDay ? 0.8 : 0.18}
      />

      <directionalLight
        castShadow
        color={isDay ? "#fff1da" : "#7fa0ff"}
        intensity={isDay ? 1.85 : 0.62}
        position={[5.2, 7.4, 3.2]}
        shadow-mapSize-height={shadowMapSize}
        shadow-mapSize-width={shadowMapSize}
      />
      <spotLight
        color={isDay ? "#ffd4b8" : "#8de4d4"}
        intensity={isDay ? 0.36 : 1.05}
        penumbra={0.62}
        position={[-5.2, 4.2, 5.4]}
      />

      <ContactShadows
        blur={2.6}
        color={isDay ? "#1d1d1d" : "#000000"}
        far={5.4}
        opacity={isDay ? 0.32 : 0.6}
        position={[0, -0.98, 0]}
        scale={7}
      />

      <Environment background={false} environmentIntensity={0.78} preset="city" />
    </>
  );
}
