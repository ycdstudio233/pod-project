import { ContactShadows, Environment } from "@react-three/drei";
import { Component, Suspense, type ReactNode } from "react";
import type { EnvironmentId, LightingMode } from "@/types/configurator";

interface SceneEnvironmentProps {
  environment: EnvironmentId;
  lighting: LightingMode;
  interactive?: boolean;
}

const environmentTheme = {
  desert: {
    sky: "#f2c9a2",
    fog: "#cf8c5b",
    nightSky: "#090a0e",
    ground: "#7d5a43",
    accent: "#ffd1a0",
    hdri: "/hdri/desert.hdr",
  },
  forest: {
    sky: "#a3c4b3",
    fog: "#456a57",
    nightSky: "#07100e",
    ground: "#2c4d3d",
    accent: "#d5f2dc",
    hdri: "/hdri/forest.hdr",
  },
  urban: {
    sky: "#9ac3e6",
    fog: "#60758a",
    nightSky: "#080d14",
    ground: "#5b6872",
    accent: "#eaf3ff",
    hdri: "/hdri/urban.hdr",
  },
} as const;

class HdriLightingBoundary extends Component<
  { children: ReactNode; resetKey: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: { resetKey: string }) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

function PineTree({
  position,
  scale = 1,
  trunkColor,
  leafColor,
}: {
  position: [number, number, number];
  scale?: number;
  trunkColor: string;
  leafColor: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 10]} />
        <meshStandardMaterial color={trunkColor} roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 1.08, 0]}>
        <coneGeometry args={[0.48, 1.28, 14]} />
        <meshStandardMaterial color={leafColor} roughness={0.92} />
      </mesh>
      <mesh castShadow position={[0, 1.52, 0]}>
        <coneGeometry args={[0.32, 0.9, 14]} />
        <meshStandardMaterial color={leafColor} roughness={0.92} />
      </mesh>
    </group>
  );
}

function CanopyTree({
  position,
  scale = 1,
  trunkColor,
  leafColor,
}: {
  position: [number, number, number];
  scale?: number;
  trunkColor: string;
  leafColor: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.1, 0.14, 1.12, 10]} />
        <meshStandardMaterial color={trunkColor} roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.58, 18, 18]} />
        <meshStandardMaterial color={leafColor} roughness={0.94} />
      </mesh>
      <mesh castShadow position={[-0.34, 1.34, 0]}>
        <sphereGeometry args={[0.3, 18, 18]} />
        <meshStandardMaterial color={leafColor} roughness={0.94} />
      </mesh>
      <mesh castShadow position={[0.34, 1.32, 0.06]}>
        <sphereGeometry args={[0.34, 18, 18]} />
        <meshStandardMaterial color={leafColor} roughness={0.94} />
      </mesh>
    </group>
  );
}

function BaseAtmosphere({
  environment,
  lighting,
}: {
  environment: EnvironmentId;
  lighting: LightingMode;
}) {
  const theme = environmentTheme[environment];
  const isDay = lighting === "day";
  const background = isDay ? theme.sky : theme.nightSky;
  const fog = isDay ? theme.fog : theme.nightSky;

  return (
    <>
      <color args={[background]} attach="background" />
      <fog args={[fog, 12, 24]} attach="fog" />
      <ambientLight color={isDay ? "#ffffff" : "#8fa9d9"} intensity={isDay ? 0.44 : 0.22} />
      <hemisphereLight
        color={isDay ? theme.accent : "#7f96c1"}
        groundColor={isDay ? theme.ground : "#0d1016"}
        intensity={isDay ? 0.8 : 0.18}
      />
      <mesh position={[0, 7.4, -14]}>
        <sphereGeometry args={[2.45, 32, 32]} />
        <meshBasicMaterial color={isDay ? theme.accent : "#9cbcff"} transparent opacity={isDay ? 0.18 : 0.1} />
      </mesh>
    </>
  );
}

function DesertSet({ lighting }: { lighting: LightingMode }) {
  const isDay = lighting === "day";

  return (
    <group>
      <mesh position={[0, 1.1, -11]}>
        <boxGeometry args={[9.2, 2.2, 1.4]} />
        <meshStandardMaterial color={isDay ? "#986a51" : "#35261f"} roughness={0.96} />
      </mesh>
      <mesh position={[-4.6, 0.86, -9.2]}>
        <boxGeometry args={[3.4, 1.7, 1.2]} />
        <meshStandardMaterial color={isDay ? "#8b6048" : "#30231d"} roughness={0.98} />
      </mesh>
      <mesh position={[4.8, 0.92, -9.6]}>
        <boxGeometry args={[4, 1.84, 1.26]} />
        <meshStandardMaterial color={isDay ? "#a17054" : "#392821"} roughness={0.98} />
      </mesh>

      {[
        [-2.8, -0.52, -2.2, [1.2, 0.66, 0.94], 0.18],
        [2.6, -0.48, -2.8, [1.6, 0.86, 1.08], -0.16],
        [0.6, -0.58, -3.8, [0.9, 0.54, 0.82], 0.08],
      ].map(([x, y, z, dims, rot]) => (
        <mesh castShadow key={`${x}-${z}`} position={[x as number, y as number, z as number]} rotation={[0.04, rot as number, 0.06]}>
          <boxGeometry args={dims as [number, number, number]} />
          <meshStandardMaterial color={isDay ? "#7c5541" : "#2a201d"} roughness={0.98} />
        </mesh>
      ))}
    </group>
  );
}

function ForestSet({ lighting }: { lighting: LightingMode }) {
  const leafColor = lighting === "day" ? "#335a46" : "#16271f";

  return (
    <group>
      <mesh position={[0, 1.15, -11]}>
        <boxGeometry args={[10.5, 2.3, 1.2]} />
        <meshStandardMaterial color={lighting === "day" ? "#294537" : "#0f1b15"} roughness={1} />
      </mesh>

      <PineTree leafColor={leafColor} position={[-4.4, -0.2, -4.3]} scale={1.2} trunkColor="#4a3227" />
      <PineTree leafColor={leafColor} position={[-2.6, -0.2, -5.2]} scale={0.95} trunkColor="#4a3227" />
      <PineTree leafColor={leafColor} position={[3.4, -0.2, -4.9]} scale={1.18} trunkColor="#4a3227" />
      <PineTree leafColor={leafColor} position={[4.8, -0.2, -6.1]} scale={0.9} trunkColor="#4a3227" />
      <CanopyTree leafColor={lighting === "day" ? "#406d56" : "#1c3328"} position={[0.2, -0.16, -6.3]} scale={1.25} trunkColor="#55392c" />

      <mesh position={[-2.1, -0.92, -4.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.2, 28]} />
        <meshStandardMaterial color={lighting === "day" ? "#2f5a43" : "#15241d"} roughness={1} />
      </mesh>
      <mesh position={[2.8, -0.92, -5.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.35, 28]} />
        <meshStandardMaterial color={lighting === "day" ? "#244936" : "#122019"} roughness={1} />
      </mesh>
    </group>
  );
}

function BackyardSet({ lighting }: { lighting: LightingMode }) {
  const isDay = lighting === "day";

  return (
    <group>
      <mesh position={[0.6, 1.52, -9.4]}>
        <boxGeometry args={[9.8, 3.04, 0.88]} />
        <meshStandardMaterial color={isDay ? "#c6c8cc" : "#2a2f36"} roughness={0.94} />
      </mesh>
      <mesh position={[0.6, 2.94, -9.18]} rotation={[0.14, 0, 0]}>
        <boxGeometry args={[10.2, 0.28, 1.72]} />
        <meshStandardMaterial color={isDay ? "#756d67" : "#1b2027"} roughness={0.88} />
      </mesh>

      {[-5.1, -3.7, -2.3, -0.9, 0.5, 1.9, 3.3, 4.7].map((x) => (
        <mesh castShadow key={x} position={[x, 0.2, -5.2]}>
          <boxGeometry args={[1.12, 1.7, 0.08]} />
          <meshStandardMaterial color={isDay ? "#b8a289" : "#28231f"} roughness={1} />
        </mesh>
      ))}
      <mesh position={[0, 0.72, -5.32]}>
        <boxGeometry args={[10.4, 0.1, 0.2]} />
        <meshStandardMaterial color={isDay ? "#947e67" : "#211c19"} roughness={1} />
      </mesh>

      <mesh position={[0, -0.9, -1.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8.2, 8.2]} />
        <meshStandardMaterial color={isDay ? "#54745e" : "#19231e"} roughness={1} />
      </mesh>
      <mesh position={[0.6, -0.88, -2.84]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.8, 2.8]} />
        <meshStandardMaterial color={isDay ? "#a9afb9" : "#262d37"} roughness={0.98} />
      </mesh>

      <CanopyTree leafColor={isDay ? "#4f7b5c" : "#1d3126"} position={[-4.2, -0.18, -6.2]} scale={1.15} trunkColor="#644337" />
      <CanopyTree leafColor={isDay ? "#557e61" : "#22372a"} position={[4.6, -0.18, -6.8]} scale={0.9} trunkColor="#644337" />

      {[
        [-0.8, 1.48, -8.92],
        [1.1, 1.48, -8.92],
        [3, 1.48, -8.92],
      ].map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} position={[x, y, z]}>
          <planeGeometry args={[1.18, 1.12]} />
          <meshStandardMaterial
            color={isDay ? "#dfe8f3" : "#f0d797"}
            emissive={isDay ? "#15191f" : "#f0cf7c"}
            emissiveIntensity={isDay ? 0.02 : 0.65}
            roughness={0.18}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SceneEnvironment({ environment, interactive = false, lighting }: SceneEnvironmentProps) {
  const theme = environmentTheme[environment];
  const isDay = lighting === "day";
  const shadowMapSize = interactive ? 2048 : 1024;

  return (
    <>
      <BaseAtmosphere environment={environment} lighting={lighting} />

      {isDay ? (
        <HdriLightingBoundary resetKey={`${environment}-${lighting}`}>
          <Suspense fallback={null}>
            <Environment background={false} environmentIntensity={0.78} files={theme.hdri} />
          </Suspense>
        </HdriLightingBoundary>
      ) : null}

      <directionalLight
        castShadow
        color={isDay ? "#fff1da" : "#7fa0ff"}
        intensity={isDay ? 1.85 : 0.62}
        position={[5.2, 7.4, 3.2]}
        shadow-mapSize-height={shadowMapSize}
        shadow-mapSize-width={shadowMapSize}
      />
      <spotLight
        color={isDay ? "#ffd4b8" : theme.accent}
        intensity={isDay ? 0.36 : 1.05}
        penumbra={0.62}
        position={[-5.2, 4.2, 5.4]}
      />

      <mesh position={[0, -1.04, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color={theme.ground} roughness={1} />
      </mesh>

      {environment === "desert" ? <DesertSet lighting={lighting} /> : null}
      {environment === "forest" ? <ForestSet lighting={lighting} /> : null}
      {environment === "urban" ? <BackyardSet lighting={lighting} /> : null}

      <ContactShadows
        blur={2.6}
        color={lighting === "day" ? "#1d1d1d" : "#000000"}
        far={5.4}
        opacity={lighting === "day" ? 0.32 : 0.6}
        position={[0, -0.98, 0]}
        scale={7}
      />
    </>
  );
}
