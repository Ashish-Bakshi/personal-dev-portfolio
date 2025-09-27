import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      
      {/* Background particles for entire site */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      </div>
      
      <section id="hero">
        <Hero />
      </section>
      
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}