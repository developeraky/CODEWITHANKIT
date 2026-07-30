import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroGlobeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const sphereGeometry = new THREE.SphereGeometry(70, 36, 36);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(mainSphere);

    const innerGeometry = new THREE.SphereGeometry(62, 32, 32);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.08
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    globeGroup.add(innerSphere);

    const particleCount = 1200;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xffd700);
    const blueColor = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 72 + (Math.random() * 4 - 2);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixColor = Math.random() > 0.3 ? blueColor : goldColor;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const pointCloud = new THREE.Points(particlesGeometry, particlesMaterial);
    globeGroup.add(pointCloud);

    const createOrbitRing = (radius: number, colorHex: number, rx: number, ry: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.4, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.6
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rx;
      ring.rotation.y = ry;
      return ring;
    };

    const ring1 = createOrbitRing(95, 0xffd700, Math.PI / 3, Math.PI / 6);
    const ring2 = createOrbitRing(105, 0x3b82f6, Math.PI / 2.2, -Math.PI / 4);
    globeGroup.add(ring1);
    globeGroup.add(ring2);

    const hubCoords = [
      { name: 'Silicon Valley', lat: 37.3861, lng: -122.0839 },
      { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
      { name: 'London', lat: 51.5074, lng: -0.1278 },
      { name: 'Dubai', lat: 25.2048, lng: 55.2708 }
    ];

    hubCoords.forEach(hub => {
      const phi = (90 - hub.lat) * (Math.PI / 180);
      const theta = (hub.lng + 180) * (Math.PI / 180);
      const r = 73;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      const markerGeo = new THREE.SphereGeometry(2, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(x, y, z);
      globeGroup.add(marker);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 2, 300);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((event.clientY - rect.top) / height - 0.5) * 2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      globeGroup.rotation.y += 0.003;
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.004;

      globeGroup.rotation.x += (mouseY * 0.2 - globeGroup.rotation.x) * 0.05;
      globeGroup.rotation.y += (mouseX * 0.2) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[380px] lg:min-h-[500px]">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute inset-0 pointer-events-none bg-radial from-blue-600/10 via-amber-500/5 to-transparent blur-3xl rounded-full -z-10" />
    </div>
  );
};
