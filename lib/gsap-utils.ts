import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const fadeInUp = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power2.out',
    }
  );
};

export const fadeInLeft = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -50,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      delay,
      ease: 'power2.out',
    }
  );
};

export const fadeInRight = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 50,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      delay,
      ease: 'power2.out',
    }
  );
};

export const staggerAnimation = (elements: string, delay: number = 0.1) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: delay,
      ease: 'power2.out',
    }
  );
};

export const scaleOnHover = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  
  if (el) {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  }
};

export const textReveal = (element: string | Element) => {
  return gsap.fromTo(
    element,
    {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 1.5,
      ease: 'power2.inOut',
    }
  );
};