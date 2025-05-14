"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { gsap } from "gsap";

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
  animations: THREE.AnimationClip[];
};

interface TruckProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  animate?: boolean;
}

export default function TruckModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animate = true,
}: TruckProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/logistics-truck.glb");
  const nodes: Record<string, THREE.Object3D> = {};
  
  // Extract all meshes from the scene
  scene.traverse((object) => {
    if (object.name) {
      nodes[object.name] = object;
    }
  });
  const { actions, mixer } = useAnimations(animations, group);
  
  // Track if the model is loaded
  const isLoaded = useRef(false);
  
  // Set up animations once the model is loaded
  useEffect(() => {
    if (group.current && animate && !isLoaded.current) {
      isLoaded.current = true;
      
      // Play any available animations
      if (actions && Object.keys(actions).length > 0) {
        const animationName = Object.keys(actions)[0];
        actions[animationName]?.play();
      } else {
        // If no animations in the model, create our own animations
        setupCustomAnimations();
      }
    }
    
    return () => {
      // Cleanup animations
      mixer?.stopAllAction();
    };
  }, [actions, animate, mixer]);

  // Custom animations using GSAP
  const setupCustomAnimations = () => {
    if (!group.current) return;
    
    // Find wheel meshes for rotation
    const wheels: THREE.Object3D[] = [];
    group.current.traverse((child) => {
      if (child.name.toLowerCase().includes("wheel")) {
        wheels.push(child);
      }
    });
    
    // Bounce animation for the truck body
    gsap.to(group.current.position, {
      y: 0.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
    
    // Rotate wheels
    if (wheels.length > 0) {
      wheels.forEach((wheel) => {
        gsap.to(wheel.rotation, {
          z: Math.PI * 2,
          duration: 2,
          repeat: -1,
          ease: "none",
        });
      });
    }
  };
  
  // Use frame to add subtle movement
  useFrame((_state, delta) => {
    if (group.current && animate) {
      // Update mixer for any animations
      mixer?.update(delta);
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {/* The actual model gets added here when loaded */}
      <primitive object={scene} dispose={null} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/models/logistics-truck.glb");