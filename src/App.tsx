import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Membership from './sections/Membership';
import Trainers from './sections/Trainers';
import Facilities from './sections/Facilities';
import BMICalculator from './sections/BMICalculator';
import Testimonials from './sections/Testimonials';
import Schedule from './sections/Schedule';
import Nutrition from './sections/Nutrition';
import Community from './sections/Community';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll-triggered animations
    const sections = document.querySelectorAll('.reveal-section');
    
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { 
          opacity: 0.8, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-void overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <Membership />
        <Trainers />
        <Facilities />
        <BMICalculator />
        <Testimonials />
        <Schedule />
        <Nutrition />
        <Community />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}

export default App;
