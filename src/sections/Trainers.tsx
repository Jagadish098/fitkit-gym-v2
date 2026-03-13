import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Award, Users, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Trainer {
  name: string;
  role: string;
  image: string;
  experience: string;
  clients: string;
  rating: string;
  specialties: string[];
  bio: string;
}

const trainers: Trainer[] = [
  {
    name: 'Sarah Mitchell',
    role: 'HIIT Specialist',
    image: '/trainer-2.jpg',
    experience: '8+',
    clients: '350+',
    rating: '4.8',
    specialties: ['HIIT', 'Cardio', 'Weight Loss'],
    bio: 'Certified HIIT expert who creates dynamic, high-energy workouts that deliver results.',
  },
  {
    name: 'Mike Johnson',
    role: 'Strength Coach',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800',
    experience: '10+',
    clients: '500+',
    rating: '4.7',
    specialties: ['Strength', 'Powerlifting', 'Hypertrophy'],
    bio: 'Professional strength coach specializing in heavy lifting and metabolic conditioning for elite performance.',
  },
];

const Trainers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState<number | null>(null);

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
      const cards = cardsRef.current?.querySelectorAll('.trainer-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 100, rotateY: -30 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.9,
            stagger: 0.15,
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



  return (
    <section
      id="trainers"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-crimson/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-[110px] md:mb-[90px]">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Expert Guidance
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            MEET OUR <span className="text-gradient">TRAINERS</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            World-class certified trainers dedicated to helping you achieve your fitness goals.
          </p>
        </div>

        {/* Trainers Grid */}
        <div 
          ref={cardsRef}
          className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 max-w-6xl mx-auto px-4 perspective-1000"
        >

            {trainers.map((trainer, index) => {
              const isFlippedCard = isFlipped === index;

              return (
                <div
                  key={index}
                  className="trainer-card relative w-full max-w-[350px] h-[500px] md:h-[550px] preserve-3d cursor-pointer transition-all duration-700 ease-out"
                  onClick={() => setIsFlipped(isFlipped === index ? null : index)}
                >
                  <div 
                    className="relative w-full h-full preserve-3d transition-transform duration-700"
                    style={{
                      transform: isFlippedCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front Card */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="glass-card rounded-3xl overflow-hidden h-full">
                        {/* Image */}
                        <div className="relative h-[65%] overflow-hidden">
                          <img
                            src={trainer.image}
                            alt={trainer.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
                          
                          {/* Rating Badge */}
                          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-void/80 backdrop-blur-sm rounded-full">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-inter text-sm text-white">{trainer.rating}</span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="font-oswald text-2xl font-bold text-white">
                            {trainer.name}
                          </h3>
                          <p className="font-inter text-sm text-crimson mb-4">
                            {trainer.role}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-cool-gray" />
                              <span className="font-inter text-xs text-cool-gray">
                                {trainer.experience} Years
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-cool-gray" />
                              <span className="font-inter text-xs text-cool-gray">
                                {trainer.clients} Clients
                              </span>
                            </div>
                          </div>

                          {/* Specialties */}
                          <div className="flex flex-wrap gap-2">
                            {trainer.specialties.map((specialty, sIndex) => (
                              <span
                                key={sIndex}
                                className="px-2 py-1 text-xs font-inter text-crimson bg-crimson/10 rounded"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>

                          {/* Social Links */}
                          <div className="flex gap-3 mt-4">
                            <a
                              href="#"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-cool-gray hover:text-crimson hover:bg-crimson/10 transition-all"
                            >
                              <Instagram className="w-4 h-4" />
                            </a>
                            <a
                              href="#"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-cool-gray hover:text-crimson hover:bg-crimson/10 transition-all"
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Card */}
                    <div 
                      className="absolute inset-0 backface-hidden"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div className="glass-card rounded-3xl p-8 h-full flex flex-col">
                        <h3 className="font-oswald text-2xl font-bold text-white mb-2">
                          {trainer.name}
                        </h3>
                        <p className="font-inter text-sm text-crimson mb-6">
                          {trainer.role}
                        </p>
                        
                        <p className="font-inter text-sm text-cool-gray leading-relaxed flex-1">
                          {trainer.bio}
                        </p>

                        <div className="mt-6 pt-6 border-t border-white/10">
                          <p className="font-inter text-xs text-cool-gray mb-4">
                            Available for:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 text-xs font-inter text-white bg-crimson/20 rounded-full">
                              1-on-1 Training
                            </span>
                            <span className="px-3 py-1.5 text-xs font-inter text-white bg-crimson/20 rounded-full">
                              Group Classes
                            </span>
                            <span className="px-3 py-1.5 text-xs font-inter text-white bg-crimson/20 rounded-full">
                              Online Coaching
                            </span>
                          </div>
                        </div>

                        <button className="w-full mt-6 py-3 bg-crimson text-white font-oswald font-semibold uppercase tracking-wider rounded-xl hover:bg-white hover:text-void transition-all">
                          Book Session
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>



        {/* Tap Hint */}
        <p className="text-center mt-6 font-inter text-xs text-cool-gray">
          Tap on a card to flip and see more details
        </p>
      </div>
    </section>
  );
};

export default Trainers;
