"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Hero3D } from "./hero-3d";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100, rotationX: 90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .fromTo(
        [ctaRef.current, socialRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Floating animation for social icons
    gsap.to(socialRef.current?.children || [], {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <Hero3D />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight"
        >
          Ashish Bakshi
        </h1>

        <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-muted-foreground">
          Full Stack Developer
        </div>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting immersive digital experiences with cutting-edge technologies
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <a href="/AshishResume.pdf" download="AshishResume.pdf">
            <Button
              size="lg"
              className="text-lg px-8 py-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 transform hover:scale-105"
              data-cursor-hover
            >
              Downlaod Resume
            </Button>
          </a>

          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-3 backdrop-blur-md bg-background/10 border-primary/20 hover:bg-background/20 transition-all duration-300"
            data-cursor-hover
            onClick={scrollToContact}
          >
            Get In Touch
          </Button>
        </div>

        <div ref={socialRef} className="flex gap-6 justify-center mb-12">
          <a
            href="https://github.com/Ashish-Bakshi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full backdrop-blur-md bg-background/10 hover:bg-background/20 transition-all duration-300"
              data-cursor-hover
            >
              <Github className="h-6 w-6" />
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/ashishbakshi2004/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full backdrop-blur-md bg-background/10 hover:bg-background/20 transition-all duration-300"
              data-cursor-hover
            >
              <Linkedin className="h-6 w-6" />
            </Button>
          </a>
          <a
            href="mailto:ashishbakshi2004@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full backdrop-blur-md bg-background/10 hover:bg-background/20 transition-all duration-300"
              data-cursor-hover
            >
              <Mail className="h-6 w-6" />
            </Button>
          </a>
        </div>

        <Button
          variant="ghost"
          onClick={scrollToAbout}
          className="animate-bounce text-muted-foreground hover:text-foreground transition-colors duration-300"
          data-cursor-hover
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}
