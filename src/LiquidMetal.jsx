import { useState, useEffect } from 'react';
import { LiquidMetal as LiquidMetal1 } from '@paper-design/shaders-react';

export default function LiquidMetal({
  size = 516,
  image = "https://workers.paper.design/file-assets/01K732DQNVNJK9Y9JN1NQKC32X/01K8TWDB97TEGFN0NREXDNJQHH.png",
  style = {},
  mountDelayMs = 0,
}) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(mountDelayMs === 0);

  useEffect(() => {
    const handleMove = (e) => {
      // normalize coordinates to 0–1
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (mounted) return;
    const t = setTimeout(() => setMounted(true), mountDelayMs);
    return () => clearTimeout(t);
  }, [mounted, mountDelayMs]);

  // Make shimmer follow cursor — no rotation
  const distortion = 0.05 + (mouse.x + mouse.y) * 0.55;
  const shiftRed = 0.2 + mouse.x ;
  const shiftBlue = 0.2 + mouse.y;
  const softness = 0.08 + mouse.y;
  const angle = 60 + mouse.x * 40;

  if (!mounted) {
    return (
      <div style={{
        backgroundColor: '#000000',
        borderRadius: '12px',
        height: `${size}px`,
        width: `${size}px`,
        opacity: 0,
        ...style,
      }} />
    );
  }

  return (
    <LiquidMetal1
      image={image}
      speed={1}
      colorBack="#00000000"
      colorTint="#FFFFFF"
      softness={softness}
      repetition={2}
      shiftRed={shiftRed}
      shiftBlue={shiftBlue}
      distortion={distortion}
      contour={0.4}
      scale={1}
      rotation={0}
      shape="diamond"
      angle={angle}
      style={{
        backgroundColor: '#000000',
        borderRadius: '12px',
        height: `${size}px`,
        width: `${size}px`,
        transition: 'all 0.2s linear',
        ...style,
      }}
    />
  );
}
