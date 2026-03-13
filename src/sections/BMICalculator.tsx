import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Info, RotateCcw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BMICategory {
  range: [number, number];
  label: string;
  color: string;
  description: string;
}

const bmiCategories: BMICategory[] = [
  { range: [0, 18.5], label: 'Underweight', color: '#3b82f6', description: 'You may need to gain weight. Consult a nutritionist.' },
  { range: [18.5, 24.9], label: 'Normal Weight', color: '#22c55e', description: 'Great job! Maintain your healthy lifestyle.' },
  { range: [25, 29.9], label: 'Overweight', color: '#eab308', description: 'Consider a balanced diet and regular exercise.' },
  { range: [30, 100], label: 'Obese', color: '#ef4444', description: 'Consult a healthcare provider for guidance.' },
];

const BMICalculator = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [bmi, setBmi] = useState(24.5);
  const [showResult, setShowResult] = useState(false);

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

      // Calculator animation
      gsap.fromTo(
        calculatorRef.current,
        { opacity: 0, y: 60, rotateY: -10 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: calculatorRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));
  }, [height, weight]);

  const getCategory = (bmiValue: number): BMICategory => {
    return bmiCategories.find(
      (cat) => bmiValue >= cat.range[0] && bmiValue < cat.range[1]
    ) || bmiCategories[bmiCategories.length - 1];
  };

  const category = getCategory(bmi);
  const gaugeRotation = Math.min(Math.max((bmi - 15) * 6, 0), 180);

  return (
    <section
      id="bmi"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-crimson/5 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Fitness Tools
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            KNOW YOUR <span className="text-gradient">BODY</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Calculate your BMI and get personalized recommendations for your fitness journey.
          </p>
        </div>

        {/* Calculator */}
        <div
          ref={calculatorRef}
          className="max-w-4xl mx-auto preserve-3d"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Inputs */}
              <div className="space-y-8">
                {/* Height Input */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-inter text-sm text-cool-gray flex items-center gap-2">
                      <Activity className="w-4 h-4 text-crimson" />
                      Height (cm)
                    </label>
                    <span className="font-oswald text-2xl text-white">{height}</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-cool-gray">
                    <span>140cm</span>
                    <span>220cm</span>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-inter text-sm text-cool-gray flex items-center gap-2">
                      <Activity className="w-4 h-4 text-crimson" />
                      Weight (kg)
                    </label>
                    <span className="font-oswald text-2xl text-white">{weight}</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-cool-gray">
                    <span>40kg</span>
                    <span>150kg</span>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setHeight(175);
                    setWeight(75);
                    setShowResult(false);
                  }}
                  className="flex items-center gap-2 text-cool-gray hover:text-crimson transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="font-inter text-sm">Reset</span>
                </button>
              </div>

              {/* Right Side - 3D Gauge */}
              <div className="flex flex-col items-center">
                {/* 3D Gauge */}
                <div className="relative w-64 h-32 mb-6">
                  {/* Gauge Background */}
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    {/* Background Arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#1a1a1f"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    
                    {/* Colored Segments */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 60 30.7"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 60 30.7 A 80 80 0 0 1 100 20"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 100 20 A 80 80 0 0 1 140 30.7"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 140 30.7 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />

                    {/* Needle */}
                    <g
                      transform={`rotate(${gaugeRotation - 90}, 100, 100)`}
                      style={{ transition: 'transform 0.5s ease-out' }}
                    >
                      <line
                        x1="100"
                        y1="100"
                        x2="100"
                        y2="35"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy="100" r="8" fill="white" />
                      <circle cx="100" cy="100" r="5" fill="#ff1a1a" />
                    </g>
                  </svg>

                  {/* Gauge Labels */}
                  <div className="absolute bottom-0 left-0 text-xs text-cool-gray">15</div>
                  <div className="absolute bottom-0 right-0 text-xs text-cool-gray">40</div>
                </div>

                {/* BMI Display */}
                <div className="text-center mb-6">
                  <p className="font-inter text-sm text-cool-gray mb-2">Your BMI</p>
                  <div 
                    className="font-oswald text-6xl font-bold transition-colors duration-500"
                    style={{ color: category.color }}
                  >
                    {bmi}
                  </div>
                  <div 
                    className="font-inter text-lg mt-2 px-4 py-1 rounded-full inline-block"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      color: category.color 
                    }}
                  >
                    {category.label}
                  </div>
                </div>

                {/* Description */}
                <div className="flex items-start gap-2 max-w-xs">
                  <Info className="w-4 h-4 text-cool-gray flex-shrink-0 mt-0.5" />
                  <p className="font-inter text-xs text-cool-gray">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Result Card */}
            {showResult && (
              <div className="mt-8 glass rounded-2xl p-6 animate-slide-up">
                <h4 className="font-oswald text-xl text-white mb-4">
                  Recommended Next Steps
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="font-inter text-sm text-crimson mb-2">Workout Program</p>
                    <p className="font-inter text-sm text-cool-gray">
                      {bmi < 18.5 
                        ? 'Strength Foundation - Build muscle mass' 
                        : bmi < 25 
                        ? 'Maintenance Program - Keep your progress'
                        : 'Fat Loss Focus - Cardio + Strength combo'}
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="font-inter text-sm text-crimson mb-2">Nutrition Plan</p>
                    <p className="font-inter text-sm text-cool-gray">
                      {bmi < 18.5 
                        ? 'High Protein + Calorie Surplus' 
                        : bmi < 25 
                        ? 'Balanced Macros - Maintain'
                        : 'Calorie Deficit + High Protein'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Calculate Button */}
            {!showResult && (
              <button
                onClick={() => setShowResult(true)}
                className="w-full mt-8 btn-primary"
              >
                Get Personalized Recommendations
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
