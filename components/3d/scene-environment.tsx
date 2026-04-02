import { ContactShadows } from "@react-three/drei";
import type { EnvironmentId, LightingMode } from "@/types/configurator";

interface SceneEnvironmentProps {
  environment: EnvironmentId;
  lighting: LightingMode;
  interactive?: boolean;
}

const environmentTheme = {
  desert: {
    day: "#e9b98f",
    night: "#0b0b0f",
    ground: "#4b3428",
    accent: "#d98f55",
  },
  forest: {
    day: "#7fa891",
    night: "#07100e",
    ground: "#1b2f29",
    accent: "#67a47f",
  },
  urban: {
    day: "#89a4d7",
    night: "#070a10",
    ground: "#141b29",
    accent: "#6f98da",
  },
} as const;

function DesertSet() {
  return (
    <group>
      <mesh castShadow position={[-2.5, -0.45, -1.8]} rotation={[0.08, 0.35, 0]}>
        <boxGeometry args={[1.4, 0.9, 1.1]} />
        <meshStandardMaterial color="#664437" roughness={0.94} />
      </mesh>
      <mesh castShadow position={[2.6, -0.5, -2.3]} rotation={[0, -0.22, 0.08]}>
        <boxGeometry args={[1.9, 1.05, 1.25]} />
        <meshStandardMaterial color="#7a5541" roughness={0.94} />
      </mesh>
      <mesh position={[0, -0.94, -1.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.8, 48]} />
        <meshStandardMaterial color="#704f39" roughness={1} />
      </mesh>
    </group>
  );
}

function ForestSet() {
  return (
    <group>
      {[
        [-2.5, -0.2, -1.7, 0.95],
        [-1.2, -0.15, -2.2, 0.8],
        [2.1, -0.25, -2, 1],
        [3.2, -0.18, -1.3, 0.68],
      ].map(([x, y, z, scale]) => (
        <group key={`${x}-${z}`} position={[x, y, z]} scale={scale}>
          <mesh castShadow position={[0, 0.32, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.64, 12]} />
            <meshStandardMaterial color="#4c3425" roughness={1} />
          </mesh>
          <mesh castShadow position={[0, 0.95, 0]}>
            <coneGeometry args={[0.42, 1.2, 12]} />
            <meshStandardMaterial color="#355e47" roughness={0.94} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.94, -1.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.8, 48]} />
        <meshStandardMaterial color="#244136" roughness={1} />
      </mesh>
    </group>
  );
}

function UrbanSet() {
  return (
    <group>
      {[
        [-3, -0.15, -2.1, 0.85],
        [-1.7, -0.15, -2.7, 1.05],
        [2.3, -0.15, -2.35, 0.9],
        [3.4, -0.15, -1.8, 0.72],
      ].map(([x, y, z, scale]) => (
        <mesh castShadow key={`${x}-${z}`} position={[x, y + scale * 0.7, z]} scale={scale}>
          <boxGeometry args={[0.9, 1.8, 0.9]} />
          <meshStandardMaterial color="#22324a" roughness={0.92} />
        </mesh>
      ))}
      <mesh position={[0, -0.94, -1.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.8, 48]} />
        <meshStandardMaterial color="#182131" roughness={1} />
      </mesh>
    </group>
  );
}

export function SceneEnvironment({ environment, interactive = false, lighting }: SceneEnvironmentProps) {
  const theme = environmentTheme[environment];
  const background = lighting === "day" ? theme.day : theme.night;
  const shadowMapSize = interactive ? 2048 : 1024;

  return (
    <>
      <color args={[background]} attach="background" />
      <fog args={[background, 10, 18]} attach="fog" />

      <ambientLight color={lighting === "day" ? "#ffffff" : "#93b6ff"} intensity={lighting === "day" ? 0.82 : 0.35} />
      <directionalLight
        castShadow
        color={lighting === "day" ? "#fff2d6" : "#7fa0ff"}
        intensity={lighting === "day" ? 2.1 : 0.54}
        position={[5, 7, 3.6]}
        shadow-mapSize-height={shadowMapSize}
        shadow-mapSize-width={shadowMapSize}
      />
      <spotLight
        color={lighting === "day" ? "#ffd0b4" : theme.accent}
        intensity={lighting === "day" ? 0.55 : 1.2}
        penumbra={0.6}
        position={[-4.6, 3.8, 4.5]}
      />

      <mesh position={[0, 3.8, -6]}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color={theme.accent} transparent opacity={lighting === "day" ? 0.12 : 0.2} />
      </mesh>
      <mesh position={[0, -1.04, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color={theme.ground} roughness={1} />
      </mesh>

      {environment === "desert" ? <DesertSet /> : null}
      {environment === "forest" ? <ForestSet /> : null}
      {environment === "urban" ? <UrbanSet /> : null}

      <ContactShadows
        blur={2}
        color={lighting === "day" ? "#1c1c1c" : "#000000"}
        far={4.8}
        opacity={lighting === "day" ? 0.35 : 0.58}
        position={[0, -0.98, 0]}
        scale={6.4}
      />
    </>
  );
}

