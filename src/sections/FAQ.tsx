import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, X, MessageCircle, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
  related?: string[];
}

const faqData: FAQItem[] = [
  {
    question: 'What are your membership options?',
    answer: 'We offer three membership tiers: Basic ($29/month), Pro ($49/month), and Elite ($89/month). Each tier includes different levels of access, from gym hours to personal training sessions. All memberships include access to our mobile app and basic equipment.',
    related: ['Can I cancel anytime?', 'Is there a joining fee?'],
  },
  {
    question: 'Can I cancel my membership anytime?',
    answer: 'Yes! We offer a 30-day money-back guarantee with no questions asked. After that, you can cancel anytime with 7 days notice. We believe in earning your business every month.',
    related: ['What are your membership options?', 'Is there a joining fee?'],
  },
  {
    question: 'What are your operating hours?',
    answer: 'Our gym is open 24/7 for Pro and Elite members. Basic members have access from 6AM to 10PM daily. Our staffed hours are 6AM to 10PM Monday through Saturday, and 8AM to 8PM on Sundays.',
    related: ['Do you offer personal training?', 'What classes do you offer?'],
  },
  {
    question: 'Do you offer personal training?',
    answer: 'Absolutely! All of our trainers are certified professionals with years of experience. Pro members get 2 PT sessions per month, while Elite members enjoy unlimited sessions. You can also book additional sessions at member rates.',
    related: ['What are your membership options?', 'What are your operating hours?'],
  },
  {
    question: 'What classes do you offer?',
    answer: 'We offer a wide variety of classes including Yoga, HIIT, Spin, Boxing, Pilates, CrossFit, Zumba, and more. Our schedule changes daily with morning, lunch, and evening options. Check our class schedule for the full lineup!',
    related: ['Do you offer personal training?', 'What are your operating hours?'],
  },
  {
    question: 'Is there a joining fee?',
    answer: 'We currently waive the joining fee for all new members! This includes your initial fitness assessment, gym orientation, and a complimentary personal training session to help you get started on the right foot.',
    related: ['What are your membership options?', 'Can I cancel anytime?'],
  },
  {
    question: 'Do you have locker rooms and showers?',
    answer: 'Yes, we have premium locker rooms with secure digital lockers, rain showers, and complimentary toiletries. Elite members get access to private lockers and our recovery spa with sauna and steam room.',
    related: ['What are your operating hours?', 'What classes do you offer?'],
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

      const items = accordionRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: accordionRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredFAQs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-20 md:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-crimson/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-inter text-sm text-crimson tracking-[0.3em] uppercase">
            Got Questions?
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            FREQUENTLY <span className="text-gradient">ASKED</span>
          </h2>
          <p className="font-inter text-cool-gray max-w-2xl mx-auto mt-4">
            Find answers to common questions about FITKIT.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cool-gray" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-2xl font-inter text-white placeholder:text-cool-gray focus:outline-none focus:border-crimson/50 transition-colors"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div ref={accordionRef} className="max-w-3xl mx-auto space-y-4 perspective-1000">
          {filteredFAQs.map((item, index) => (
            <div
              key={index}
              className="faq-item glass-card rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                transform: openIndex === index ? 'translateZ(20px)' : 'translateZ(0)',
              }}
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-oswald text-lg text-white pr-4">{item.question}</span>
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-crimson/20 text-crimson transition-all duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-45 bg-crimson text-white' : ''
                  }`}
                >
                  {openIndex === index ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="font-inter text-cool-gray leading-relaxed mb-4">
                    {item.answer}
                  </p>

                  {/* Related Questions */}
                  {item.related && (
                    <div className="flex flex-wrap gap-2">
                      <span className="font-inter text-xs text-cool-gray">Related:</span>
                      {item.related.map((related, rIndex) => (
                        <button
                          key={rIndex}
                          onClick={() => {
                            const relatedIndex = faqData.findIndex((f) => f.question === related);
                            if (relatedIndex !== -1) {
                              setOpenIndex(relatedIndex);
                            }
                          }}
                          className="px-3 py-1 text-xs font-inter text-crimson bg-crimson/10 rounded-full hover:bg-crimson/20 transition-colors"
                        >
                          {related}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="font-inter text-cool-gray">No questions found matching your search.</p>
          </div>
        )}

        {/* Chat Support CTA */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-crimson/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-crimson" />
              </div>
              <div>
                <p className="font-oswald text-lg text-white">Still have questions?</p>
                <p className="font-inter text-sm text-cool-gray">Our team is here to help 24/7</p>
              </div>
            </div>
            <button className="btn-primary whitespace-nowrap">Chat With Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
