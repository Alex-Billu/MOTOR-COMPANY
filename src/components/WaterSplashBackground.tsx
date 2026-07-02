"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function WaterSplashBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. Particles (Water Splash)
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifespans = new Float32Array(particleCount);
    const initialPositions = new Float32Array(particleCount * 3);

    // Initialize particles in a fountain-like circular splash at the bottom
    for (let i = 0; i < particleCount; i++) {
      // Position around a circle
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.5; // Circular ring base
      const x = Math.cos(angle) * radius;
      const y = -2.0 + (Math.random() * 0.2); // Base floor height
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Velocity: pointing upwards and slightly outwards
      velocities[i * 3] = (Math.cos(angle) * 0.4 + (Math.random() - 0.5) * 0.2) * 4; // x speed
      velocities[i * 3 + 1] = (4 + Math.random() * 6); // y speed (upwards)
      velocities[i * 3 + 2] = (Math.sin(angle) * 0.4 + (Math.random() - 0.5) * 0.2) * 4; // z speed

      lifespans[i] = Math.random(); // Random starting point of life
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom shader/points material for soft glowing water droplets
    const material = new THREE.PointsMaterial({
      color: 0x00f0ff, // Water cyan
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Add extra blue ambient light
    const pointLight = new THREE.PointLight(0x00a8ff, 3, 20);
    pointLight.position.set(0, -1, 2);
    scene.add(pointLight);

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const gravity = -9.8; // Gravity pulling water down

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05); // Cap delta to prevent massive jumps
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Update lifetime
        lifespans[i] += delta * 0.5; // lifespan speed

        if (lifespans[i] > 1.0) {
          // Reset particle to base
          lifespans[i] = 0;
          const angle = Math.random() * Math.PI * 2;
          const radius = 0.6 + Math.random() * 1.4;
          posArray[i * 3] = Math.cos(angle) * radius;
          posArray[i * 3 + 1] = -2.0;
          posArray[i * 3 + 2] = Math.sin(angle) * radius;

          velocities[i * 3] = (Math.cos(angle) * 0.4 + (Math.random() - 0.5) * 0.2) * 4;
          velocities[i * 3 + 1] = 4.5 + Math.random() * 5.5;
          velocities[i * 3 + 2] = (Math.sin(angle) * 0.4 + (Math.random() - 0.5) * 0.2) * 4;
        } else {
          // Apply velocity and gravity
          velocities[i * 3 + 1] += gravity * delta; // pull down by gravity

          posArray[i * 3] += velocities[i * 3] * delta;
          posArray[i * 3 + 1] += velocities[i * 3 + 1] * delta;
          posArray[i * 3 + 2] += velocities[i * 3 + 2] * delta;

          // If particle goes below ground level, bounce it or fade it out
          if (posArray[i * 3 + 1] < -2.0 && velocities[i * 3 + 1] < 0) {
            // Reset y position and reverse velocity with dampening
            posArray[i * 3 + 1] = -2.0;
            velocities[i * 3 + 1] = -velocities[i * 3 + 1] * 0.3; // Dampened bounce
            // Add slight random horizontal dispersion
            velocities[i * 3] += (Math.random() - 0.5) * 0.5;
            velocities[i * 3 + 2] += (Math.random() - 0.5) * 0.5;
          }
        }
      }

      posAttr.needsUpdate = true;

      // Slow rotation of the system
      particleSystem.rotation.y += delta * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Listener
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
