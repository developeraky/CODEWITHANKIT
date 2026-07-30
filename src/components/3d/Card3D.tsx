import React, { useState, useRef } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'gold' | 'blue' | 'cyan' | 'purple';
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  glowColor = 'gold'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightX, setLightX] = useState(50);
  const [lightY, setLightY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setLightX((x / rect.width) * 100);
    setLightY((y / rect.height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setLightX(50);
    setLightY(50);
  };

  const getGlowBorder = () => {
    switch (glowColor) {
      case 'gold':
        return 'border-amber-500/30 hover:border-amber-400/80 shadow-[0_0_25px_rgba(255,215,0,0.15)]';
      case 'blue':
        return 'border-blue-500/30 hover:border-blue-400/80 shadow-[0_0_25px_rgba(59,130,246,0.15)]';
      case 'cyan':
        return 'border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.15)]';
      default:
        return 'border-amber-500/30 hover:border-amber-400/80';
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className={`relative group ${className}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out'
        }}
        className={`relative w-full h-full rounded-2xl bg-zinc-950/80 backdrop-blur-xl border ${getGlowBorder()} transition-colors duration-300 overflow-hidden`}
      >
        {/* Dynamic Specular Light Glow overlay */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${lightX}% ${lightY}%, rgba(255,215,0,0.12), transparent 80%)`
            }}
          />
        )}
        
        {/* Glassmorphism subtle noise texture */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
