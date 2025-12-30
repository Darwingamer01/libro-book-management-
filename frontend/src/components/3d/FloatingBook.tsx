// components/3d/FloatingBook.tsx - REFINED PAGE VISIBILITY
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingBook() {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const coverTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d')!;

        // Gradient background (Emerald Theme)
        const gradient = ctx.createRadialGradient(512, 400, 100, 512, 512, 700);
        gradient.addColorStop(0, '#34d399'); // emerald-400
        gradient.addColorStop(0.6, '#10b981'); // emerald-500
        gradient.addColorStop(1, '#059669'); // emerald-600
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 1024);

        // Subtle diagonal lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = -1024; i < 2048; i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + 1024, 1024);
            ctx.stroke();
        }

        // Border
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, 944, 944);

        // Small sparkles
        ctx.fillStyle = 'rgba(251, 191, 36, 0.6)';
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 1024;
            const size = Math.random() * 2 + 0.5;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
            groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.08;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
            <group
                ref={groupRef}
                scale={1.2}
                position={[0, 0, 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* MAIN COVER */}
                <RoundedBox
                    args={[2.2, 3, 0.3]}
                    radius={0.02}
                    smoothness={4}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial
                        map={coverTexture}
                        metalness={0.6}
                        roughness={0.2}
                        emissive={hovered ? "#34d399" : "#059669"}
                        emissiveIntensity={hovered ? 0.4 : 0.15}
                        envMapIntensity={1.5}
                    />
                </RoundedBox>

                {/* TITLE */}
                <Text
                    position={[0, 0.6, 0.18]}
                    fontSize={0.4}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.05}
                    outlineWidth={0.008}
                    outlineColor="#1e1b4b" // Keep dark outline
                >
                    LIBRO
                </Text>

                {/* TITLE UNDERLINE */}
                <mesh position={[0, 0.42, 0.18]}>
                    <boxGeometry args={[1, 0.008, 0.01]} />
                    <meshStandardMaterial
                        color="#fbbf24" // Keep gold accent
                        emissive="#fbbf24"
                        emissiveIntensity={0.6}
                    />
                </mesh>

                {/* SUBTITLE */}
                <Text
                    position={[0, 0, 0.18]}
                    fontSize={0.15}
                    color="#e0e7ff" // Keep light text
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.02}
                >
                    Your Digital Library
                </Text>

                {/* TAGLINE */}
                <Text
                    position={[0, -0.25, 0.18]}
                    fontSize={0.11}
                    color="#fbbf24"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.02}
                >
                    Reimagined
                </Text>

                {/* EMBLEM RING */}
                <mesh position={[0, -0.7, 0.19]}>
                    <ringGeometry args={[0.16, 0.2, 32]} />
                    <meshStandardMaterial
                        color="#fbbf24"
                        metalness={1}
                        roughness={0}
                        emissive="#fbbf24"
                        emissiveIntensity={0.8}
                    />
                </mesh>

                {/* PAGES - POSITIONED TO PROTRUDE ON RIGHT SIDE */}
                {[0, 1, 2, 3, 4].map((i) => {
                    // Reduced width reduction so pages are wider than before
                    // 2.2 - 0.08 = 2.12 width. Half width = 1.06
                    // Offset = 0.08 + i*... -> Right Edge = 1.06 + 0.08 = 1.14
                    // Cover Right Edge = 1.10
                    // Pages will stick out by ~0.04 to 0.1 units
                    const widthReduction = 0.08 + i * 0.02;
                    const heightReduction = 0.12 + i * 0.02; // Reduced height slightly more to fit inside cover top/bottom
                    const xOffset = 0.08 + i * 0.012;
                    const zOffset = -0.015 - i * 0.008;

                    return (
                        <RoundedBox
                            key={i}
                            args={[2.2 - widthReduction, 3 - heightReduction, 0.18]}
                            radius={0.012}
                            smoothness={2}
                            position={[xOffset, 0, zOffset]}
                            castShadow
                        >
                            <meshStandardMaterial
                                color={`hsl(40, 20%, ${96 - i * 1.5}%)`} // Slightly warmer/cream paper color
                                metalness={0}
                                roughness={0.9}
                            />
                        </RoundedBox>
                    );
                })}

                {/* SPINE - NO TEXT INSIDE */}
                <RoundedBox
                    args={[0.22, 3, 0.35]}
                    radius={0.02}
                    smoothness={4}
                    position={[-1.11, 0, 0]}
                    castShadow
                >
                    <meshStandardMaterial
                        color="#064e3b"
                        metalness={0.7}
                        roughness={0.2}
                        emissive="#064e3b"
                        emissiveIntensity={0.2}
                    />
                </RoundedBox>

                {/* TOP EDGE - Adjusted to match page visibility */}
                <RoundedBox
                    args={[2.25, 0.06, 0.35]}
                    radius={0.015}
                    position={[-0.02, 1.53, 0]}
                    castShadow
                >
                    <meshStandardMaterial
                        color="#064e3b"
                        metalness={0.7}
                        roughness={0.2}
                    />
                </RoundedBox>

                {/* BOTTOM EDGE */}
                <RoundedBox
                    args={[2.25, 0.06, 0.35]}
                    radius={0.015}
                    position={[-0.02, -1.53, 0]}
                    castShadow
                >
                    <meshStandardMaterial
                        color="#064e3b"
                        metalness={0.7}
                        roughness={0.2}
                    />
                </RoundedBox>

                {/* LIGHTING */}
                <pointLight
                    position={[0, 0, 1.5]}
                    intensity={hovered ? 1.5 : 1}
                    color="#34d399"
                    distance={3}
                />

                <pointLight
                    position={[1, 1, 1]}
                    intensity={hovered ? 1 : 0.6}
                    color="#fbbf24"
                    distance={2.5}
                />

                {hovered && (
                    <pointLight
                        position={[0, 0, 2.5]}
                        intensity={2}
                        color="#a7f3d0"
                        distance={5}
                    />
                )}
            </group>
        </Float>
    );
}
