'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/ashish-bakshi', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ashishbakshi2004', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ashishbakshi2004@gmail.com', label: 'Email' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          end: 'bottom 100%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-muted/30 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center">
          {/* Logo and tagline */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
              Ashish Bakshi
            </h3>
            <p className="text-muted-foreground">
              Building exceptional digital experiences
            </p>
          </div>

          {/* Social links */}
          <div className="flex space-x-4 mb-8">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                asChild
                className="h-12 w-12 rounded-full backdrop-blur-md bg-background/10 hover:bg-background/20 transition-all duration-300 hover:scale-110"
                data-cursor-hover
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <social.icon className="h-6 w-6" />
                </a>
              </Button>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center text-sm text-muted-foreground">
            <span>© 2025 Made with code & ❤️ by Ashish Bakshi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}