"use client";

import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo } from "react";
import { Box3, Color, type Mesh, MeshPhysicalMaterial, MeshStandardMaterial, type Object3D, Vector3 } from "three";
import type { FinishId, LightingMode, PodSize } from "@/types/configurator";

const INTERIOR_MODEL_PATH = "/models/pod-interior.glb";

const uploadedSizeScale: Record<PodSize, number> = {
  S: 0.9,
  M: 1,
  L: 1.12,
};

const finishPalette: Record<FinishId, string> = {
  glacier: "#e8edf3",
  basalt: "#5f6978",
  dune: "#c8b8a3",
  sage: "#93a596",
};

function applyInteriorMaterials(root: Object3D, finishColor: Color, lighting: LightingMode) {
  root.traverse((node) => {
    const mesh = node as Mesh;
    if (!mesh.isMesh || !mesh.material) return;

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const mat of materials) {
      if (!(mat instanceof MeshStandardMaterial || mat instanceof MeshPhysicalMaterial)) continue;

      // Boost env map for interior feel
      mat.envMapIntensity = lighting === "day" ? 0.9 : 0.5;

      // Warm interior lighting at night
      if (mat.emissive) {
        const label = `${mesh.name ?? ""} ${mat.name}`.toLowerCase();
        if (label.includes("light") || label.includes("lamp") || label.includes("emissive")) {
          mat.emissive.set(lighting === "night" ? "#f1ca78" : "#16120f");
          mat.emissiveIntensity = lighting === "night" ? 1.4 : 0.05;
        }
      }

      mat.needsUpdate = true;
    }
  });
}

interface InteriorModelProps {
  size: PodSize;
  finish: FinishId;
  lighting: LightingMode;
}

function InteriorAsset({ finish, lighting, size }: InteriorModelProps) {
  const { scene } = useGLTF(INTERIOR_MODEL_PATH);

  const { centeredScene, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((node) => {
      const mesh = node as Mesh & { castShadow?: boolean; receiveShadow?: boolean };
      if ("castShadow" in mesh) mesh.castShadow = true;
      if ("receiveShadow" in mesh) mesh.receiveShadow = true;
    });

    const box = new Box3().setFromObject(clone);
    const dimensions = new Vector3();
    const center = new Vector3();
    box.getSize(dimensions);
    box.getCenter(center);
    const maxDimension = Math.max(dimensions.x, dimensions.y, dimensions.z) || 1;
    clone.position.set(-center.x, -box.min.y, -center.z);

    return { centeredScene: clone, normalizedScale: 3.2 / maxDimension };
  }, [scene]);

  useEffect(() => {
    const finishColor = new Color(finishPalette[finish]);
    applyInteriorMaterials(centeredScene, finishColor, lighting);
  }, [centeredScene, finish, lighting]);

  return (
    <group position={[0, -0.85, 0]} scale={normalizedScale * uploadedSizeScale[size]}>
      <primitive object={centeredScene} />
      <ambientLight intensity={lighting === "night" ? 0.4 : 0.6} />
      <pointLight color={lighting === "night" ? "#f8ca74" : "#ffffff"} intensity={lighting === "night" ? 3.8 : 2.2} position={[0, 1.2, 0]} />
      <pointLight color="#f8ca74" intensity={lighting === "night" ? 2.0 : 0.4} position={[0.8, 0.5, 0.3]} />
    </group>
  );
}

function PlaceholderInterior() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.2, 1.6]} />
        <meshStandardMaterial color="#1a222b" transparent opacity={0.3} />
      </mesh>
      <ambientLight intensity={0.5} />
    </group>
  );
}

useGLTF.preload(INTERIOR_MODEL_PATH);

export function InteriorModel(props: InteriorModelProps) {
  return (
    <Suspense fallback={<PlaceholderInterior />}>
      <InteriorAsset {...props} />
    </Suspense>
  );
}
