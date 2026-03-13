import { useEffect, useRef } from 'react';
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
  {
    name: 'David M.',
    program: 'Weight Loss',
    result: 'Lost 30 LBS in 3 months',
    quote: 'Lost 30 LBS in 3 months. The trainers here actually care about your progress and push you to be your best.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Lisa P.',
    program: 'Strength Training',
    result: 'Gained 12 lbs muscle',
    quote: 'Best decision I ever made. The community here is incredible and the results speak for themselves.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Chris T.',
    program: 'Muscle Building',
    result: 'Built elite physique',
    quote: 'From day one, I felt welcomed. The personalized attention helped me achieve goals I never thought possible.',
    rating: 5,
    verified: true,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 uppercase">
            TRANSFORMATIONS <span className="text-crimson">& TESTIMONIALS</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Real results from real members. See how FITKIT has changed lives.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative border border-white/10 rounded-[16px] p-[30px] bg-[#1a1a1a] transition-all duration-300 hover:border-crimson/50 group flex flex-col h-full"
            >
              {/* Quotation Marks */}
              <Quote 
                className="w-[48px] h-[48px] text-crimson mb-4 flex-shrink-0" 
                strokeWidth={1.5}
              />

              {/* Quote Text */}
              <p className="font-inter text-white/90 text-[16px] leading-[1.6] mb-6 flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-[18px] h-[18px] text-yellow-500 fill-yellow-500" 
                  />
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-inter font-bold text-[18px] text-white">
                    {testimonial.name}
                  </h4>
                  <p className="font-inter text-[14px] text-crimson mt-1 font-medium">
                    {testimonial.program}
                  </p>
                </div>
                {testimonial.verified && (
                  <div className="flex items-center gap-1 text-[12px] text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Verified</span>
                  </div>
                )}
              </div>

              {/* Result Bar */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="font-oswald text-lg text-white uppercase tracking-wide">
                  {testimonial.result}
                </p>
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
