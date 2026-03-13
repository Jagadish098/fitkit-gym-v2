import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2, X, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Facility {
  name: string;
  description: string;
  image: string;
  size: string;
  features: string[];
  badge?: string;
}

const facilities: Facility[] = [
  {
    name: 'Weight Room',
    description: 'Premium free weights, racks, and machines for serious lifting',
    image: '/facility-1.jpg',
    size: '2,500 sq ft',
    features: ['Dumbbells up to 150lbs', 'Power Racks', 'Plate-loaded Machines'],
    badge: 'NEW',
  },
  {
    name: 'Cardio Theater',
    description: 'State-of-the-art cardio equipment with entertainment systems',
    image: '/facility-2.jpg',
    size: '1,800 sq ft',
    features: ['Treadmills', 'Ellipticals', 'Rowing Machines'],
  },
  {
    name: 'Functional Zone',
    description: 'CrossFit-style training area with turf and functional equipment',
    image: '/facility-3.jpg',
    size: '2,000 sq ft',
    features: ['Battle Ropes', 'Kettlebells', 'Turf Track'],
    badge: 'TRENDING',
  },
  {
    name: 'Group Studio',
    description: 'Spacious studio for yoga, spin, and group fitness classes',
    image: '/facility-4.jpg',
    size: '1,500 sq ft',
    features: ['Yoga Classes', 'Spin Bikes', 'HIIT Sessions'],
  },
];

const Facilities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

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

      // Grid items animation with stagger
      const items = gridRef.current?.querySelectorAll('.facility-item');
      if (items) {
        items.forEach((item, index) => {
          const zDepth = index % 3 === 0 ? 30 : index % 3 === 1 ? 0 : -20;
          
          gsap.fromTo(
            item,
            { 
              opacity: 0, 
              y: 60,
              rotateX: 5,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
              },
            }
          );

          // Parallax effect on scroll
          gsap.to(item, {
            y: zDepth * 0.3,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-crimson/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Premium Spaces
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            OUR <span className="text-gradient">FACILITIES</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            World-class equipment and spaces designed for every type of workout.
          </p>
        </div>

        {/* 3D Grid Gallery */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto perspective-1000"
        >
          {facilities.map((facility, index) => (
            <div
              key={index}
              className={`facility-item preserve-3d ${
                index % 3 === 0 ? 'md:translate-z-[30px]' : 
                index % 3 === 2 ? 'md:translate-z-[-20px]' : ''
              }`}
              style={{
                marginTop: index % 2 === 1 ? '2rem' : '0',
              }}
            >
              <div 
                className="group relative glass-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                onClick={() => setSelectedFacility(facility)}
              >
                {/* Image */}
                <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Red Overlay on Hover */}
                  <div className="absolute inset-0 bg-crimson/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />

                  {/* Badge */}
                  {facility.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-crimson text-white text-xs font-inter font-semibold rounded-full animate-pulse-glow">
                      {facility.badge}
                    </div>
                  )}

                  {/* Expand Icon */}
                  <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-void/60 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-crimson" />
                    <span className="font-inter text-xs text-cool-gray">
                      {facility.size}
                    </span>
                  </div>
                  <h3 className="font-oswald text-2xl font-bold text-white mb-2">
                    {facility.name}
                  </h3>
                  <p className="font-inter text-sm text-cool-gray line-clamp-2">
                    {facility.description}
                  </p>
                </div>

                {/* 3D Border Glow */}
                <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-crimson/30 transition-colors pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedFacility && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFacility(null)}
        >
          <div className="absolute inset-0 bg-void/95 backdrop-blur-xl" />
          
          <div 
            className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-void/60 backdrop-blur-sm rounded-full text-white hover:bg-crimson transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-[300px] md:h-[500px]">
                <img
                  src={selectedFacility.image}
                  alt={selectedFacility.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-void/50 md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent md:hidden" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-crimson" />
                  <span className="font-inter text-sm text-cool-gray">
                    {selectedFacility.size}
                  </span>
                  {selectedFacility.badge && (
                    <span className="ml-auto px-3 py-1 bg-crimson text-white text-xs font-inter font-semibold rounded-full">
                      {selectedFacility.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-4">
                  {selectedFacility.name}
                </h3>

                <p className="font-inter text-cool-gray mb-6">
                  {selectedFacility.description}
                </p>

                <div className="mb-8">
                  <h4 className="font-inter text-sm text-white mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {selectedFacility.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-crimson rounded-full" />
                        <span className="font-inter text-sm text-cool-gray">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="btn-primary w-full md:w-auto">
                  Book a Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Facilities;
