import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      // Buttons animation
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.9,
        }
      );

      // Scroll-triggered title split effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '50% top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titleRef.current) {
            const lines = titleRef.current.querySelectorAll('.title-line');
            gsap.to(lines[0], {
              x: -progress * 50,
              y: -progress * 30,
              opacity: 1 - progress * 0.5,
            });
            gsap.to(lines[1], {
              x: progress * 50,
              y: -progress * 30,
              opacity: 1 - progress * 0.5,
            });
          }
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMembership = () => {
    const element = document.querySelector('#membership');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img
          src="/hero-gym.jpg"
          alt="Gym Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/80" />
      </div>

      {/* Red Accent Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blood-orange/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-20"
      >
        <div className="max-w-5xl mx-auto text-center perspective-1000">
          {/* Pre-title */}
          <div className="mb-6 overflow-hidden">
            <p className="font-inter text-sm md:text-base text-crimson tracking-[0.3em] uppercase animate-slide-up">
              Premium Fitness Experience
            </p>
          </div>

          {/* Main Title with 3D Effect */}
          <h1
            ref={titleRef}
            className="font-oswald text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-none mb-8 preserve-3d"
          >
            <span className="title-line block text-3d">KEEP BODY</span>
            <span className="title-line block text-gradient text-3d mt-2">
              FIT & STRONG
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-inter text-base md:text-lg text-cool-gray max-w-xl mx-auto mb-10"
          >
            Ready to change your physique? Join FITKIT and unlock your full potential
            with world-class trainers, premium equipment, and a community that pushes
            you to be your best.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <button
              onClick={scrollToMembership}
              className="btn-primary group flex items-center gap-3"
            >
              <span>Join With Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToServices}
              className="btn-secondary group flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              <span>Our Services</span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '50K+', label: 'Members' },
              { value: '100+', label: 'Trainers' },
              { value: '24/7', label: 'Access' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <div className="font-oswald text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="font-inter text-xs md:text-sm text-cool-gray mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-inter text-xs text-cool-gray tracking-wider uppercase">
          Scroll Down
        </span>
        <ChevronDown className="w-6 h-6 text-crimson scroll-indicator" />
      </div>

      {/* Side Decorative Elements */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-crimson to-transparent" />
        <span className="font-inter text-xs text-cool-gray tracking-widest uppercase writing-mode-vertical transform rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          Ready To Change
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-crimson to-transparent" />
      </div>

      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-crimson to-transparent" />
        <div className="flex flex-col gap-3">
          {['IG', 'FB', 'YT'].map((social) => (
            <a
              key={social}
              href="#"
              className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full text-xs text-cool-gray hover:text-white hover:border-crimson hover:bg-crimson/10 transition-all duration-300"
            >
              {social}
            </a>
          ))}
        </div>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-crimson to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
