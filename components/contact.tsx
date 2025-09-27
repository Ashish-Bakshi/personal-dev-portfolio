"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactFormComponent } from "./contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "ashishbakshi2004@gmail.com",
    link: "mailto:ashishbakshi2004@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 6006585942",
    link: "tel:+916006585942",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Mohali, India",
    link: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Response Time",
    content: "<24 hours",
    link: null,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to
            life.
          </p>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="group bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  data-cursor-hover
                >
                  <CardContent className="p-6">
                    <div className="flex items-start sm:items-center space-x-0 sm:space-x-4 min-w-0">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm text-muted-foreground truncate">
                          {info.title}
                        </h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-foreground hover:text-primary transition-colors duration-300 break-words max-w-full"
                            data-cursor-hover
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-foreground break-words max-w-full">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Let's Connect</h4>
              <p className="text-muted-foreground leading-relaxed">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a specific project in mind or just
                want to chat about technology and innovation, feel free to reach
                out!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <ContactFormComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
