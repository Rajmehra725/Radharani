'use client';
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function ThreeScene({ stage, japCount, flowers }: { stage:number; japCount:number; flowers:number; }) {
  const group = useRef<THREE.Group | null>(null);
  const petalRefs = useRef<any[]>([]);
  const clock = new THREE.Clock();

  useEffect(() => {
    // initialize particle positions if needed
  }, []);

  useFrame((state, delta) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      // slow breathing effect
      group.current.rotation.y = Math.sin(t * 0.15) * 0.06;
      group.current.position.y = Math.sin(t * 0.5) * 0.02;
    }

    // animate petals
    petalRefs.current.forEach((p: any, i: number) => {
      if (!p) return;
      p.rotation.z += 0.01 + (i % 3) * 0.005;
      p.position.y -= 0.01 + (i % 5) * 0.002;
      if (p.position.y < -6) p.position.y = Math.random() * 6 + 6;
    });
  });

  // helper to create stylized shrine / radha shape with primitives
  return (
    <group ref={group}>
      {/* ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={'#071422'} />
      </mesh>

      {/* Divine throne (stylized) */}
      <group position={[0, 0.3, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.9, 64, 64]} />
          <meshStandardMaterial color={'#ffd6ea'} metalness={0.4} roughness={0.3} />
        </mesh>

        {/* halo */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.9, -0.2]}>
          <ringGeometry args={[1.5, 2.6, 64]} />
          <meshBasicMaterial color={'#fff2cc'} transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>

        {/* floating orbs */}
        {[ -1.6, -0.6, 0.6, 1.6 ].map((x, idx) => (
          <mesh key={idx} position={[x, 1.8 + Math.sin(idx)*0.2, -0.6]}>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial emissive={'#ffd6ea'} emissiveIntensity={0.9} color={'#fff'} />
          </mesh>
        ))}
      </group>

      {/* petals (emojis as small planes) */}
      {[...Array(16)].map((_, i) => {
        const xpos = (Math.random() - 0.5) * 6;
        const ypos = Math.random() * 6 + 2;
        const zpos = (Math.random() - 0.5) * 6;
        return (
          <mesh key={i} ref={(el) => (petalRefs.current[i] = el)} position={[xpos, ypos, zpos]} rotation={[Math.random(), Math.random(), Math.random()]}>
            <planeGeometry args={[0.36, 0.36]} />
            <meshBasicMaterial transparent>
              <Html center>
                <div style={{ fontSize: 28 }}>🌸</div>
              </Html>
            </meshBasicMaterial>
          </mesh>
        );
      })}

      {/* optional decorative objects */}
      <mesh position={[ -2.6, 0.2, -1.8 ]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={'#ffdfc9'} />
      </mesh>
      <mesh position={[ 2.6, 0.2, -1.8 ]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={'#ffd6ea'} />
      </mesh>
    </group>
  );
}
