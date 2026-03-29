import { useRef, useMemo, Suspense, useEffect } from "react";
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
  const { scene, animations, cameras } = useGLTF("/models/NEW.glb") as any;
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

  // Ignore model camera — use a consistent front view
  useEffect(() => {
    camera.position.set(0, 0.5, 6);
    camera.lookAt(0, 0, 0);
    (camera as THREE.PerspectiveCamera).fov = 45;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [camera]);

  // Auto-scale and center properly
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4.5 / maxDim;
    scene.scale.setScalar(scale);

    const center = box.getCenter(new THREE.Vector3());
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [scene]);

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
        camera={{ position: [0, 1, 5], fov: 45 }}
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
        <fog attach="fog" args={["#0d1117", 8, 25]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
