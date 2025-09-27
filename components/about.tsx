'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, Zap, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'Building scalable applications with modern technologies and best practices.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user experiences that engage and delight.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing applications for speed, accessibility, and user experience.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Working effectively in teams and communicating complex ideas clearly.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 50, rotationY: 45 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
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
    <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            About Me
          </h2>
          <p 
            ref={textRef}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            I’m a passionate Full-Stack Developer, building modern, performant, and scalable web applications. I work with React, TypeScript, Node.js, Prisma, and PostgreSQL, and I’m actively deepening my skills in Next.js for production-ready apps. I’m also exploring Mobile Development with React Native/Expo and diving into Web3. I value clean, efficient code, continuous learning, and contributing to open-source projects. Outside coding, I mentor peers, refine UI designs, and experiment with new frameworks and tools.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group bg-card/50 backdrop-blur-md border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10"
              data-cursor-hover
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}