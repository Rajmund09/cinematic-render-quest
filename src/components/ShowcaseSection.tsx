import { useRef, useEffect, useState, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseModel = () => {
  const { scene, animations, cameras } = useGLTF("/models/SHOWCASE.glb") as any;
  const groupRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, groupRef);
  const { camera } = useThree();

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

  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    if (cameras && cameras.length > 0) {
      const modelCam = cameras[0];
      cam.position.copy(modelCam.position);
      cam.quaternion.copy(modelCam.quaternion);
      if (modelCam.fov) cam.fov = modelCam.fov;
      if (modelCam.near) cam.near = modelCam.near;
      if (modelCam.far) cam.far = modelCam.far;
    } else {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      scene.position.sub(center);
      const dist = (maxDim / 2) / Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * 1.6;
      cam.position.set(0, 0, dist);
      cam.near = 0.1;
      cam.far = dist * 10;
      cam.lookAt(0, 0, 0);
    }
    cam.updateProjectionMatrix();
  }, [scene, camera, cameras]);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const isMobile = window.innerWidth < 768;
    const targetSize = isMobile ? 0.5 : 0.8;
    const scale = targetSize / maxDim;
    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const ShowcaseFallback = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} scale={1.5}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
        <MeshDistortMaterial color="#c9a84c" roughness={0.2} metalness={0.9} distort={0.15} speed={1} />
      </mesh>
    </Float>
  );
};

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [modelExists, setModelExists] = useState(false);

  // Check if the showcase model file exists
  useEffect(() => {
    fetch("/models/SHOWCASE.glb", { method: "HEAD" })
      .then((res) => setModelExists(res.ok))
      .catch(() => setModelExists(false));
  }, []);

  // Lazy load: only render Canvas when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP scroll animation for the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      ".showcase-title",
      { y: 80, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(40, 20%, 96%), hsl(40, 15%, 92%))" }}
    >
      {/* Section header */}
      <div className="relative z-10 text-center px-6 pt-24 pb-8">
        <p className="showcase-title text-xs tracking-[0.3em] uppercase mb-4 opacity-0" style={{ color: "hsl(42, 65%, 45%)" }}>
          Interactive Showcase
        </p>
        <h2 className="showcase-title font-serif text-4xl md:text-6xl opacity-0" style={{ color: "hsl(220, 15%, 15%)" }}>
          Experience the{" "}
          <span className="italic" style={{ color: "hsl(42, 65%, 45%)" }}>
            Design
          </span>
        </h2>
      </div>

      {/* 3D Canvas */}
      <div ref={canvasRef} className="relative w-full flex-1 min-h-[50vh] max-h-[70vh]">
        {inView && (
          <Canvas
            camera={{ position: [0, 1, 5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            className="!absolute inset-0"
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#c9a84c" />
            <directionalLight position={[-3, 3, -3]} intensity={0.5} color="#ffffff" />
            <pointLight position={[-5, -5, 5]} intensity={0.4} color="#8b7b4a" />
            <Suspense fallback={<ShowcaseFallback />}>
              {modelExists ? <ShowcaseModel /> : <ShowcaseFallback />}
            </Suspense>
            <fog attach="fog" args={["#f5f0eb", 8, 25]} />
          </Canvas>
        )}
      </div>

      {/* Bottom text */}
      <div className="relative z-10 text-center px-6 pb-24">
        <p className="gsap-reveal text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "hsl(220, 10%, 40%)" }}>
          Interact with our latest design in full 3D. Rotate, zoom, and explore
          every detail of this meticulously crafted space.
        </p>
      </div>
    </section>
  );
};

export default ShowcaseSection;
