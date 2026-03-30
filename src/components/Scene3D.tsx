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

  // Use the GLB's own camera if available, otherwise fit to bounding box
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;

    if (cameras && cameras.length > 0) {
      // Use the GLB file's camera for proper front view
      const modelCam = cameras[0];
      cam.position.copy(modelCam.position);
      cam.quaternion.copy(modelCam.quaternion);
      if (modelCam.fov) cam.fov = modelCam.fov;
      if (modelCam.near) cam.near = modelCam.near;
      if (modelCam.far) cam.far = modelCam.far;
    } else {
      // Fallback: fit camera to model
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;

      scene.position.sub(center);

      const fitBox = new THREE.Box3().setFromObject(scene);
      const fitCenter = fitBox.getCenter(new THREE.Vector3());
      const fitSize = fitBox.getSize(new THREE.Vector3());
      const dist = (Math.max(fitSize.x, fitSize.y, fitSize.z) / 2) / Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * 1.6;

      cam.position.set(fitCenter.x, fitCenter.y, fitCenter.z + dist);
      cam.near = 0.1;
      cam.far = dist * 10;
      cam.lookAt(fitCenter);
    }

    cam.updateProjectionMatrix();
  }, [scene, camera, cameras]);

  // Center and scale model — smaller, responsive
  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    // Responsive scale: smaller on mobile
    const isMobile = window.innerWidth < 768;
    const targetSize = isMobile ? 0.6 : 0.9;
    const scale = targetSize / maxDim;

    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const s = (mobile ? 0.6 : 0.9) / maxDim;
      scene.scale.setScalar(s);
      scene.position.set(-center.x * s, -center.y * s, -center.z * s);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
