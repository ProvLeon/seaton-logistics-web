"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Equipment model component
function EquipmentModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  // Since we don't have an actual model file uploaded, we'll create a placeholder
  // In a real implementation, you would use useGLTF to load your model
  // const { scene } = useGLTF('/models/equipment.glb');

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={[position[0], position[1], position[2]]} rotation={[rotation[0], rotation[1], rotation[2]]} scale={scale}>
      {/* Placeholder model - replace with your actual 3D model */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[1, 2, 3, 8]} />
        <meshStandardMaterial color="#FF6600" roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 2, 0]}>
        <boxGeometry args={[3, 1, 1.5]} />
        <meshStandardMaterial color="#003366" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#333333" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Platform component
function Platform() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#f3f3f3" roughness={0.8} metalness={0.2} />
    </mesh>
  );
}

// Main hero scene component
export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the user is on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="w-full h-[90vh] relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, isMobile ? 15 : 10]} fov={40} />
        <ambientLight intensity={0.3} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={0.8}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} castShadow />

        <Environment preset="city" />

        <group position={[0, 0, 0]}>
          <EquipmentModel position={[0, 0, 0]} scale={1.5} />
          <Platform />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />

        {/* Fog for depth */}
        <fog attach="fog" args={['#f0f0f0', 10, 30]} />
      </Canvas>

      {/* Hero content overlay */}
      <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="container mx-auto px-6">
          <div className="w-full lg:w-1/2 pointer-events-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-navy-blue dark:text-white">
              Empowering Your <span className="text-safety-orange">Success</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-charcoal-gray dark:text-white/80 max-w-md">
              Premium equipment rentals, expert maintenance, and comprehensive training for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/services"
                className="bg-navy-blue text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all text-center"
              >
                Our Services
              </a>
              <a
                href="/contact"
                className="bg-safety-orange text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all text-center"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
