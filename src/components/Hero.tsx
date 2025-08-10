import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.5'
    )
    .fromTo(descriptionRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.3'
    )
    .fromTo(buttonsRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.3'
    )
    .fromTo(imageRef.current, 
      { x: isRTL ? -100 : 100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
      '-=0.8'
    );

    // Floating animation for the image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 2
    });
  }, [isRTL]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      gsap.to(window, { duration: 1, scrollTo: element, ease: 'power2.inOut' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      gsap.to(window, { duration: 1, scrollTo: element, ease: 'power2.inOut' });
    }
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${isRTL ? 'lg:order-2' : ''}`}>
            <h2 ref={subtitleRef} className="text-red-700 font-semibold text-lg mb-4 flex items-center">
              <div className="w-12 h-0.5 bg-red-700 mr-3"></div>
              {t('heroSubtitle')}
            </h2>
            <h1 ref={titleRef} className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p ref={descriptionRef} className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('heroDescription')}
            </p>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToContact}
                className="group bg-red-700 text-white px-8 py-4 rounded-lg hover:bg-red-800 transition-all duration-300 flex items-center justify-center font-semibold hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {t('getStarted')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              <button 
                onClick={scrollToAbout}
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-red-700 hover:text-red-700 transition-all duration-300 flex items-center justify-center font-semibold hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Play className="mr-2 group-hover:scale-110 transition-transform duration-300" size={20} />
                {t('learnMore')}
              </button>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className={`relative ${isRTL ? 'lg:order-1' : ''}`}>
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Digital Marketing Team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-700 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full -z-10"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-xl border">
              <div className="text-2xl font-bold text-red-700">150+</div>
              <div className="text-sm text-gray-600">{t('clientsServed')}</div>
            </div>
            
            <div className="absolute bottom-10 -right-10 bg-white p-4 rounded-xl shadow-xl border">
              <div className="text-2xl font-bold text-red-700">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;