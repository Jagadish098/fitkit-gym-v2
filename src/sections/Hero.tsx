import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Phone } from 'lucide-react';

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
    }, heroRef);

    return () => ctx.revert();
  }, []);



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
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-[900px] mx-auto perspective-1000">
          {/* Subtitle */}
          <div className="mb-[20px] overflow-hidden">
            <p className="font-inter text-sm md:text-base text-crimson tracking-[0.3em] uppercase animate-slide-up">
              START YOUR JOURNEY
            </p>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="font-oswald text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-[25px] preserve-3d"
          >
            START YOUR <span className="text-gradient block sm:inline">TRANSFORMATION</span>{' '}
            <span className="text-crimson italic block sm:inline">TODAY</span>
          </h1>

          {/* Subtext */}
          <p
            ref={subtitleRef}
            className="font-inter text-base md:text-lg text-cool-gray max-w-2xl mx-auto mb-[35px]"
          >
            Join 50000 members already transforming their lives
          </p>

          {/* CTA Button */}
          <div
            ref={buttonsRef}
            className="flex items-center justify-center"
          >
            <a
              href="tel:+15551234567"
              className="btn-primary group flex items-center gap-3 px-10 py-5"
            >
              <Phone className="w-5 h-5" />
              <span>CALL NOW</span>
            </a>
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
