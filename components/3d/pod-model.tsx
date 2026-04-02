import { RoundedBox, useGLTF } from "@react-three/drei";
import { Component, Suspense, useMemo, type ReactNode } from "react";
import {
  Box3,
  Color,
  Material,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  type Object3D,
  Vector3,
} from "three";
import type { FinishId, LightingMode, PodSize, WindowStyle } from "@/types/configurator";

interface PodModelProps {
  size: PodSize;
  finish: FinishId;
  windowStyle: WindowStyle;
  lighting: LightingMode;
}

const finishPalette: Record<FinishId, string> = {
  glacier: "#e8edf3",
  basalt: "#5f6978",
  dune: "#c8b8a3",
  sage: "#93a596",
};

const placeholderSizeScale: Record<PodSize, [number, number, number]> = {
  S: [0.92, 0.95, 0.9],
  M: [1.06, 1, 1],
  L: [1.22, 1.05, 1.15],
};

const uploadedModelScale: Record<PodSize, number> = {
  S: 0.9,
  M: 1,
  L: 1.12,
};

const UPLOADED_MODEL_PATH = "/models/pod-model.glb";

const SHELL_HINTS = ["shell", "body", "exterior", "outer", "panel", "cladding", "color"];
const GLASS_HINTS = ["glass", "window", "glazing", "pane"];
const TRIM_HINTS = ["trim", "frame", "edge", "base", "roof", "rail", "black", "chrome"];
const LIGHT_HINTS = ["light", "lamp", "emissive", "interior-glow"];

// Exported so future UI logic can adapt when a baked GLB is active.
export const UPLOADED_MODEL_ACTIVE = true;

function matchesHint(label: string, hints: string[]) {
  return hints.some((hint) => label.includes(hint));
}

function getMaterialLabel(nodeName: string, material: Material) {
  return `${nodeName} ${material.name}`.toLowerCase();
}

function tuneMaterial(material: Material, label: string, finishColor: Color, lighting: LightingMode) {
  if (!(material instanceof MeshStandardMaterial || material instanceof MeshPhysicalMaterial)) {
    return material;
  }

  const tuned = material.clone();
  const isGlass = matchesHint(label, GLASS_HINTS);
  const isTrim = matchesHint(label, TRIM_HINTS);
  const isLight = matchesHint(label, LIGHT_HINTS);
  const isNamedShell = matchesHint(label, SHELL_HINTS);

  if (isGlass) {
    tuned.color.set("#b7cad3");
    tuned.transparent = true;
    tuned.opacity = lighting === "day" ? 0.42 : 0.28;
    tuned.depthWrite = false;
    tuned.envMapIntensity = lighting === "day" ? 1.12 : 0.46;
    tuned.roughness = 0.06;
    tuned.metalness = 0;
    if (tuned instanceof MeshPhysicalMaterial) {
      tuned.attenuationDistance = 1.8;
      tuned.attenuationColor = new Color("#c8d8de");
      tuned.transmission = 0.84;
      tuned.thickness = 0.08;
      tuned.ior = 1.42;
      tuned.clearcoat = 0.18;
      tuned.clearcoatRoughness = 0.18;
    }
    return tuned;
  }

  if (isTrim) {
    tuned.color.set("#10151c");
    tuned.envMapIntensity = lighting === "day" ? 0.9 : 0.34;
    tuned.roughness = 0.48;
    tuned.metalness = Math.max(tuned.metalness, 0.2);
    if (tuned instanceof MeshPhysicalMaterial) {
      tuned.clearcoat = Math.max(tuned.clearcoat, 0.12);
      tuned.clearcoatRoughness = 0.44;
    }
    return tuned;
  }

  if (isLight) {
    tuned.emissive.set(lighting === "night" ? "#f1ca78" : "#16120f");
    tuned.emissiveIntensity = lighting === "night" ? 1.25 : 0.05;
    return tuned;
  }

  const looksLikeBodyFallback =
    !tuned.map && !tuned.transparent && tuned.opacity > 0.92 && !isTrim && !isGlass && !isLight;

  if (isNamedShell || looksLikeBodyFallback) {
    tuned.color.copy(finishColor);
    tuned.envMapIntensity = lighting === "day" ? 1.08 : 0.42;
    tuned.metalness = Math.max(tuned.metalness, 0.14);
    if (!tuned.roughnessMap) {
      tuned.roughness = Math.max(tuned.roughness, 0.52);
    }
    if (tuned instanceof MeshPhysicalMaterial) {
      tuned.clearcoat = Math.max(tuned.clearcoat, 0.24);
      tuned.clearcoatRoughness = 0.58;
    }
  }

  return tuned;
}

function UploadedPodAsset({ finish, lighting, size }: Pick<PodModelProps, "finish" | "lighting" | "size">) {
  const { scene } = useGLTF(UPLOADED_MODEL_PATH);
  const finishColor = useMemo(() => new Color(finishPalette[finish]), [finish]);

  const { centeredScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((node) => {
      const mesh = node as Object3D & {
        castShadow?: boolean;
        receiveShadow?: boolean;
        isMesh?: boolean;
        material?: Material | Material[];
        name?: string;
      };

      if ("castShadow" in mesh) {
        mesh.castShadow = true;
      }

      if ("receiveShadow" in mesh) {
        mesh.receiveShadow = true;
      }

      if (mesh.isMesh && mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((material) => tuneMaterial(material, getMaterialLabel(mesh.name ?? "", material), finishColor, lighting));
        } else {
          mesh.material = tuneMaterial(mesh.material, getMaterialLabel(mesh.name ?? "", mesh.material), finishColor, lighting);
        }
      }
    });

    const box = new Box3().setFromObject(clone);
    const dimensions = new Vector3();
    const center = new Vector3();
    box.getSize(dimensions);
    box.getCenter(center);
    const maxDimension = Math.max(dimensions.x, dimensions.y, dimensions.z) || 1;
    clone.position.set(-center.x, -box.min.y, -center.z);

    return {
      centeredScene: clone,
      normalizedScale: 3.25 / maxDimension,
    };
  }, [finishColor, lighting, scene]);

  return (
    <group position={[0, -0.92, 0]} scale={normalizedScale * uploadedModelScale[size]}>
      <primitive object={centeredScene} />
      {lighting === "night" ? <pointLight color="#f8ca74" intensity={4.6} position={[0.78, 0.52, 0.26]} /> : null}
    </group>
  );
}

function PlaceholderPodAsset({ finish, lighting, size, windowStyle }: PodModelProps) {
  const shell = finishPalette[finish];
  const trim = lighting === "day" ? "#171d24" : "#0f151b";
  const glassOpacity = lighting === "day" ? 0.34 : 0.48;

  return (
    <group position={[0, -0.02, 0]} scale={placeholderSizeScale[size]}>
        <mesh castShadow position={[0, -0.93, 0]} receiveShadow>
          <boxGeometry args={[4.12, 0.12, 2.52]} />
          <meshStandardMaterial color="#0b1017" metalness={0.25} roughness={0.82} />
        </mesh>

        <RoundedBox args={[3.94, 1.62, 2.28]} castShadow receiveShadow radius={0.22} smoothness={5}>
          <meshStandardMaterial color={shell} metalness={0.22} roughness={0.78} />
        </RoundedBox>

        <RoundedBox args={[3.76, 1.42, 2.1]} castShadow position={[0, 0.01, 0.02]} receiveShadow radius={0.18} smoothness={5}>
          <meshStandardMaterial color={shell} metalness={0.18} roughness={0.88} />
        </RoundedBox>

        <mesh castShadow position={[0.1, 0.92, -0.12]}>
          <boxGeometry args={[2.4, 0.05, 1.1]} />
          <meshStandardMaterial color="#1b232c" metalness={0.32} roughness={0.72} />
        </mesh>

        <RoundedBox args={[0.82, 1.16, 0.13]} position={[-0.74, 0.02, 1.09]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#d7dee7" metalness={0.16} roughness={0.66} />
        </RoundedBox>
        <RoundedBox args={[0.56, 0.92, 0.07]} position={[-0.74, -0.02, 1.15]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#151c23" metalness={0.28} roughness={0.52} />
        </RoundedBox>

        <mesh position={[-1.54, 0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.28, 1.08]} />
          <meshStandardMaterial color="#1a222b" roughness={0.74} metalness={0.2} />
        </mesh>

        <mesh position={[1.22, -0.2, 0.44]}>
          <boxGeometry args={[0.74, 0.36, 0.62]} />
          <meshStandardMaterial
            color="#ece8e1"
            emissive={lighting === "night" ? "#f3c769" : "#1b1712"}
            emissiveIntensity={lighting === "night" ? 1.2 : 0.1}
            roughness={0.88}
          />
        </mesh>

        {windowStyle === "panorama" ? (
          <>
            <RoundedBox args={[1.3, 1.22, 0.28]} position={[1.08, 0.04, 1.03]} radius={0.12} smoothness={4}>
              <meshPhysicalMaterial
                color="#9bc6ff"
                metalness={0}
                opacity={glassOpacity}
                roughness={0.06}
                thickness={0.1}
                transparent
                transmission={0.56}
              />
            </RoundedBox>
            <RoundedBox args={[0.28, 1.22, 1.32]} position={[1.72, 0.04, 0.46]} radius={0.12} smoothness={4}>
              <meshPhysicalMaterial
                color="#9bc6ff"
                metalness={0}
                opacity={glassOpacity}
                roughness={0.06}
                thickness={0.1}
                transparent
                transmission={0.56}
              />
            </RoundedBox>
          </>
        ) : null}

        {windowStyle === "corner" ? (
          <>
            <RoundedBox args={[1.16, 1.16, 0.3]} position={[1.16, 0.05, 1.02]} radius={0.12} smoothness={4}>
              <meshPhysicalMaterial
                color="#8dc3ff"
                metalness={0}
                opacity={glassOpacity}
                roughness={0.08}
                thickness={0.12}
                transparent
                transmission={0.52}
              />
            </RoundedBox>
            <RoundedBox args={[0.32, 1.16, 1.18]} position={[1.72, 0.05, 0.5]} radius={0.12} smoothness={4}>
              <meshPhysicalMaterial
                color="#8dc3ff"
                metalness={0}
                opacity={glassOpacity}
                roughness={0.08}
                thickness={0.12}
                transparent
                transmission={0.52}
              />
            </RoundedBox>
            <RoundedBox args={[1.2, 0.42, 0.18]} position={[0.28, 0.4, 1.1]} radius={0.08} smoothness={4}>
              <meshPhysicalMaterial
                color="#b7d8ff"
                metalness={0}
                opacity={glassOpacity - 0.04}
                roughness={0.08}
                thickness={0.08}
                transparent
                transmission={0.42}
              />
            </RoundedBox>
          </>
        ) : null}

        {windowStyle === "split" ? (
          <>
            <RoundedBox args={[1.04, 0.36, 0.18]} position={[0.95, 0.44, 1.11]} radius={0.08} smoothness={4}>
              <meshPhysicalMaterial
                color="#a6cfff"
                metalness={0}
                opacity={glassOpacity}
                roughness={0.08}
                thickness={0.08}
                transparent
                transmission={0.42}
              />
            </RoundedBox>
            <RoundedBox args={[0.24, 0.42, 1.36]} position={[1.76, 0.22, 0.44]} radius={0.08} smoothness={4}>
              <meshPhysicalMaterial
                color="#a6cfff"
                metalness={0}
                opacity={glassOpacity}
                roughness={0.08}
                thickness={0.08}
                transparent
                transmission={0.42}
              />
            </RoundedBox>
            <RoundedBox args={[0.24, 0.42, 1.04]} position={[1.76, -0.34, 0.44]} radius={0.08} smoothness={4}>
              <meshPhysicalMaterial
                color="#a6cfff"
                metalness={0}
                opacity={glassOpacity - 0.02}
                roughness={0.08}
                thickness={0.08}
                transparent
                transmission={0.38}
              />
            </RoundedBox>
          </>
        ) : null}

        <mesh castShadow position={[1.74, 0.04, 0.44]}>
          <boxGeometry args={[0.08, 1.3, 1.46]} />
          <meshStandardMaterial color={trim} metalness={0.32} roughness={0.58} />
        </mesh>
        <mesh castShadow position={[1.08, 0.04, 1.18]}>
          <boxGeometry args={[1.46, 1.3, 0.08]} />
          <meshStandardMaterial color={trim} metalness={0.32} roughness={0.58} />
        </mesh>

        {lighting === "night" ? <pointLight color="#f8ca74" intensity={4.6} position={[0.78, 0.52, 0.26]} /> : null}
    </group>
  );
}

useGLTF.preload(UPLOADED_MODEL_PATH);

class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; resetKey: string },
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
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function PodModel(props: PodModelProps) {
  const placeholder = <PlaceholderPodAsset {...props} />;
  const resetKey = `${props.size}-${props.finish}-${props.lighting}-${props.windowStyle}`;

  return (
    <ModelErrorBoundary fallback={placeholder} resetKey={resetKey}>
      <Suspense fallback={placeholder}>
        <UploadedPodAsset finish={props.finish} lighting={props.lighting} size={props.size} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
