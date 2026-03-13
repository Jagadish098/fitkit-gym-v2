import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, User, Apple, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: <Play className="w-8 h-8" />,
    title: 'Workout Videos',
    description: 'Access to hundreds of free, full-length workout videos for all fitness levels.',
    features: ['HD Quality', 'New Weekly', 'All Levels'],
  },
  {
    icon: <User className="w-8 h-8" />,
    title: 'Personal Training',
    description: 'One-on-one sessions with certified trainers tailored to your goals.',
    features: ['Custom Plans', 'Progress Tracking', 'Nutrition Guide'],
  },
  {
    icon: <Apple className="w-8 h-8" />,
    title: 'Nutrition Plans',
    description: 'Personalized meal plans and macro tracking for optimal results.',
    features: ['Meal Prep', 'Macro Calc', 'Recipes'],
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Group Classes',
    description: 'High-energy group workouts from yoga to HIIT and everything between.',
    features: ['Yoga', 'HIIT', 'Spin'],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger animation
      const cards = carouselRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCard = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    
    const newIndex = direction === 'next' 
      ? Math.min(activeIndex + 1, services.length - 1)
      : Math.max(activeIndex - 1, 0);
    
    setActiveIndex(newIndex);
    
    const cardWidth = carouselRef.current.querySelector('.service-card')?.clientWidth || 300;
    const gap = 24;
    carouselRef.current.scrollTo({
      left: newIndex * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Red Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-crimson/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            What We Offer
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            OUR <span className="text-gradient">SERVICES</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Everything you need to achieve your fitness goals, all in one place.
            From personalized training to nutrition guidance.
          </p>
        </div>

        {/* Carousel Navigation (Mobile) */}
        <div className="flex justify-end gap-2 mb-6 lg:hidden">
          <button
            onClick={() => scrollToCard('prev')}
            disabled={activeIndex === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white disabled:opacity-30 hover:border-crimson hover:bg-crimson/10 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToCard('next')}
            disabled={activeIndex === services.length - 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white disabled:opacity-30 hover:border-crimson hover:bg-crimson/10 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Services Carousel */}
        <div
          ref={carouselRef}
          className="horizontal-scroll gap-6 pb-8 perspective-1000"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card relative flex-shrink-0 w-[300px] md:w-[350px] glass-card rounded-3xl p-8 preserve-3d transition-all duration-500 ${
                index === activeIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
              }`}
              style={{
                transform: `rotateY(${index === activeIndex ? 0 : index < activeIndex ? 15 : -15}deg)`,
              }}
            >
              {/* Floating Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-crimson/30 rounded-2xl blur-xl" />
                <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-crimson to-blood-orange rounded-2xl text-white floating">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-oswald text-2xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="font-inter text-sm text-cool-gray mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, fIndex) => (
                  <span
                    key={fIndex}
                    className="px-3 py-1 text-xs font-inter text-crimson bg-crimson/10 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="group flex items-center gap-2 font-inter text-sm text-white hover:text-crimson transition-colors">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* 3D Border Effect */}
              <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-crimson/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                carouselRef.current?.scrollTo({
                  left: index * 324,
                  behavior: 'smooth',
                });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-crimson'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
