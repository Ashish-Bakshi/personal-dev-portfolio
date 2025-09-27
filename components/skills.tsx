'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCard } from './skill-card';
import { skills } from '@/data/portfolio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  { name: 'Frontend', key: 'frontend' },
  { name: 'Backend', key: 'backend' },
  { name: 'Tools', key: 'tools' },
  { name: 'Languages', key: 'languages' }
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </h2>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category.key);
            
            if (categorySkills.length === 0) return null;
            
            return (
              <div key={category.key}>
                <h3 className="text-2xl font-semibold mb-6 text-center">{category.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categorySkills.map((skill, index) => (
                    <SkillCard 
                      key={skill.name} 
                      skill={skill} 
                      index={index}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}