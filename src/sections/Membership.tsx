import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Plan {
  name: string;
  price: number;
  period: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: 'Basic',
    price: 2999,
    period: 'month',
    description: 'Perfect for beginners starting their fitness journey',
    icon: <Zap className="w-6 h-6" />,
    features: [
      'Gym access (6AM - 10PM)',
      'Basic equipment usage',
      '2 group classes/week',
      'Locker room access',
      'Mobile app access',
    ],
  },
  {
    name: 'Pro',
    price: 6999,
    period: 'month',
    description: 'Most popular choice for serious fitness enthusiasts',
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      '24/7 gym access',
      'All equipment usage',
      'Unlimited group classes',
      '2 PT sessions/month',
      'Nutrition consultation',
      'Sauna & spa access',
      'Guest passes (2/month)',
    ],
    highlighted: true,
    badge: 'POPULAR',
  },
  {
    name: 'Elite',
    price: 12999,
    period: 'month',
    description: 'The ultimate fitness experience with premium perks',
    icon: <Crown className="w-6 h-6" />,
    features: [
      'Everything in Pro',
      'Unlimited PT sessions',
      'Personal locker',
      'Priority class booking',
      'Recovery treatments',
      'VIP lounge access',
      'Unlimited guest passes',
      'Exclusive events',
    ],
  },
];

const Membership = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Price counter animation
  const animatePrice = (element: HTMLElement, targetPrice: number) => {
    gsap.fromTo(
      element,
      { innerText: 0 },
      {
        innerText: targetPrice,
        duration: 1.5,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
      }
    );
  };

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-crimson/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blood-orange/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-crimson/20 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-40 right-20 w-16 h-16 border border-crimson/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-crimson/10 rotate-12" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Pricing Plans
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            CHOOSE YOUR <span className="text-gradient">PLAN</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Flexible membership options designed to fit your lifestyle and fitness goals.
            Start your transformation today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto perspective-1000"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative preserve-3d transition-all duration-500 ${
                plan.highlighted ? 'lg:-mt-4 lg:mb-4' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === index 
                  ? 'translateZ(30px) rotateX(2deg) rotateY(-2deg)' 
                  : 'translateZ(0)',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1 bg-gradient-to-r from-crimson to-blood-orange rounded-full text-xs font-inter font-semibold text-white shadow-glow-red">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div
                className={`relative h-full glass-card rounded-3xl p-8 transition-all duration-500 ${
                  plan.highlighted
                    ? 'border-crimson/50 shadow-glow-red-lg'
                    : ''
                }`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-crimson to-blood-orange text-white'
                    : 'bg-white/5 text-crimson'
                }`}>
                  {plan.icon}
                </div>

                {/* Plan Name */}
                <h3 className="font-oswald text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="font-inter text-sm text-cool-gray mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="font-inter text-2xl text-cool-gray">₹</span>
                  <span 
                    className="font-oswald text-5xl font-bold text-white price-counter"
                    ref={(el) => {
                      if (el) animatePrice(el, plan.price);
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="font-inter text-cool-gray">/{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'bg-crimson/20' : 'bg-white/10'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.highlighted ? 'text-crimson' : 'text-cool-gray'
                        }`} />
                      </div>
                      <span className="font-inter text-sm text-cool-gray">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-xl font-oswald font-semibold uppercase tracking-wider transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-crimson text-white hover:bg-white hover:text-void shadow-glow-red'
                      : 'bg-white/5 text-white border border-white/10 hover:border-crimson hover:bg-crimson/10'
                  }`}
                >
                  Join Now
                </button>

                {/* 3D Effects */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-crimson/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <p className="font-inter text-sm text-cool-gray">
            <span className="text-crimson">*</span> 30-day money-back guarantee. 
            No questions asked. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Membership