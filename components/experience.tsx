'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, MapPin } from 'lucide-react';
import { experience } from '@/data/portfolio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Timeline items stagger animation
      gsap.fromTo(
        timelineRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line animation
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the companies I've had the privilege to work with
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="timeline-line absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500 transform origin-top" />
          
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/25 z-10">
                  <Building className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="ml-8 flex-1">
                  <Card className="group bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10">
                    <CardContent className="p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {exp.position}
                          </h3>
                          <div className="flex items-center text-lg font-semibold text-muted-foreground mt-1">
                            <Building className="w-5 h-5 mr-2" />
                            {exp.company}
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="mt-2 sm:mt-0 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {exp.duration}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}