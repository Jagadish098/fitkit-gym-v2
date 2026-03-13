import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Dumbbell, 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook,
  MapPin,
  Phone,
  Mail,
  ChevronUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
          },
        }
      );

      // Counter animation
      const counter = document.querySelector('.member-counter');
      if (counter) {
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: 50000,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 100 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    programs: [
      { name: 'Personal Training', href: '#trainers' },
      { name: 'Group Classes', href: '#schedule' },
      { name: 'Nutrition Plans', href: '#nutrition' },
      { name: 'Corporate Wellness', href: '#' },
    ],
  };

  return (
    <footer
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* Final CTA Section */}
      <div ref={ctaRef} className="relative py-20 md:py-32">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/hero-gym.jpg"
            alt="Gym Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/90 to-void/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        </div>

        {/* Red Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,26,26,0.1)_100%)]" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pre-title */}
            <p className="font-inter text-sm text-crimson tracking-[0.3em] uppercase mb-6">
              Start Your Journey
            </p>

            {/* Main CTA Text */}
            <h2 className="font-oswald text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-4">
              START YOUR
            </h2>
            <h2 className="font-oswald text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient leading-none mb-4">
              TRANSFORMATION
            </h2>
            <h2 className="font-oswald text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-8">
              <span className="text-crimson italic">TODAY</span>
            </h2>

            {/* Social Proof */}
            <p className="font-inter text-cool-gray mb-8">
              Join <span className="member-counter font-oswald text-2xl text-white">50,000+</span> members already transforming their lives
            </p>

            {/* Call Now Button */}
            <a 
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white rounded-full font-oswald font-semibold uppercase tracking-wider hover:bg-white hover:text-void transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative border-t border-white/5">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-6">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-crimson rounded-lg transform rotate-45" />
                  <Dumbbell className="relative w-5 h-5 text-white" />
                </div>
                <span className="font-oswald text-xl font-bold text-white tracking-wider">
                  FIT<span className="text-crimson">KIT</span>
                </span>
              </a>
              <p className="font-inter text-sm text-cool-gray mb-6">
                Transform your body, elevate your mind. Premium fitness experience for those who demand the best.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-cool-gray">
                  <MapPin className="w-4 h-4 text-crimson" />
                  <span className="font-inter text-sm">123 Fitness Ave, NYC</span>
                </div>
                <div className="flex items-center gap-3 text-cool-gray">
                  <Phone className="w-4 h-4 text-crimson" />
                  <span className="font-inter text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-cool-gray">
                  <Mail className="w-4 h-4 text-crimson" />
                  <span className="font-inter text-sm">hello@fitkit.com</span>
                </div>
              </div>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-oswald text-lg text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-inter text-sm text-cool-gray hover:text-crimson transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs Links */}
            <div>
              <h4 className="font-oswald text-lg text-white mb-4">Programs</h4>
              <ul className="space-y-3">
                {footerLinks.programs.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="font-inter text-sm text-cool-gray hover:text-crimson transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <h4 className="font-oswald text-lg text-white mb-4">Follow Us</h4>
              <div className="flex gap-3 mb-6">
                {[
                  { icon: <Instagram className="w-5 h-5" />, href: '#' },
                  { icon: <Twitter className="w-5 h-5" />, href: '#' },
                  { icon: <Youtube className="w-5 h-5" />, href: '#' },
                  { icon: <Facebook className="w-5 h-5" />, href: '#' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-cool-gray hover:bg-crimson hover:text-white transition-all duration-300"
                    style={{
                      transform: 'translateZ(0)',
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-inter text-sm text-cool-gray">
              © 2024 FITKIT. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="font-inter text-sm text-cool-gray hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="font-inter text-sm text-cool-gray hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="font-inter text-sm text-cool-gray hover:text-white transition-colors">
                Cookies
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-crimson/20 text-crimson hover:bg-crimson hover:text-white transition-all duration-300"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
