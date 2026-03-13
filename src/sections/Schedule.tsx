import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, Flame, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Class {
  time: string;
  name: string;
  duration: string;
  instructor: string;
  intensity: 'Low' | 'Medium' | 'High';
  spots: number;
  totalSpots: number;
}

interface DaySchedule {
  day: string;
  classes: Class[];
}

const scheduleData: DaySchedule[] = [
  {
    day: 'Mon',
    classes: [
      { time: '6:00 AM', name: 'Yoga Flow', duration: '45 min', instructor: 'Sarah M.', intensity: 'Low', spots: 8, totalSpots: 20 },
      { time: '7:30 AM', name: 'HIIT Blast', duration: '30 min', instructor: 'Alex C.', intensity: 'High', spots: 3, totalSpots: 15 },
      { time: '5:00 PM', name: 'Spin Class', duration: '45 min', instructor: 'Mike T.', intensity: 'Medium', spots: 12, totalSpots: 25 },
      { time: '6:30 PM', name: 'Strength 101', duration: '60 min', instructor: 'Marcus J.', intensity: 'Medium', spots: 6, totalSpots: 12 },
    ],
  },
  {
    day: 'Tue',
    classes: [
      { time: '6:00 AM', name: 'CrossFit', duration: '60 min', instructor: 'Alex C.', intensity: 'High', spots: 5, totalSpots: 12 },
      { time: '12:00 PM', name: 'Lunch Yoga', duration: '30 min', instructor: 'Sarah M.', intensity: 'Low', spots: 15, totalSpots: 20 },
      { time: '5:30 PM', name: 'Boxing', duration: '45 min', instructor: 'Mike T.', intensity: 'High', spots: 4, totalSpots: 10 },
      { time: '7:00 PM', name: 'Pilates', duration: '45 min', instructor: 'Emma R.', intensity: 'Low', spots: 10, totalSpots: 15 },
    ],
  },
  {
    day: 'Wed',
    classes: [
      { time: '6:30 AM', name: 'Bootcamp', duration: '45 min', instructor: 'Marcus J.', intensity: 'High', spots: 6, totalSpots: 20 },
      { time: '9:00 AM', name: 'Aqua Fit', duration: '45 min', instructor: 'Lisa K.', intensity: 'Low', spots: 18, totalSpots: 25 },
      { time: '5:00 PM', name: 'Power Lift', duration: '60 min', instructor: 'Alex C.', intensity: 'High', spots: 4, totalSpots: 8 },
      { time: '6:30 PM', name: 'Zumba', duration: '45 min', instructor: 'Maria G.', intensity: 'Medium', spots: 20, totalSpots: 30 },
    ],
  },
  {
    day: 'Thu',
    classes: [
      { time: '7:00 AM', name: 'TRX', duration: '45 min', instructor: 'Mike T.', intensity: 'Medium', spots: 7, totalSpots: 12 },
      { time: '12:00 PM', name: 'Core Blast', duration: '30 min', instructor: 'Sarah M.', intensity: 'Medium', spots: 12, totalSpots: 20 },
      { time: '5:30 PM', name: 'Kickboxing', duration: '60 min', instructor: 'Alex C.', intensity: 'High', spots: 5, totalSpots: 15 },
      { time: '7:00 PM', name: 'Stretch & Recover', duration: '30 min', instructor: 'Emma R.', intensity: 'Low', spots: 15, totalSpots: 20 },
    ],
  },
  {
    day: 'Fri',
    classes: [
      { time: '6:00 AM', name: 'Morning Run', duration: '45 min', instructor: 'Marcus J.', intensity: 'Medium', spots: 10, totalSpots: 15 },
      { time: '10:00 AM', name: 'Barre', duration: '45 min', instructor: 'Lisa K.', intensity: 'Low', spots: 14, totalSpots: 18 },
      { time: '5:00 PM', name: 'Friday Fury', duration: '60 min', instructor: 'Mike T.', intensity: 'High', spots: 8, totalSpots: 25 },
      { time: '6:30 PM', name: 'Meditation', duration: '30 min', instructor: 'Sarah M.', intensity: 'Low', spots: 20, totalSpots: 25 },
    ],
  },
  {
    day: 'Sat',
    classes: [
      { time: '8:00 AM', name: 'Weekend Warrior', duration: '90 min', instructor: 'Alex C.', intensity: 'High', spots: 6, totalSpots: 15 },
      { time: '10:00 AM', name: 'Family Yoga', duration: '45 min', instructor: 'Emma R.', intensity: 'Low', spots: 18, totalSpots: 25 },
      { time: '2:00 PM', name: 'Open Gym', duration: '3 hrs', instructor: 'Staff', intensity: 'Medium', spots: 50, totalSpots: 100 },
    ],
  },
  {
    day: 'Sun',
    classes: [
      { time: '9:00 AM', name: 'Sunrise Yoga', duration: '60 min', instructor: 'Sarah M.', intensity: 'Low', spots: 15, totalSpots: 20 },
      { time: '11:00 AM', name: 'Recovery Flow', duration: '45 min', instructor: 'Lisa K.', intensity: 'Low', spots: 20, totalSpots: 25 },
      { time: '3:00 PM', name: 'Open Gym', duration: '3 hrs', instructor: 'Staff', intensity: 'Medium', spots: 50, totalSpots: 100 },
    ],
  },
];

const Schedule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

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
        timelineRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentDay = scheduleData[selectedDay];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Low': return 'bg-green-500/20 text-green-500';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-500';
      case 'High': return 'bg-crimson/20 text-crimson';
      default: return 'bg-cool-gray/20 text-cool-gray';
    }
  };

  const getSpotsColor = (spots: number, total: number) => {
    const percentage = spots / total;
    if (percentage < 0.3) return 'text-crimson';
    if (percentage < 0.6) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-crimson/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Class Schedule
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            BOOK YOUR <span className="text-gradient">WORKOUT</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Choose from our wide variety of classes led by expert instructors.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-2 glass rounded-2xl overflow-x-auto max-w-full">
            {scheduleData.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`relative px-4 py-3 rounded-xl font-oswald text-lg transition-all duration-300 min-w-[60px] ${
                  selectedDay === index
                    ? 'bg-crimson text-white shadow-glow-red'
                    : 'text-cool-gray hover:text-white hover:bg-white/5'
                }`}
                style={{
                  transform: selectedDay === index ? 'translateZ(20px) scale(1.05)' : 'translateZ(0)',
                }}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-crimson via-crimson/50 to-transparent" />

            {/* Classes */}
            <div className="space-y-6">
              {currentDay.classes.map((classItem, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-crimson rounded-full border-4 border-void transform -translate-x-1/2 z-10 shadow-glow-red" />

                  {/* Card */}
                  <div 
                    className={`ml-12 md:ml-0 md:w-[45%] ${
                      index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <div 
                      className="glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-crimson/30"
                      onClick={() => setSelectedClass(classItem)}
                    >
                      {/* Time & Duration */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-crimson" />
                          <span className="font-oswald text-lg text-white">{classItem.time}</span>
                        </div>
                        <span className="font-inter text-xs text-cool-gray">{classItem.duration}</span>
                      </div>

                      {/* Class Name */}
                      <h3 className="font-oswald text-xl text-white mb-2">{classItem.name}</h3>

                      {/* Instructor */}
                      <p className="font-inter text-sm text-cool-gray mb-3">
                        with {classItem.instructor}
                      </p>

                      {/* Tags */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 text-xs font-inter rounded ${getIntensityColor(classItem.intensity)}`}>
                            <Flame className="w-3 h-3 inline mr-1" />
                            {classItem.intensity}
                          </span>
                        </div>
                        <div className={`flex items-center gap-1 font-inter text-xs ${getSpotsColor(classItem.spots, classItem.totalSpots)}`}>
                          <Users className="w-3 h-3" />
                          {classItem.spots} spots left
                        </div>
                      </div>

                      {/* Urgency Badge */}
                      {classItem.spots < 5 && (
                        <div className="absolute -top-2 -right-2 px-3 py-1 bg-crimson text-white text-xs font-inter font-semibold rounded-full animate-pulse">
                          ALMOST FULL
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Book Class Modal */}
        {selectedClass && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClass(null)}
          >
            <div className="absolute inset-0 bg-void/95 backdrop-blur-xl" />
            
            <div 
              className="relative w-full max-w-md glass-card rounded-3xl p-8 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-oswald text-2xl text-white mb-2">{selectedClass.name}</h3>
              <p className="font-inter text-cool-gray mb-6">with {selectedClass.instructor}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-crimson" />
                  <span className="font-inter text-white">{currentDay.day}day, {selectedClass.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-crimson" />
                  <span className="font-inter text-white">{selectedClass.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-crimson" />
                  <span className={`font-inter ${getSpotsColor(selectedClass.spots, selectedClass.totalSpots)}`}>
                    {selectedClass.spots} spots remaining
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedClass(null)}
                  className="flex-1 py-3 border border-white/20 rounded-xl font-inter text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-crimson text-white rounded-xl font-oswald font-semibold uppercase hover:bg-white hover:text-void transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Schedule;
