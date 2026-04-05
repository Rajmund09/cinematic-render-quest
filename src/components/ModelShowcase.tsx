import { useEffect, useRef, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const { scene, cameras } = useGLTF("/models/NEW.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    // If the GLB has a camera, copy its position/rotation
    if (cameras && cameras.length > 0) {
      const glbCam = cameras[0] as THREE.PerspectiveCamera;
      camera.position.copy(glbCam.position);
      camera.rotation.copy(glbCam.rotation);
      if (glbCam.fov && (camera as THREE.PerspectiveCamera).fov) {
        (camera as THREE.PerspectiveCamera).fov = glbCam.fov;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
    }
  }, [cameras, camera]);

  // Continuous Y-axis rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1} />
    </group>
  );
};

const ModelShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".model-header > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".model-canvas-wrap", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".model-canvas-wrap", start: "top 85%" },
      });

      gsap.from(".model-info > *", {
        x: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".model-info", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-44 bg-charcoal overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-accent/[0.08] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="model-header text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-5">
            3D Visualization
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
            Experience in <span className="text-gradient-gold">360°</span>
          </h2>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Interact with our designs in real-time. Rotate, zoom, and explore every angle before a single cut is made.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-center">
          {/* 3D Canvas */}
          <div className="model-canvas-wrap lg:col-span-3 relative rounded-3xl overflow-hidden border border-white/10 bg-charcoal-light/50 backdrop-blur-sm" style={{ height: "520px" }}>
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              }
            >
              <Canvas
                camera={{ position: [4, 2, 4], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-3, 3, -3]} intensity={0.4} />
                <Model />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2}
                />
                <Environment preset="apartment" />
              </Canvas>
            </Suspense>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/30 rounded-tl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/30 rounded-br-lg pointer-events-none" />
          </div>

          {/* Info panel */}
          <div className="model-info lg:col-span-2 flex flex-col gap-8">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">Interactive Model</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 leading-tight">
                Your kitchen, rendered before it's built
              </h3>
              <p className="text-base text-white/50 leading-relaxed mt-4">
                Every material, every shadow, every reflection — visualized with photorealistic accuracy.
                Make decisions with confidence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Photorealistic", value: "HDR" },
                { label: "Real-time", value: "60fps" },
                { label: "Materials", value: "PBR" },
                { label: "Export", value: "4K" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/5 text-center group hover:border-accent/30 transition-all duration-500">
                  <span className="text-xl font-black text-white group-hover:text-accent transition-colors duration-500">{item.value}</span>
                  <span className="text-xs text-white/40 tracking-wider uppercase mt-1 block">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="w-16 h-[2px] bg-accent/30 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelShowcase;
