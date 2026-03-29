import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const Particles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#c9a84c" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const GoldSphere = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#c9a84c"
          roughness={0.15}
          metalness={0.95}
          distort={0.25}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
};

const GlassRing = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={ref} scale={3}>
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.2}
        roughness={0.1}
        transmission={0.95}
        ior={1.5}
        chromaticAberration={0.06}
        color="#ffffff"
      />
    </mesh>
  );
};

const Scene3D = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#c9a84c" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#6b5a2e" />
        <spotLight position={[0, 10, 0]} intensity={0.8} color="#fff8e7" angle={0.3} penumbra={1} />
        <GoldSphere />
        <GlassRing />
        <Particles />
        <fog attach="fog" args={["#0d1117", 5, 20]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
