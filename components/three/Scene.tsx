"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
  useProgress,
  Html,
} from "@react-three/drei";
import TruckModel from "./TruckModel";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-safety-orange border-t-transparent animate-spin mb-3"></div>
        <span className="text-white text-sm">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

interface SceneProps {
  cameraPosition?: [number, number, number];
  modelPosition?: [number, number, number];
  modelRotation?: [number, number, number];
  modelScale?: number;
  enableZoom?: boolean;
  enableRotate?: boolean;
  enablePan?: boolean;
  autoRotate?: boolean;
  shadows?: boolean;
  environment?: string;
}

export default function Scene({
  cameraPosition = [5, 3, 5],
  modelPosition = [0, 0, 0],
  modelRotation = [0, Math.PI / 4, 0],
  modelScale = 1,
  enableZoom = false,
  enableRotate = true,
  enablePan = false,
  autoRotate = true,
  shadows = true,
  environment,
}: SceneProps) {
  return (
    <Canvas shadows={shadows}>
      <PerspectiveCamera makeDefault position={cameraPosition} fov={35} />

      <Suspense fallback={<Loader />}>
        {/* Main 3D truck model */}
        <TruckModel
          position={modelPosition}
          rotation={modelRotation}
          scale={modelScale}
          animate={true}
        />

        {/* Environment and lighting */}
        {environment && <Environment preset={environment as "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby"} background />}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow={shadows}
          shadow-mapSize={2048}
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.4}
          castShadow={false}
        />

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={5}
          resolution={1024}
          color="var(--color-charcoal-gray)"
        />

        {/* Controls */}
        <OrbitControls
          enableZoom={enableZoom}
          enableRotate={enableRotate}
          enablePan={enablePan}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
}
