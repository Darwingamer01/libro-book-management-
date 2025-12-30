import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function BookParticles({ count = 50 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Create particles in a sphere around the book
            // We want more particles closer to the book, but distributed
            const radius = 1.5 + Math.random() * 2.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1); // Uniform sphere distribution

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            // Gentle rotation of the entire particle system
            mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;

            // Pulse effect handling would require a custom shader or updating geometry every frame
            // simpler approach: scale the whole system slightly
            const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
            mesh.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <points ref={mesh}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particles.length / 3}
                        array={particles}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.06}
                    color="#fbbf24"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </Float>
    );
}
