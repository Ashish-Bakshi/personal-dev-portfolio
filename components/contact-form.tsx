"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CircleCheck as CheckCircle } from "lucide-react";
import { ContactForm } from "@/types/portfolio";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactFormComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    // Form field animations
    const inputs = formRef.current?.querySelectorAll("input, textarea");
    inputs?.forEach((input, index) => {
      gsap.fromTo(
        input,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
        }
      );
    });
  }, []);

  // const onSubmit = async (data: ContactForm) => {
  //   setIsLoading(true);

  //   // Simulate form submission
  //   await new Promise(resolve => setTimeout(resolve, 2000));

  //   setIsLoading(false);
  //   setIsSubmitted(true);
  //   reset();

  //   // Reset success message after 3 seconds
  //   setTimeout(() => setIsSubmitted(false), 3000);
  // };
  const onSubmit = async (data: ContactForm) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setIsSubmitted(true);
        reset();
        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert(result.message || "Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error("Error sending contact form:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Name
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Your full name"
            className="bg-background/50 backdrop-blur-md border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            data-cursor-hover
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="your.email@example.com"
            className="bg-background/50 backdrop-blur-md border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            data-cursor-hover
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-sm font-medium">
          Subject
        </Label>
        <Input
          id="subject"
          {...register("subject")}
          placeholder="What's this about?"
          className="bg-background/50 backdrop-blur-md border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          data-cursor-hover
        />
        {errors.subject && (
          <span className="text-sm text-red-500">{errors.subject.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          rows={6}
          {...register("message")}
          placeholder="Tell me about your project or idea..."
          className="bg-background/50 backdrop-blur-md border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
          data-cursor-hover
        />
        {errors.message && (
          <span className="text-sm text-red-500">{errors.message.message}</span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || isSubmitted}
        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:ring-2 focus:ring-primary/20"
        data-cursor-hover
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Sending...
          </>
        ) : isSubmitted ? (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            Message Sent!
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
