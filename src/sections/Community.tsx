import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Flame, Target, Users, TrendingUp, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Challenge {
  name: string;
  participants: number;
  daysLeft: number;
  progress: number;
  reward: string;
}

const challenges: Challenge[] = [
  { name: '30-Day Shred', participants: 245, daysLeft: 12, progress: 60, reward: 'Gold Badge' },
  { name: '10K Steps Daily', participants: 512, daysLeft: 18, progress: 40, reward: 'Silver Badge' },
  { name: 'Morning Warrior', participants: 189, daysLeft: 5, progress: 83, reward: 'Bronze Badge' },
];

const Community = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeChallenge, setActiveChallenge] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-crimson/10 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Join the Movement
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            COMMUNITY & <span className="text-gradient">CHALLENGES</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Compete, connect, and celebrate victories together.
          </p>
        </div>

        {/* Active Challenges */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-oswald text-2xl text-white text-center mb-8">Active Challenges</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeChallenge === index ? 'border-crimson/50 scale-105' : 'hover:border-crimson/30'
                }`}
                onClick={() => setActiveChallenge(index)}
              >
                {/* Challenge Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-crimson/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-crimson" />
                  </div>
                  <span className="px-3 py-1 bg-crimson/20 text-crimson text-xs font-inter rounded-full">
                    {challenge.daysLeft} days left
                  </span>
                </div>

                {/* Challenge Name */}
                <h4 className="font-oswald text-xl text-white mb-2">{challenge.name}</h4>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-inter text-cool-gray">Progress</span>
                    <span className="font-inter text-white">{challenge.progress}%</span>
                  </div>
                  <div className="h-2 bg-charcoal rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-crimson to-blood-orange rounded-full transition-all duration-500"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cool-gray">
                    <Users className="w-4 h-4" />
                    <span className="font-inter text-sm">{challenge.participants}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-inter text-sm text-cool-gray">{challenge.reward}</span>
                  </div>
                </div>

                {/* Join Button */}
                <button className="w-full mt-4 py-3 bg-crimson/20 text-crimson rounded-xl font-oswald font-semibold uppercase hover:bg-crimson hover:text-white transition-colors">
                  Join Challenge
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { icon: <Users className="w-5 h-5" />, value: '50K+', label: 'Active Members' },
            { icon: <TrendingUp className="w-5 h-5" />, value: '1.2M', label: 'Workouts Completed' },
            { icon: <Flame className="w-5 h-5" />, value: '850K', label: 'Calories Burned' },
            { icon: <Trophy className="w-5 h-5" />, value: '12K', label: 'Challenges Won' },
          ].map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-crimson/20 flex items-center justify-center text-crimson">
                {stat.icon}
              </div>
              <div>
                <p className="font-oswald text-xl text-white">{stat.value}</p>
                <p className="font-inter text-xs text-cool-gray">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
