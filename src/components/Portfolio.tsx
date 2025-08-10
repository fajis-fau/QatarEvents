import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid animation
      const projects = gridRef.current?.children;
      if (projects) {
        gsap.fromTo(projects,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'Qatar Airways Campaign',
      category: 'Social Media Marketing',
      image: 'https://images.pexels.com/photos/1089549/pexels-photo-1089549.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Increased social engagement by 300%'
    },
    {
      title: 'Doha Shopping Mall',
      category: 'SEO & Web Development',
      image: 'https://images.pexels.com/photos/2292837/pexels-photo-2292837.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Boosted online traffic by 250%'
    },
    {
      title: 'Local Restaurant Chain',
      category: 'Digital Marketing',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Generated 150% more leads'
    },
    {
      title: 'Real Estate Agency',
      category: 'PPC Campaign',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Achieved 180% ROI improvement'
    },
    {
      title: 'Healthcare Provider',
      category: 'Content Marketing',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Built trusted brand presence'
    },
    {
      title: 'Tech Startup',
      category: 'Full Digital Solution',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Launched successful digital presence'
    }
  ];

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('portfolioTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('portfolioSubtitle')}
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.overlay');
                gsap.to(overlay, { opacity: 1, duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.overlay');
                gsap.to(overlay, { opacity: 0, duration: 0.3 });
              }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 flex items-end p-6">
                <div className="text-white">
                  <div className="text-sm text-red-300 mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-200 text-sm mb-4">{project.description}</p>
                  <button className="flex items-center text-white hover:text-red-300 transition-colors duration-300">
                    {t('viewProject')}
                    <ExternalLink className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;