'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skill } from '@/types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Icons from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Icon hover animation
      const handleMouseEnter = () => {
        gsap.to(iconRef.current, {
          scale: 1.2,
          rotation: 360,
          duration: 0.6,
          ease: 'back.out(1.7)',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(iconRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const card = cardRef.current;
      if (card) {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
        if (card) {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'backend':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'tools':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'design':
        return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  // Get the icon component dynamically
  const IconComponent = Icons[skill.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Card 
      ref={cardRef}
      className="group bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
      data-cursor-hover
    >
      <CardContent className="p-8 text-center">
        <div 
          ref={iconRef}
          className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${getCategoryColor(skill.category)}`}
        >
          {IconComponent && <IconComponent className="w-10 h-10" />}
        </div>
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
          {skill.name}
        </h3>
        
        <span className={`text-sm font-medium uppercase tracking-wide ${getCategoryColor(skill.category).split(' ')[0]}`}>
          {skill.category}
        </span>
      </CardContent>
    </Card>
  );
}