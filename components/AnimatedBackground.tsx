'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Floating particles component
function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 100;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: Math.random() * 0.5 + 0.2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    particles.forEach((particle, index) => {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3(...particle.position);
      const rotation = new THREE.Euler(
        particle.rotation[0] + state.clock.elapsedTime * 0.1,
        particle.rotation[1] + state.clock.elapsedTime * 0.15,
        particle.rotation[2] + state.clock.elapsedTime * 0.1
      );
      const scale = new THREE.Vector3(particle.scale, particle.scale, particle.scale);

      // Add floating motion
      position.y += Math.sin(state.clock.elapsedTime + index) * 0.01;
      position.x += Math.cos(state.clock.elapsedTime * 0.5 + index) * 0.005;

      matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), scale);
      mesh.setMatrixAt(index, matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.6}
        emissive="#1e40af"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}

// Floating geometric shapes instead of text
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  const shapes = [
    { type: 'box', color: '#3b82f6' },
    { type: 'sphere', color: '#8b5cf6' },
    { type: 'octahedron', color: '#f59e0b' },
    { type: 'tetrahedron', color: '#10b981' },
    { type: 'dodecahedron', color: '#ef4444' },
    { type: 'icosahedron', color: '#06b6d4' },
  ];

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => {
        const angle = (index / shapes.length) * Math.PI * 2;
        const radius = 8;
        return (
          <Float
            key={index}
            speed={1 + index * 0.2}
            rotationIntensity={0.3}
            floatIntensity={0.5}
            position={[
              Math.cos(angle) * radius,
              Math.sin(index * 2) * 2,
              Math.sin(angle) * radius,
            ]}
          >
            <mesh>
              {shape.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
              {shape.type === 'sphere' && <sphereGeometry args={[0.5, 16, 16]} />}
              {shape.type === 'octahedron' && <octahedronGeometry args={[0.7]} />}
              {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[0.8]} />}
              {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[0.6]} />}
              {shape.type === 'icosahedron' && <icosahedronGeometry args={[0.6]} />}
              <meshStandardMaterial
                color={shape.color}
                emissive={shape.color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// Main 3D scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <FloatingParticles />
      <FloatingShapes />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}