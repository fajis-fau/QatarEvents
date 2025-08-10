import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Target, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(contentRef.current,
        { x: isRTL ? 100 : -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { x: isRTL ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      const stats = statsRef.current?.children;
      if (stats) {
        gsap.fromTo(stats,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Counter animation
        Array.from(stats).forEach((stat, index) => {
          const counter = stat.querySelector('.counter');
          if (counter) {
            const endValue = parseInt(counter.textContent || '0');
            gsap.fromTo(counter, 
              { textContent: 0 },
              {
                textContent: endValue,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: stat,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                },
                delay: index * 0.2
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  const stats = [
    { icon: Award, value: 5, label: t('yearsExperience') },
    { icon: Users, value: 150, label: t('clientsServed') },
    { icon: Target, value: 500, label: t('projectsCompleted') },
    { icon: TrendingUp, value: 25, label: t('teamMembers') }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className={`${isRTL ? 'lg:order-2' : ''}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('aboutTitle')}
            </h2>
            <h3 className="text-2xl font-semibold text-red-700 mb-6">
              {t('aboutSubtitle')}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t('aboutDescription')}
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-white" size={32} />
                  </div>
                  <div className="counter text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className={`relative ${isRTL ? 'lg:order-1' : ''}`}>
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="About Us"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-red-700 rounded-2xl -z-10"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-400 rounded-full -z-10"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 -right-10 bg-white p-4 rounded-xl shadow-xl border">
              <div className="text-2xl font-bold text-red-700">🏆</div>
              <div className="text-sm text-gray-600">Award Winning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;