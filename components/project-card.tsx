"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/types/portfolio";
import { gsap } from "gsap";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 3D tilt effect on hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className="group overflow-hidden bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
      data-cursor-hover
      style={{ transformStyle: "preserve-3d" }}
    >
      <CardContent className="p-0">
        <div ref={imageRef} className="relative h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            {project.featured && (
              <Badge variant="secondary" className="text-xs">
                Featured
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
