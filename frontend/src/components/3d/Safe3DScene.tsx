import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function SimpleBook() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Slow rotation
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef} rotation={[0, -0.5, 0]}>
                {/* Book Cover (Main) */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3, 4, 0.5]} />
                    <meshStandardMaterial color="#4f46e5" roughness={0.3} metalness={0.1} />
                </mesh>

                {/* Pages (White visible side) */}
                <mesh position={[0.2, 0, 0]}>
                    <boxGeometry args={[2.9, 3.9, 0.45]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>

                {/* Spine */}
                <mesh position={[-1.4, 0, 0]}>
                    <boxGeometry args={[0.3, 4, 0.55]} />
                    <meshStandardMaterial color="#4338ca" />
                </mesh>
            </group>
        </Float>
    );
}

export default function Safe3DScene() {
    return (
        <div className="w-full h-full bg-red-500">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <SimpleBook />

                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
