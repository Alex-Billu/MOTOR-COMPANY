"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface Pump3DViewerProps {
  shape: "monobloc" | "centrifugal" | "submersible" | "jet";
  color?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  className?: string;
}

export default function Pump3DViewer({
  shape,
  color = "#0B3C5D",
  autoRotate = true,
  interactive = true,
  className = "w-full h-full",
}: Pump3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 300;
    const height = containerRef.current.clientHeight || 300;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 7);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const blueGlowLight = new THREE.PointLight(0x00f0ff, 1.5, 10);
    blueGlowLight.position.set(-3, -2, -3);
    scene.add(blueGlowLight);

    const redAccentLight = new THREE.PointLight(0xe02424, 1.2, 8);
    redAccentLight.position.set(3, 2, 2);
    scene.add(redAccentLight);

    // 5. Materials
    const themeColor = new THREE.Color(color);
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: themeColor,
      metalness: 0.8,
      roughness: 0.2,
      flatShading: false,
    });

    const ironMaterial = new THREE.MeshStandardMaterial({
      color: 0x22252a,
      metalness: 0.9,
      roughness: 0.4,
    });

    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.1,
    });

    const copperMaterial = new THREE.MeshStandardMaterial({
      color: 0xb87333,
      metalness: 0.8,
      roughness: 0.3,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.85,
      roughness: 0.15,
    });

    // 6. Pump Group
    const pumpGroup = new THREE.Group();

    if (shape === "submersible" || shape === "centrifugal" || shape === "monobloc" || shape === "jet") {
      if (shape === "submersible") {
        // Multi-stage submersible borewell pump (slim long cylinder)
        const motorLength = 2.2;
        const pumpLength = 2.8;
        const radius = 0.35;

        // Motor Section (Bottom - Steel)
        const motorGeo = new THREE.CylinderGeometry(radius, radius, motorLength, 32);
        const motorMesh = new THREE.Mesh(motorGeo, steelMaterial);
        motorMesh.position.y = -motorLength / 2;
        pumpGroup.add(motorMesh);

        // Suction Inlet Screen (Middle)
        const screenGeo = new THREE.CylinderGeometry(radius, radius, 0.4, 32);
        const screenMesh = new THREE.Mesh(screenGeo, ironMaterial);
        screenMesh.position.y = 0.2;
        pumpGroup.add(screenMesh);

        // Pump Section (Top - Steel with stages)
        const pumpGeo = new THREE.CylinderGeometry(radius, radius, pumpLength, 32);
        const pumpMesh = new THREE.Mesh(pumpGeo, steelMaterial);
        pumpMesh.position.y = 0.2 + 0.2 + pumpLength / 2;
        pumpGroup.add(pumpMesh);

        // Add stage indicator rings
        const numStages = 8;
        for (let i = 0; i < numStages; i++) {
          const ringGeo = new THREE.TorusGeometry(radius, 0.03, 8, 32);
          const ringMesh = new THREE.Mesh(ringGeo, steelMaterial);
          ringMesh.rotation.x = Math.PI / 2;
          ringMesh.position.y = 0.4 + (i * (pumpLength / numStages));
          pumpGroup.add(ringMesh);
        }

        // Cable Guard strip along side
        const guardGeo = new THREE.BoxGeometry(0.08, motorLength + pumpLength + 0.4, 0.08);
        const guardMesh = new THREE.Mesh(guardGeo, steelMaterial);
        guardMesh.position.set(radius, (pumpLength - motorLength) / 2, 0);
        pumpGroup.add(guardMesh);

        // Discharge Nozzle on top
        const nozzleGeo = new THREE.CylinderGeometry(radius - 0.08, radius - 0.04, 0.4, 16);
        const nozzleMesh = new THREE.Mesh(nozzleGeo, brassMaterial);
        nozzleMesh.position.y = 0.4 + pumpLength + 0.2;
        pumpGroup.add(nozzleMesh);

      } else if (shape === "centrifugal" || shape === "monobloc" || shape === "jet") {
        // Monobloc / Centrifugal Horizontal Pump

        // Motor Body (Blue Metallic Cylinder)
        const motorBodyGeo = new THREE.CylinderGeometry(0.8, 0.8, 2.0, 32);
        const motorBody = new THREE.Mesh(motorBodyGeo, metalMaterial);
        motorBody.rotation.z = Math.PI / 2;
        motorBody.position.x = -0.5;
        pumpGroup.add(motorBody);

        // Cooling Fins (Concentric Toruses on Motor Body)
        for (let i = -0.8; i <= 0.8; i += 0.3) {
          const finGeo = new THREE.TorusGeometry(0.83, 0.04, 8, 32);
          const fin = new THREE.Mesh(finGeo, metalMaterial);
          fin.rotation.y = Math.PI / 2;
          fin.position.x = i - 0.5;
          pumpGroup.add(fin);
        }

        // Terminal Box on top
        const termBoxGeo = new THREE.BoxGeometry(0.7, 0.4, 0.7);
        const termBox = new THREE.Mesh(termBoxGeo, ironMaterial);
        termBox.position.set(-0.5, 0.95, 0);
        pumpGroup.add(termBox);

        // Fan Cowl at the back (Left)
        const cowlGeo = new THREE.CylinderGeometry(0.78, 0.78, 0.5, 32);
        const cowl = new THREE.Mesh(cowlGeo, ironMaterial);
        cowl.rotation.z = Math.PI / 2;
        cowl.position.x = -1.75;
        pumpGroup.add(cowl);

        // Pump Bracket / Adapter
        const bracketGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.6, 16);
        const bracket = new THREE.Mesh(bracketGeo, ironMaterial);
        bracket.rotation.z = Math.PI / 2;
        bracket.position.x = 0.75;
        pumpGroup.add(bracket);

        if (shape === "centrifugal") {
          // Large spiral volute casing (Centrifugal type)
          const voluteGeo = new THREE.TorusGeometry(0.9, 0.35, 16, 48);
          const volute = new THREE.Mesh(voluteGeo, metalMaterial);
          volute.position.set(1.3, 0.1, 0);
          volute.rotation.y = Math.PI / 2;
          pumpGroup.add(volute);

          // Casing center hub
          const hubGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 24);
          const hub = new THREE.Mesh(hubGeo, metalMaterial);
          hub.rotation.z = Math.PI / 2;
          hub.position.x = 1.35;
          pumpGroup.add(hub);

          // Suction inlet nozzle (pointing out front - right)
          const inletGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.7, 16);
          const inlet = new THREE.Mesh(inletGeo, steelMaterial);
          inlet.rotation.z = Math.PI / 2;
          inlet.position.set(1.85, 0.1, 0);
          pumpGroup.add(inlet);

          const inletFlangeGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.1, 16);
          const inletFlange = new THREE.Mesh(inletFlangeGeo, metalMaterial);
          inletFlange.rotation.z = Math.PI / 2;
          inletFlange.position.set(2.2, 0.1, 0);
          pumpGroup.add(inletFlange);

          // Discharge outlet nozzle (pointing up)
          const outletGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.9, 16);
          const outlet = new THREE.Mesh(outletGeo, steelMaterial);
          outlet.position.set(1.3, 1.2, 0);
          pumpGroup.add(outlet);

          const outletFlangeGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
          const outletFlange = new THREE.Mesh(outletFlangeGeo, metalMaterial);
          outletFlange.position.set(1.3, 1.65, 0);
          pumpGroup.add(outletFlange);
        } else if (shape === "jet") {
          // Double chamber Jet pump casing
          const voluteGeo = new THREE.BoxGeometry(1.0, 1.3, 1.3);
          const volute = new THREE.Mesh(voluteGeo, metalMaterial);
          volute.position.set(1.4, 0.15, 0);
          pumpGroup.add(volute);

          // Double nozzle port (suction & pressure pipes at the front)
          const lowerPortGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.7, 16);
          const lowerPort = new THREE.Mesh(lowerPortGeo, brassMaterial);
          lowerPort.rotation.z = Math.PI / 2;
          lowerPort.position.set(2.05, -0.15, 0);
          pumpGroup.add(lowerPort);

          const upperPortGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.7, 16);
          const upperPort = new THREE.Mesh(upperPortGeo, brassMaterial);
          upperPort.rotation.z = Math.PI / 2;
          upperPort.position.set(2.05, 0.45, 0);
          pumpGroup.add(upperPort);

          // Top discharge outlet
          const dischargeGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.6, 16);
          const discharge = new THREE.Mesh(dischargeGeo, steelMaterial);
          discharge.position.set(1.4, 1.05, 0);
          pumpGroup.add(discharge);

          const dischargeFlangeGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 16);
          const dischargeFlange = new THREE.Mesh(dischargeFlangeGeo, metalMaterial);
          dischargeFlange.position.set(1.4, 1.35, 0);
          pumpGroup.add(dischargeFlange);
        } else {
          // Standard Monobloc casing (Volute with straight impeller casing)
          const voluteGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.7, 32);
          const volute = new THREE.Mesh(voluteGeo, metalMaterial);
          volute.rotation.z = Math.PI / 2;
          volute.position.set(1.3, 0.1, 0);
          pumpGroup.add(volute);

          // Suction inlet (front)
          const inletGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.5, 16);
          const inlet = new THREE.Mesh(inletGeo, steelMaterial);
          inlet.rotation.z = Math.PI / 2;
          inlet.position.set(1.85, 0.1, 0);
          pumpGroup.add(inlet);

          // Discharge outlet (top)
          const outletGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.6, 16);
          const outlet = new THREE.Mesh(outletGeo, steelMaterial);
          outlet.position.set(1.3, 0.95, 0);
          pumpGroup.add(outlet);
        }

        // Pump Base Feet (Ground mounting bracket)
        const baseGeo = new THREE.BoxGeometry(1.6, 0.15, 1.2);
        const base = new THREE.Mesh(baseGeo, ironMaterial);
        base.position.set(-0.5, -0.85, 0);
        pumpGroup.add(base);

        const casingBaseGeo = new THREE.BoxGeometry(0.6, 0.3, 0.8);
        const casingBase = new THREE.Mesh(casingBaseGeo, ironMaterial);
        casingBase.position.set(1.3, -0.75, 0);
        pumpGroup.add(casingBase);
      }
    }

    // Centering pump group
    const box = new THREE.Box3().setFromObject(pumpGroup);
    const center = box.getCenter(new THREE.Vector3());
    pumpGroup.position.sub(center); // Recenter inside container
    scene.add(pumpGroup);

    // 7. Mouse Interaction (Rotation)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = () => {
      isDragging = true;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const deltaMove = {
        x: event.offsetX - previousMousePosition.x,
        y: event.offsetY - previousMousePosition.y,
      };

      if (isDragging && interactive) {
        const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            (deltaMove.y * Math.PI) / 180 * 0.5,
            (deltaMove.x * Math.PI) / 180 * 0.5,
            0,
            "XYZ"
          )
        );
        pumpGroup.quaternion.multiplyQuaternions(deltaRotationQuaternion, pumpGroup.quaternion);
      }

      previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY,
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isDragging && interactive && event.touches.length === 1) {
        const touch = event.touches[0];
        const deltaMove = {
          x: touch.clientX - previousMousePosition.x,
          y: touch.clientY - previousMousePosition.y,
        };

        const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            (deltaMove.y * Math.PI) / 180 * 0.5,
            (deltaMove.x * Math.PI) / 180 * 0.5,
            0,
            "XYZ"
          )
        );
        pumpGroup.quaternion.multiplyQuaternions(deltaRotationQuaternion, pumpGroup.quaternion);

        previousMousePosition = {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    };

    const domElement = renderer.domElement;

    if (interactive) {
      domElement.addEventListener("mousedown", handleMouseDown);
      domElement.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      domElement.addEventListener("touchstart", handleTouchStart, { passive: true });
      domElement.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    // 8. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotation when not dragging
      if (autoRotate && !isDragging) {
        const elapsed = clock.getElapsedTime();
        if (shape === "submersible") {
          pumpGroup.rotation.y = elapsed * 0.4;
        } else {
          pumpGroup.rotation.y = elapsed * 0.3;
          pumpGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (interactive) {
        domElement.removeEventListener("mousedown", handleMouseDown);
        domElement.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        domElement.removeEventListener("touchstart", handleTouchStart);
        domElement.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleMouseUp);
      }

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shape, color, autoRotate, interactive]);

  return (
    <div
      ref={containerRef}
      className={`${className} cursor-grab active:cursor-grabbing relative overflow-hidden`}
      style={{ minHeight: "220px" }}
    />
  );
}
