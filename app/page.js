'use client'

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Environment } from '@react-three/drei';

export default function App() {
  const [catModel, setCatModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();

    // Load the cat model (replace 'cat.glb' with the path to your 3D cat model file)
    loader.load('/scene.gltf', (gltf) => {
      setCatModel(gltf.scene);
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <group position={[0, -0.65, 0]}>
          {/* Render the cat model if it is loaded */}
          {catModel && (
            <mesh castShadow>
              {catModel.children.map((child) => (
                <primitive key={child.uuid} object={child} />
              ))}
            </mesh>
          )}
        </group>
        <Environment preset="sunset" background />
        <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}