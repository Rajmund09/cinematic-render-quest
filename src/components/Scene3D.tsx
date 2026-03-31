import { useRef, useMemo, Suspense, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, useGLTF, useAnimations } from "@react-three/drei";
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

const GLBModel = () => {
  const { scene, animations } = useGLTF("/models/NEW.glb") as any;
  const groupRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, groupRef);
  const { camera } = useThree();

  // Play all animations
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action: any) => {
        if (action) {
          action.reset().fadeIn(0.5).play();
          action.setLoop(THREE.LoopRepeat, Infinity);
        }
      });
    }
    return () => {
      Object.values(actions).forEach((action: any) => action?.stop());
    };
  }, [actions]);

  // Apply the GLB file's camera rotation
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    // Apply the exact quaternion rotation from the GLB camera node
    cam.quaternion.set(
      -0.03639477118849754,
      -0.4935424327850342,
      -0.020694753155112267,
      0.8687134385108948
    );
    cam.updateProjectionMatrix();
  }, [camera]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const FallbackSphere = () => {
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
        <MeshDistortMaterial color="#c9a84c" roughness={0.15} metalness={0.95} distort={0.25} speed={1.5} />
      </mesh>
    </Float>
  );
};

useGLTF.preload("/models/NEW.glb");

const Scene3D = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [-6.29, 1.617, 3.089],
          fov: 32.3,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#c9a84c" />
        <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#6b5a2e" />
        <spotLight position={[0, 10, 0]} intensity={0.8} color="#fff8e7" angle={0.3} penumbra={1} />
        <Suspense fallback={<FallbackSphere />}>
          <GLBModel />
        </Suspense>
        <Particles />
        <fog attach="fog" args={["#0d1117", 15, 50]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
