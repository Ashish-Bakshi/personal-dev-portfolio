'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;
    
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    const onMouseMove = (e: MouseEvent) => {
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    
    const onMouseEnterLink = () => {
      gsap.to([cursor, follower], {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    
    const onMouseLeaveLink = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    
    document.addEventListener('mousemove', onMouseMove);
    
    // Add hover effects to interactive elements
    const links = document.querySelectorAll('a, button, [data-cursor-hover]');
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);
  
  return { cursorRef, followerRef };
};