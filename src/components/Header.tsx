import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  const toggleLanguage = () => {
    gsap.to(headerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
        gsap.to(headerRef.current, { opacity: 1, duration: 0.3 });
      }
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, { duration: 1, scrollTo: element, ease: 'power2.inOut' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {isRTL ? 'قطر ديجيتال' : 'Qatar Digital'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-red-700 transition-colors duration-300 font-medium"
            >
              {t('services')}
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-gray-700 hover:text-red-700 transition-colors duration-300 font-medium"
            >
              {t('portfolio')}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-red-700 transition-colors duration-300 font-medium"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors duration-300 font-medium"
            >
              {t('contact')}
            </button>
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-700 transition-colors duration-300"
            >
              <Globe size={20} />
              <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-red-700 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-red-700 transition-colors duration-300 font-medium"
              >
                {t('services')}
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-left text-gray-700 hover:text-red-700 transition-colors duration-300 font-medium"
              >
                {t('portfolio')}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-red-700 transition-colors duration-300 font-medium"
              >
                {t('about')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors duration-300 font-medium w-fit"
              >
                {t('contact')}
              </button>
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-700 transition-colors duration-300 w-fit"
              >
                <Globe size={20} />
                <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;