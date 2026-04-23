"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildAllShapes } from "@/lib/particleShapes";

interface ParticleFieldProps {
  isScattered?: boolean;
}

export default function ParticleField({ isScattered = false }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const scattered = isScattered;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera setup - matching original proportions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const isMobile = window.innerWidth <= 768;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Center particle horizontally and adjust vertically to prevent clipping at top
    camera.position.set(0, 0.5, isMobile ? 12 : 8); 
    camera.lookAt(0, 0.5, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000, 0); // Transparent
    containerRef.current.appendChild(renderer.domElement);

    // Particle setup
    const count = isMobile ? 3500 : 10000;
    
    const shapes = buildAllShapes(count);
    const geom = new THREE.BufferGeometry();
    
    const palette = [
      new THREE.Color("#1C1C1C"),
      new THREE.Color("#E34A27"),
      new THREE.Color("#8A8880")
    ];
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    
    // Build current/target arrays FIRST (used for initial position seeding)
    // If scattered (loading): start particles far away; they organically fly into ?
    const current = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    target.set(shapes[0]); // Always targeting ? shape
    if (scattered) {
      // Scatter particles wide in a sphere shell — pulled into ? by lerp
      for (let i = 0; i < count * 3; i += 3) {
        const r = 14 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        current[i]     = r * Math.sin(phi) * Math.cos(theta);
        current[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        current[i + 2] = r * Math.cos(phi);
      }
    } else {
      current.set(shapes[0]);
    }

    const positions = new Float32Array(count * 3);
    positions.set(current); // Start visually from current (scattered or ?)

    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.035 : 0.028,
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 1.0 : 0.85,
      sizeAttenuation: true,
      depthWrite: false
    });

    const pts = new THREE.Points(geom, mat);
    scene.add(pts);

    // Interaction setup
    const targetMouse = new THREE.Vector2(0, 0);
    const mouse = new THREE.Vector2(0, 0);
    let shockwave = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    const handleClick = () => {
      shockwave = 1.0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Animation loop
    let animationId: number;
    let isVisible = !document.hidden;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1); // Cap delta to prevent huge jumps
      const t = clock.elapsedTime;
      
      const scroll = (window as any).__edheScroll || 0;
      
      // 6 shapes -> 5 transitions
      const phase = Math.min(scroll * 5, 4.999);
      const idx = Math.floor(phase);
      const frac = phase - idx;
      
      // Easing
      const e = frac < 0.5 ? 4 * frac * frac * frac : 1 - Math.pow(-2 * frac + 2, 3) / 2;
      
      const a = shapes[idx];
      const b = shapes[idx + 1] || shapes[idx];
      
      for (let i = 0; i < target.length; i++) {
        target[i] = a[i] * (1 - e) + b[i] * e;
      }
      
      // Interaction physics
      mouse.lerp(targetMouse, 0.08);
      if (shockwave > 0) {
        shockwave -= delta * 1.2;
        if (shockwave < 0) shockwave = 0;
      }

      // During loading (scattered), use faster lerp so particles rush into ? dramatically
      const baseLerp = scattered && t < 3 ? Math.min(delta * 6, 0.4) : Math.min(delta * 3.5, 0.25);
      const lerp = baseLerp;

      const posArr = geom.attributes.position.array as Float32Array;
      
      for (let i = 0; i < current.length; i += 3) {
        current[i] += (target[i] - current[i]) * lerp;
        current[i + 1] += (target[i + 1] - current[i + 1]) * lerp;
        current[i + 2] += (target[i + 2] - current[i + 2]) * lerp;
        
        const nx = Math.sin(t * 0.6 + i * 0.0013) * 0.012;
        const ny = Math.cos(t * 0.5 + i * 0.0017) * 0.012;
        
        // Interactive repulsion
        // Note: Camera is at Z=8, object scale roughly maps normalized mouse (-1 to 1) 
        // to world space by multiplying by ~4.5
        const dx = current[i] - (mouse.x * 4.5);
        const dy = current[i + 1] - (mouse.y * 4.5);
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let repelX = 0;
        let repelY = 0;
        let repelZ = 0;

        // Hover repulsion
        if (dist < 1.5) {
           const force = (1.5 - dist) * 0.15;
           repelX = (dx / dist) * force;
           repelY = (dy / dist) * force;
           repelZ = force * 0.5; 
        }

        // Click shockwave
        if (shockwave > 0) {
           const wave = Math.sin(dist * 6 - (1 - shockwave) * 12) * shockwave * 0.3;
           repelZ += wave;
           repelX += (dx / (dist + 0.1)) * wave * 0.8;
           repelY += (dy / (dist + 0.1)) * wave * 0.8;
        }

        posArr[i] = current[i] + nx + repelX;
        posArr[i + 1] = current[i + 1] + ny + repelY;
        posArr[i + 2] = current[i + 2] + nx + repelZ;
      }
      
      geom.attributes.position.needsUpdate = true;
      pts.rotation.y = Math.sin(t * 0.08) * 0.12 + scroll * 0.3 + (mouse.x * 0.15);
      pts.rotation.x = Math.cos(t * 0.05) * 0.06 - scroll * 0.15 - (mouse.y * 0.15);

      renderer.render(scene, camera);
    };

    if (isVisible) animate();

    // Performance Optimization: Pause rendering when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationId);
      } else {
        isVisible = true;
        clock.getDelta(); // Clear accumulated time
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Performance Optimization: Debounce resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!containerRef.current) return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationId);
      scene.remove(pts);
      geom.dispose();
      mat.dispose();
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-testid="particle-canvas"
      className="fixed inset-0 -z-10 pointer-events-none opacity-60 md:opacity-80"
      style={{ background: "transparent" }}
    />
  );
}
