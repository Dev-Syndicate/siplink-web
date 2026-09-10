"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Box3, Group, MathUtils, Vector3 } from "three";
import type { MotionValue } from "motion/react";

/**
 * Live 3D laptop for the continuous hero.
 *
 * TO USE YOUR OWN MODEL: drop the .glb into `public/models/` and point
 * `MODEL_URL` at it. Nothing else needs to change — `Model` re-centres and
 * re-scales whatever it is loaded from its own bounding box, so the model's
 * authored units, origin and orientation do not have to match anything here.
 * If the model faces the wrong way, adjust `MODEL_YAW_OFFSET`.
 */
export const MODEL_URL = "/models/macbook_laptop.glb";

/** Extra yaw applied to the model so its screen faces the camera at rest. */
const MODEL_YAW_OFFSET = 0;

/** Longest edge of the model after normalisation, in world units. */
const TARGET_SIZE = 3.2;

type Pose = {
  /** 0-1 scroll progress driving the whole hero. */
  progress: MotionValue<number>;
  reduced: boolean;
};

/**
 * Reads the scroll progress every frame and drives the model.
 *
 * This runs inside the r3f render loop rather than through React state: the
 * MotionValue is sampled with `.get()`, so scrolling the page never triggers
 * a React re-render of the scene.
 */
function Rig({ progress, reduced, children }: Pose & { children: React.ReactNode }) {
  const group = useRef<Group>(null);

  useFrame(() => {
    const p = progress.get();
    if (!group.current) return;

    /**
     * Reduced motion keeps the scroll scrub — it is user-driven, and the copy
     * still has to be reachable — but zeroes the rotation and travel, which
     * are the parts that actually provoke motion sickness.
     */
    const m = reduced ? 0 : 1;
    // Three keyframes: float in at an angle, land square, shrink aside.
    const seg = p < 0.5 ? p / 0.5 : (p - 0.5) / 0.5;
    const lerp = (a: number, b: number, c: number) =>
      p < 0.5 ? MathUtils.lerp(a, b, seg) : MathUtils.lerp(b, c, seg);

    group.current.rotation.y =
      MathUtils.degToRad(lerp(-32 * m, 0, 24 * m)) + MODEL_YAW_OFFSET;
    group.current.rotation.x = MathUtils.degToRad(lerp(15 * m, 3 * m, 9 * m));
    group.current.rotation.z = MathUtils.degToRad(lerp(-7 * m, 0, 4 * m));

    // Position and scale live here too, not on the canvas element. Scaling a
    // canvas with CSS resamples the bitmap it already rendered (soft when
    // scaled up) and clips the model against the canvas box.
    group.current.position.x = lerp(1.5 * m, 0, -1.75 * m);
    group.current.position.y = lerp(0.25 * m, -0.46, -0.12 * m);
    group.current.scale.setScalar(reduced ? 0.72 : lerp(0.72, 0.84, 0.46));
  });

  return <group ref={group}>{children}</group>;
}

/** Loads the model and normalises its size and origin. */
function Model() {
  const { scene } = useGLTF(MODEL_URL);

  /**
   * Clone and normalise in one step, while the clone is still parentless.
   *
   * `Box3.setFromObject` measures in WORLD space. Doing this in an effect
   * instead — after the clone is mounted under the rig — means that once a
   * frame has rotated the rig, a re-run measures the axis-aligned box of the
   * *rotated* model: a different size, a different scale factor, and a
   * world-space centre then applied as a local offset, which throws the model
   * off screen. React double-invokes effects on mount in development, so that
   * race showed up as an empty canvas on roughly one load in seven.
   *
   * Here the clone has no parent, so the measurement is pure local space and
   * cannot be perturbed by anything the rig is doing. It also runs exactly
   * once per loaded model rather than on every mount.
   */
  const object = useMemo(() => {
    const clone = scene.clone(true);

    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const centre = box.getCenter(new Vector3());
    const longest = Math.max(size.x, size.y, size.z) || 1;

    const k = TARGET_SIZE / longest;
    clone.scale.setScalar(k);
    clone.position.set(-centre.x * k, -centre.y * k, -centre.z * k);
    clone.updateMatrixWorld(true);

    return clone;
  }, [scene]);

  return <primitive object={object} />;
}

export function Laptop3D({
  progress,
  reduced,
  active,
  className,
}: Pose & { active: boolean; className?: string }) {
  return (
    <Canvas
      className={className}
      /**
       * Render continuously while the hero is on screen, and not at all once
       * it is not.
       *
       * `frameloop="demand"` was the obvious choice here and it was wrong: it
       * only draws when something calls `invalidate()`, and on a plain page
       * load nothing does. The model arrives through Suspense, its textures
       * decode later, and the scroll value never changes while the page sits
       * at the top — so roughly one load in five showed a mounted,
       * correctly-sized, completely blank canvas. Invalidating on a timer
       * papered over it without fixing it, because model loading is not
       * time-boxed. Gating a continuous loop on visibility is correct by
       * construction and costs nothing once the hero is scrolled past.
       */
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.5, 7.2], fov: 32 }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} />

      <Suspense fallback={null}>
        <Rig progress={progress} reduced={reduced}>
          <Model />
        </Rig>

        {/* Studio reflections built from lightformers rather than an HDRI
            preset, so nothing is fetched from a third-party CDN at runtime. */}
        <Environment resolution={256}>
          <Lightformer
            intensity={3}
            position={[0, 4, 2]}
            scale={[8, 3, 1]}
            color="white"
          />
          <Lightformer
            intensity={1.4}
            position={[-4, 1, 2]}
            scale={[3, 6, 1]}
            color="white"
          />
          <Lightformer
            intensity={1.1}
            position={[4, 0, 3]}
            scale={[3, 6, 1]}
            color="white"
          />
        </Environment>

        {/* Kept small and soft: a wide plane shows its own far edge as a
            hard band once the camera can see past it. */}
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.24}
          scale={5.5}
          blur={3.6}
          far={2}
          resolution={512}
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
