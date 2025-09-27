'use client';

import { useCursor } from '@/hooks/use-cursor';

export function Cursor() {
  const { cursorRef, followerRef } = useCursor();
  
  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}