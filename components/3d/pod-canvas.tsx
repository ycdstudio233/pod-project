"use client";

import { OrbitControls, PerformanceMonitor, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback, useState } from "react";
import type { ConfiguratorState } from "@/types/configurator";
import { PodModel } from "./pod-model";
import { SceneEnvironment } from "./scene-environment";

interface PodCanvasProps {
  state: ConfiguratorState;
  interactive?: boolean;
}

export function PodCanvas({ interactive = false, state }: PodCanvasProps) {
  const [dpr, setDpr] = useState(1.5);
  const onIncline = useCallback(() => setDpr(Math.min(1.75, dpr + 0.25)), [dpr]);
  const onDecline = useCallback(() => setDpr(Math.max(0.75, dpr - 0.25)), [dpr]);

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      shadows={interactive ? true : "soft"}
    >
      <PerformanceMonitor onDecline={onDecline} onIncline={onIncline} />
      <PerspectiveCamera makeDefault fov={36} position={[5.7, 2.1, 5.7]} />
      <SceneEnvironment environment={state.environment} interactive={interactive} lighting={state.lighting} />
      <group position={[0, 0, 0]}>
        <PodModel
          finish={state.finish}
          lighting={state.lighting}
          size={state.size}
          windowStyle={state.windowStyle}
        />
      </group>
      <OrbitControls
        autoRotate={!interactive}
        autoRotateSpeed={0.38}
        enablePan={false}
        maxDistance={8.2}
        maxPolarAngle={Math.PI / 1.95}
        minDistance={4.3}
        minPolarAngle={Math.PI / 3.4}
      />
    </Canvas>
  );
}

