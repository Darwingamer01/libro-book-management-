// components/3d/Scene3D.tsx - BOOK POSITIONED RIGHT
// components/3d/Scene3D.tsx - PROPERLY POSITIONED WITH SHADOW
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Lightformer } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { FloatingBook } from './FloatingBook';
import { ParticleField } from './ParticleField';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';

// Shadow Catcher using ShadowMaterial - Pure Shadow, No Grey Background
// ShadowCatcher removed

export function Scene3D() {
    return (
        <motion.div
            className="absolute top-0 right-0 w-full h-full pointer-events-auto"
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <Canvas
                shadows
                dpr={[1, 2]}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',  // FULL WIDTH - Prevents Clipping
                    height: '100%',
                    pointerEvents: 'auto',
                }}
                camera={{
                    position: [0, 0, 12],  // CENTERED VIEW
                    fov: 35,
                    near: 0.1,
                    far: 100,
                }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.1,
                }}
            >
                <Suspense fallback={null}>
                    {/* LIGHTING */}
                    <ambientLight intensity={0.5} />

                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.3}
                        penumbra={1}
                        intensity={2}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />

                    <directionalLight position={[-5, 5, 5]} intensity={1.2} castShadow />
                    <pointLight position={[0, 4, 0]} intensity={0.6} color="#10b981" />

                    {/* PARTICLES */}
                    <ParticleField count={120} />

                    {/* BOOK - RIGHT SIDE OF FULL WIDTH CANVAS */}
                    {/* Shifted significantly right as requested */}
                    <group position={[3.5, 0, 0]}>
                        <FloatingBook />
                    </group>

                    {/* SOFT CONTACT SHADOW - Calibrated for Visibility */}
                    <ContactShadows
                        position={[3.5, -2.0, 0]} // Aligned and closer
                        opacity={0.7} // High opacity to ensure visibility
                        scale={20} // Smaller scale = darker/denser shadow
                        blur={2} // Less blur = more definition
                        far={4.5}
                        resolution={1024}
                        color="#000000"
                    />

                    {/* ENVIRONMENT */}
                    <Environment preset="city" />
                    <Environment resolution={256}>
                        <Lightformer
                            intensity={2}
                            rotation-x={Math.PI / 2}
                            position={[0, 4, -9]}
                            scale={[10, 1, 1]}
                        />
                    </Environment>

                    {/* CONTROLS */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2.5}
                        maxPolarAngle={Math.PI / 2}
                        minAzimuthAngle={-Math.PI / 6}
                        maxAzimuthAngle={Math.PI / 6}
                        enableDamping
                        dampingFactor={0.05}
                        rotateSpeed={0.5}
                    />

                    {/* POST PROCESSING */}
                    <EffectComposer>
                        <Bloom
                            intensity={0.4}
                            luminanceThreshold={0.6}
                            luminanceSmoothing={0.9}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </motion.div>
    );
}
