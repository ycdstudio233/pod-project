"use client";

import { OrbitControls, PerformanceMonitor, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback, useState } from "react";
import type { ConfiguratorState } from "@/types/configurator";
import { InteriorModel } from "./interior-model";
import { SceneEnvironment } from "./scene-environment";

interface InteriorCanvasProps {
  state: ConfiguratorState;
  visible?: boolean;
}

export function InteriorCanvas({ state, visible = true }: InteriorCanvasProps) {
  const [dpr, setDpr] = useState(1.4);
  const onIncline = useCallback(() => setDpr((v) => Math.min(1.7, v + 0.2)), []);
  const onDecline = useCallback(() => setDpr((v) => Math.max(0.85, v - 0.2)), []);

  return (
    <Canvas
      dpr={dpr}
      frameloop={visible ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows="soft"
      style={{ background: "transparent" }}
    >
      <PerformanceMonitor onDecline={onDecline} onIncline={onIncline} />
      <PerspectiveCamera makeDefault fov={42} position={[3.6, 1.8, 3.6]} />
      <SceneEnvironment interactive lighting={state.lighting} />
      <group position={[0, 0, 0]}>
        <InteriorModel
          finish={state.finish}
          lighting={state.lighting}
          size={state.size}
        />
      </group>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.3}
        dampingFactor={0.05}
        enableDamping
        enablePan={false}
        maxDistance={6}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2.5}
        minPolarAngle={Math.PI / 4}
        rotateSpeed={0.5}
        target={[0, -0.2, 0]}
      />
    </Canvas>
  );
}
