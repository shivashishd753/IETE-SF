
"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function Pyramid() {
  const groupRef = useRef(null);
  const sourceTexture = useTexture("/iete-3D.svg");

  // Correct the mirrored logo and crop some empty border.
  const logoTexture = useMemo(() => {
    const texture = sourceTexture.clone();

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    // Horizontal flip: restore the correct reading direction.
    texture.repeat.set(-0.8, 0.8);
    texture.offset.set(0.9, 0.1);

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    return texture;
  }, [sourceTexture]);

  const geometry = useMemo(() => {
    // A regular tetrahedron: all six edges have equal length.
    const radius = 1.5;
    const baseY = -0.95;
    const apexY = baseY + Math.sqrt(2) * radius;

    const apex = [0, apexY, 0];

    const base = [0, 1, 2].map((i) => {
      const angle = (i * Math.PI * 2) / 3 + Math.PI / 6;

      return [
        radius * Math.cos(angle),
        baseY,
        radius * Math.sin(angle),
      ];
    });

    const faces = [
      [apex, base[0], base[1]],
      [apex, base[1], base[2]],
      [apex, base[2], base[0]],
      [base[2], base[1], base[0]],
    ];

    const positions = [];
    const uvs = [];

    faces.forEach(([top, left, right]) => {
      positions.push(...top, ...left, ...right);

      // Match the three corners of the image to the face.
      uvs.push(
        0.465, 0.74,
        0.06, 0.15,
        0.89, 0.15
      );
    });

    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    geo.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2)
    );

    geo.setIndex([
      0, 1, 2,
      3, 4, 5,
      6, 7, 8,
      9, 10, 11,
    ]);

    geo.computeVertexNormals();

    return geo;
  }, []);

  // Rotate around the vertical axis without tilting.
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}  rotation={[THREE.MathUtils.degToRad(-8), 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={logoTexture}
          side={THREE.DoubleSide}
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial
          color="#55DFFF"
          transparent
          opacity={0.95}
        />
      </lineSegments>
    </group>
  );
}

export default function IetePyramid() {
  return (
    <div
      style={{
        width: "100%",
        height: "460px",
        maxWidth: "560px",
        margin: "0 auto",
      }}
    >
      <Canvas
        camera={{
          position: [0, 1.0, 6.8],
          fov: 35,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={2} />

        <directionalLight
          position={[4, 6, 5]}
          intensity={2.5}
        />

        <pointLight
          position={[-3, 2, 3]}
          color="#39BFFF"
          intensity={1.5}
        />

        <Pyramid />
      </Canvas>
    </div>
  );
}
