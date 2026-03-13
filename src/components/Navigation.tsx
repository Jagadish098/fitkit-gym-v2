import { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Membership', href: '#membership' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Community', href: '#community' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-void/90 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-crimson rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                <Dumbbell className="relative w-5 h-5 text-white" />
              </div>
              <span className="font-oswald text-xl md:text-2xl font-bold text-white tracking-wider">
                FIT<span className="text-crimson">KIT</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="relative font-inter text-sm text-cool-gray hover:text-white transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crimson group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('#membership')}
                className="btn-primary text-sm py-2.5 px-6"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white"
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className="absolute inset-0 bg-void/95 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />
        <div 
          className={`absolute top-20 left-0 right-0 p-6 transition-all duration-500 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-left font-oswald text-2xl text-white hover:text-crimson transition-colors duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('#membership')}
              className="btn-primary mt-4 text-center"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
