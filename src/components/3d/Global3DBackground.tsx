import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Global3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 120);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const particleCount = 1500;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const goldColor = new THREE.Color(0xffd700);
    const blueColor = new THREE.Color(0x3b82f6);
    const cyanColor = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 450;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 450;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 350;

      const rand = Math.random();
      const col = rand > 0.6 ? goldColor : rand > 0.3 ? blueColor : cyanColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = Math.random() * 2.2 + 0.8;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const icoGeo = new THREE.IcosahedronGeometry(18, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const ico1 = new THREE.Mesh(icoGeo, icoMat);
    ico1.position.set(-110, 60, -40);
    shapesGroup.add(ico1);

    const ico2 = new THREE.Mesh(icoGeo, new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    }));
    ico2.position.set(120, -50, -30);
    shapesGroup.add(ico2);

    const ringGeo = new THREE.TorusGeometry(32, 0.6, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.position.set(-80, -70, -20);
    shapesGroup.add(ring1);

    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.18
    });
    const ring2 = new THREE.Mesh(ringGeo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.position.set(90, 80, -50);
    shapesGroup.add(ring2);

    const gridHelper = new THREE.GridHelper(500, 40, 0xffd700, 0x3b82f6);
    gridHelper.position.y = -120;
    gridHelper.rotation.x = 0.05;
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.12;
    }
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xffd700, 1.5, 300);
    goldLight.position.set(-80, 100, 50);
    scene.add(goldLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 1.5, 300);
    blueLight.position.set(80, -100, 50);
    scene.add(blueLight);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;

      ico1.rotation.x = elapsedTime * 0.15;
      ico1.rotation.y = elapsedTime * 0.2;
      ico1.position.y = 60 + Math.sin(elapsedTime * 0.8) * 6;

      ico2.rotation.x = -elapsedTime * 0.12;
      ico2.rotation.z = elapsedTime * 0.18;
      ico2.position.y = -50 + Math.cos(elapsedTime * 0.7) * 8;

      ring1.rotation.z = elapsedTime * 0.1;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.1;

      ring2.rotation.z = -elapsedTime * 0.12;
      ring2.rotation.y = Math.PI / 4 + Math.cos(elapsedTime * 0.6) * 0.1;

      gridHelper.position.z = (elapsedTime * 10) % 12.5 - 120;

      targetX += (mouseX * 15 - targetX) * 0.03;
      targetY += (-mouseY * 15 - targetY) * 0.03;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      gridHelper.geometry.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Radial Gradient Glow Overlays for atmosphere */}
      <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-400/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent pointer-events-none" />
    </div>
  );
};
