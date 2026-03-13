import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, ChevronRight, Leaf, Beef, Wheat, Droplets, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MealPlan {
  name: string;
  macros: { protein: number; carbs: number; fats: number };
  meals: { type: string; name: string; calories: number }[];
  color: string;
}

const mealPlans: MealPlan[] = [
  {
    name: 'High Protein',
    macros: { protein: 40, carbs: 30, fats: 30 },
    meals: [
      { type: 'Breakfast', name: 'Spinach Omelet', calories: 350 },
      { type: 'Lunch', name: 'Grilled Chicken Salad', calories: 450 },
      { type: 'Dinner', name: 'Salmon & Quinoa', calories: 550 },
    ],
    color: '#ff1a1a',
  },
  {
    name: 'Keto Focus',
    macros: { protein: 35, carbs: 10, fats: 55 },
    meals: [
      { type: 'Breakfast', name: 'Avocado Eggs', calories: 400 },
      { type: 'Lunch', name: 'Steak & Greens', calories: 600 },
      { type: 'Dinner', name: 'Salmon & Asparagus', calories: 500 },
    ],
    color: '#eab308',
  },
  {
    name: 'Balanced',
    macros: { protein: 30, carbs: 40, fats: 30 },
    meals: [
      { type: 'Breakfast', name: 'Oatmeal & Berries', calories: 350 },
      { type: 'Lunch', name: 'Turkey Wrap', calories: 450 },
      { type: 'Dinner', name: 'Chicken & Rice', calories: 550 },
    ],
    color: '#22c55e',
  },
];

const Nutrition = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [rotation, setRotation] = useState(0);

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

      gsap.fromTo(
        plateRef.current,
        { opacity: 0, scale: 0.8, rotateY: -30 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: plateRef.current,
            start: 'top 75%',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.meal-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, rotateZ: (i) => (i - 1) * 5 },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            duration: 0.8,
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

  const currentPlan = mealPlans[selectedPlan];

  // Calculate SVG circle segments for macro visualization
  const circumference = 2 * Math.PI * 80;
  const proteinOffset = circumference * (1 - currentPlan.macros.protein / 100);
  const carbsOffset = circumference * (1 - currentPlan.macros.carbs / 100);
  const fatsOffset = circumference * (1 - currentPlan.macros.fats / 100);

  return (
    <section
      id="nutrition"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-crimson/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Fuel Your Body
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            NUTRITION <span className="text-gradient">PLANS</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Personalized meal plans designed to complement your fitness journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* 3D Macro Plate */}
          <div ref={plateRef} className="flex justify-center perspective-1000">
            <div 
              className="relative w-80 h-80 preserve-3d"
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              {/* Plate Background */}
              <div className="absolute inset-0 rounded-full glass border-4 border-white/10" />
              
              {/* Macro Rings */}
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90">
                {/* Protein Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ff1a1a"
                  strokeWidth="20"
                  strokeDasharray={circumference}
                  strokeDashoffset={proteinOffset}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
                {/* Carbs Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="55"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray={circumference * 0.69}
                  strokeDashoffset={carbsOffset * 0.69}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
                {/* Fats Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="30"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="20"
                  strokeDasharray={circumference * 0.375}
                  strokeDashoffset={fatsOffset * 0.375}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>

              {/* Center Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-oswald text-2xl text-white">{currentPlan.name}</p>
                <p className="font-inter text-xs text-cool-gray mt-1">Macro Split</p>
              </div>

              {/* Legend */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-crimson" />
                  <span className="font-inter text-xs text-cool-gray">Protein {currentPlan.macros.protein}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="font-inter text-xs text-cool-gray">Carbs {currentPlan.macros.carbs}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="font-inter text-xs text-cool-gray">Fats {currentPlan.macros.fats}%</span>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center floating">
                <Beef className="w-6 h-6 text-crimson" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center floating" style={{ animationDelay: '0.5s' }}>
                <Leaf className="w-6 h-6 text-green-500" />
              </div>
              <div className="absolute top-1/2 -right-8 w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center floating" style={{ animationDelay: '1s' }}>
                <Wheat className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Meal Plan Cards */}
          <div ref={cardsRef} className="space-y-4">
            {/* Plan Selector */}
            <div className="flex gap-2 mb-6">
              {mealPlans.map((plan, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPlan(index);
                    setRotation(rotation + 120);
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-oswald text-sm transition-all duration-300 ${
                    selectedPlan === index
                      ? 'bg-crimson text-white shadow-glow-red'
                      : 'glass text-cool-gray hover:text-white'
                  }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>

            {/* Daily Meals */}
            <div className="space-y-3">
              {currentPlan.meals.map((meal, index) => (
                <div
                  key={index}
                  className="meal-card glass-card rounded-2xl p-4 flex items-center justify-between group hover:border-crimson/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-crimson/10 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-crimson" />
                    </div>
                    <div>
                      <p className="font-inter text-xs text-cool-gray">{meal.type}</p>
                      <p className="font-oswald text-lg text-white">{meal.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-oswald text-xl text-white">{meal.calories}</p>
                    <p className="font-inter text-xs text-cool-gray">calories</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="glass-card rounded-2xl p-4 flex items-center justify-between border-crimson/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-crimson flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-inter text-xs text-cool-gray">Daily Total</p>
                  <p className="font-oswald text-lg text-white">{currentPlan.meals.reduce((acc, m) => acc + m.calories, 0)} calories</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-crimson/20 rounded-xl text-crimson font-inter text-sm hover:bg-crimson hover:text-white transition-colors">
                <span>View Full Plan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          {[
            { icon: <Check className="w-5 h-5" />, text: 'Customized Macros' },
            { icon: <Check className="w-5 h-5" />, text: 'Meal Prep Guides' },
            { icon: <Check className="w-5 h-5" />, text: 'Grocery Lists' },
            { icon: <Check className="w-5 h-5" />, text: 'Recipe Database' },
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3 glass rounded-xl p-4">
              <div className="text-crimson">{feature.icon}</div>
              <span className="font-inter text-sm text-white">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Nutrition;
