'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enable smooth scrolling
    gsap.config({
      autoSleep: 60,
      force3D: false,
      nullTargetWarn: false,
    });

    // Refresh ScrollTrigger when window resizes
    ScrollTrigger.addEventListener('refresh', () => ScrollTrigger.refresh());

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}