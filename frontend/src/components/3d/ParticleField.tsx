// components/3d/ParticleField.tsx - ENHANCED
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField({ count = 250 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null);

    const [particles, colors] = useMemo(() => {
        const positions = [];
        const colorArray = [];

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 40;
            const z = (Math.random() - 0.5) * 40;
            positions.push(x, y, z);

            // Mix of colors
            const color = new THREE.Color();
            if (Math.random() > 0.7) {
                color.setHex(0xfbbf24); // Golden
            } else if (Math.random() > 0.5) {
                color.setHex(0x8b5cf6); // Purple
            } else {
                color.setHex(0x6366f1); // Blue
            }
            colorArray.push(color.r, color.g, color.b);
        }

        return [new Float32Array(positions), new Float32Array(colorArray)];
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
