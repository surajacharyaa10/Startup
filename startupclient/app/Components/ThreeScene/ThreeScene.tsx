"use client";
import * as THREE from "three";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function RotatingBox() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#61dafb" />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="relative w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <RotatingBox />
      </Canvas>
    </div>
  );
}
