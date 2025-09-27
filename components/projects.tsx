'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './project-card';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/portfolio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const allTechs = Array.from(
  new Set(projects.flatMap(project => project.tech))
).sort();


export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);

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

      // Filters animation
      gsap.fromTo(
        filtersRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid animation
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 50, rotationX: 45 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.tech.includes(selectedFilter))
      );
    }
  }, [selectedFilter]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    
    // Animate filter change
    gsap.to(gridRef.current?.children || [], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        gsap.fromTo(
          gridRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
        );
      }
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            Featured Projects
          </h2>
        </div>

        <div ref={filtersRef} className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={selectedFilter === 'All' ? 'default' : 'outline'}
            onClick={() => handleFilterChange('All')}
            className="transition-all duration-300"
            data-cursor-hover
          >
            All
          </Button>
          {allTechs.slice(0, 8).map((tech) => (
            <Button
              key={tech}
              variant={selectedFilter === tech ? 'default' : 'outline'}
              onClick={() => handleFilterChange(tech)}
              className="transition-all duration-300"
              data-cursor-hover
            >
              {tech}
            </Button>
          ))}
        </div>

        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}