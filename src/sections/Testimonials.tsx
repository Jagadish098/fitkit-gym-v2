import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, CheckCircle, Flame, Heart, Dumbbell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  program: string;
  result: string;
  quote: string;
  rating: number;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah K.',
    program: 'HIIT Transformation',
    result: 'Lost 30 lbs in 3 months',
    quote: 'I never thought I could enjoy working out until FITKIT. The trainers are incredible and the community keeps me motivated every single day.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Michael R.',
    program: 'Strength Builder',
    result: 'Gained 15 lbs muscle',
    quote: 'The equipment and facilities are world-class. I have seen more progress in 6 months here than in 2 years at my old gym.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Emily T.',
    program: 'Yoga & Wellness',
    result: 'Improved flexibility 200%',
    quote: 'FITKIT changed my life. The yoga classes are amazing and the recovery spa is exactly what I needed.',
    rating: 5,
    verified: true,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

      // Before/After slider animation
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-crimson/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blood-orange/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Success Stories
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            TRANSFORMATIONS & <span className="text-gradient">TESTIMONIALS</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Real results from real members. See how FITKIT has changed lives.
          </p>
        </div>

        {/* Before/After 3D Slider */}
        <div
          ref={sliderRef}
          className="relative max-w-4xl mx-auto mb-16 perspective-1000"
        >
          <div 
            className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize preserve-3d shadow-3d"
            onMouseMove={handleSliderMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={handleSliderMove}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* After Image (Full) */}
            <div className="absolute inset-0">
              <img
                src="/transformation.jpg"
                alt="After"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ 
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                filter: 'grayscale(100%)',
              }}
            >
              <img
                src="/transformation.jpg"
                alt="Before"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-crimson cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-crimson rounded-full flex items-center justify-center shadow-glow-red animate-pulse-glow">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-white/50 rounded-full" />
                  <div className="w-1 h-4 bg-white/50 rounded-full" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div 
              className="absolute top-6 left-6 px-4 py-2 bg-void/80 backdrop-blur-sm rounded-full font-inter text-sm text-white"
              style={{ opacity: sliderPosition > 20 ? 1 : 0 }}
            >
              BEFORE
            </div>
            <div 
              className="absolute top-6 right-6 px-4 py-2 bg-crimson/80 backdrop-blur-sm rounded-full font-inter text-sm text-white"
              style={{ opacity: sliderPosition < 80 ? 1 : 0 }}
            >
              AFTER
            </div>

            {/* Result Badge */}
            <div className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3">
              <p className="font-oswald text-xl text-white">Lost 30 LBS</p>
              <p className="font-inter text-xs text-cool-gray">in 3 months</p>
            </div>
          </div>

        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`glass-card rounded-3xl p-6 transition-all duration-500 cursor-pointer ${
                activeTestimonial === index ? 'scale-105 border-crimson/30' : 'hover:scale-[1.02]'
              }`}
              onClick={() => setActiveTestimonial(index)}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-crimson/30 mb-4" />

              {/* Quote Text */}
              <p className="font-inter text-sm text-cool-gray mb-6 line-clamp-4">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-oswald text-lg text-white">{testimonial.name}</p>
                  <p className="font-inter text-xs text-crimson">{testimonial.program}</p>
                </div>
                {testimonial.verified && (
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Result */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="font-oswald text-lg text-white">{testimonial.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Counter */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 glass rounded-2xl px-8 py-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson to-blood-orange border-2 border-void flex items-center justify-center"
                >
                  <span className="font-inter text-xs text-white">{i}</span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-oswald text-2xl text-white">1,247</p>
              <p className="font-inter text-xs text-cool-gray">members working out now</p>
            </div>
          </div>
        </div>

        {/* Reaction Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {[
            { icon: <Flame className="w-5 h-5" />, label: 'Fire', count: '2.4k' },
            { icon: <Dumbbell className="w-5 h-5" />, label: 'Strong', count: '1.8k' },
            { icon: <Heart className="w-5 h-5" />, label: 'Love', count: '3.2k' },
          ].map((reaction, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-crimson/20 transition-colors"
            >
              <span className="text-crimson">{reaction.icon}</span>
              <span className="font-inter text-sm text-white">{reaction.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
