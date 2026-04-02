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
  visible?: boolean;
}

export function PodCanvas({ interactive = false, state, visible = true }: PodCanvasProps) {
  const [dpr, setDpr] = useState(interactive ? 1.55 : 1.2);
  const onIncline = useCallback(() => setDpr((value) => Math.min(interactive ? 1.8 : 1.35, value + 0.2)), [interactive]);
  const onDecline = useCallback(() => setDpr((value) => Math.max(0.85, value - 0.2)), []);

  return (
    <Canvas
      dpr={dpr}
      frameloop={visible ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: interactive ? "high-performance" : "default" }}
      shadows="soft"
      style={{ background: "transparent" }}
    >
      <PerformanceMonitor onDecline={onDecline} onIncline={onIncline} />
      <PerspectiveCamera makeDefault fov={36} position={[5.7, 2.1, 5.7]} />
      <SceneEnvironment interactive={interactive} lighting={state.lighting} />
      <group position={[0, 0, 0]}>
        <PodModel
          finish={state.finish}
          lighting={state.lighting}
          size={state.size}
          windowStyle={state.windowStyle}
        />
      </group>
      <OrbitControls
        autoRotate={!interactive && visible}
        autoRotateSpeed={0.38}
        dampingFactor={0.05}
        enableDamping
        enablePan={false}
        maxDistance={8.2}
        maxPolarAngle={Math.PI / 1.95}
        minDistance={4.3}
        minPolarAngle={Math.PI / 3.4}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
