import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'About',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Digital Marketing Excellence',
    heroSubtitle: 'in the Heart of Qatar',
    heroDescription: 'We help businesses in Qatar grow their digital presence with cutting-edge marketing strategies and innovative solutions.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive Digital Solutions',
    seoTitle: 'SEO Optimization',
    seoDescription: 'Boost your search rankings with our Qatar-focused SEO strategies.',
    socialMediaTitle: 'Social Media Marketing',
    socialMediaDescription: 'Engage your audience across all major social platforms.',
    ppcTitle: 'PPC Advertising',
    ppcDescription: 'Maximize ROI with targeted pay-per-click campaigns.',
    contentTitle: 'Content Marketing',
    contentDescription: 'Create compelling content that converts visitors into customers.',
    webDevTitle: 'Web Development',
    webDevDescription: 'Build stunning websites that perform across all devices.',
    analyticsTitle: 'Analytics & Reporting',
    analyticsDescription: 'Track performance with detailed analytics and insights.',
    
    // Portfolio
    portfolioTitle: 'Our Work',
    portfolioSubtitle: 'Success Stories from Qatar',
    viewProject: 'View Project',
    
    // About
    aboutTitle: 'About Us',
    aboutSubtitle: 'Your Trusted Digital Partner in Qatar',
    aboutDescription: 'We are a leading digital marketing agency based in Doha, Qatar. With over 5 years of experience, we have helped hundreds of local and international businesses establish their digital presence in the Qatari market.',
    yearsExperience: 'Years Experience',
    clientsServed: 'Clients Served',
    projectsCompleted: 'Projects Completed',
    teamMembers: 'Team Members',
    
    // Contact
    contactTitle: 'Get In Touch',
    contactSubtitle: 'Ready to Grow Your Business?',
    nameLabel: 'Full Name',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone Number',
    messageLabel: 'Message',
    sendMessage: 'Send Message',
    officeAddress: 'Office Address',
    callUs: 'Call Us',
    emailUs: 'Email Us',
    
    // Footer
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',
  },
  ar: {
    // Header
    services: 'الخدمات',
    portfolio: 'أعمالنا',
    about: 'من نحن',
    contact: 'اتصل بنا',
    
    // Hero
    heroTitle: 'التميز في التسويق الرقمي',
    heroSubtitle: 'في قلب قطر',
    heroDescription: 'نساعد الشركات في قطر على نمو حضورها الرقمي من خلال استراتيجيات التسويق المتطورة والحلول المبتكرة.',
    getStarted: 'ابدأ الآن',
    learnMore: 'اعرف المزيد',
    
    // Services
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'حلول رقمية شاملة',
    seoTitle: 'تحسين محركات البحث',
    seoDescription: 'عزز ترتيبك في نتائج البحث باستراتيجياتنا المركزة على قطر.',
    socialMediaTitle: 'التسويق عبر وسائل التواصل',
    socialMediaDescription: 'تفاعل مع جمهورك عبر جميع منصات التواصل الرئيسية.',
    ppcTitle: 'الإعلانات المدفوعة',
    ppcDescription: 'اعظم العائد على الاستثمار مع حملات إعلانية مستهدفة.',
    contentTitle: 'تسويق المحتوى',
    contentDescription: 'أنشئ محتوى مقنع يحول الزوار إلى عملاء.',
    webDevTitle: 'تطوير المواقع',
    webDevDescription: 'ابني مواقع إلكترونية مذهلة تعمل على جميع الأجهزة.',
    analyticsTitle: 'التحليلات والتقارير',
    analyticsDescription: 'تتبع الأداء مع تحليلات مفصلة ورؤى عميقة.',
    
    // Portfolio
    portfolioTitle: 'أعمالنا',
    portfolioSubtitle: 'قصص نجاح من قطر',
    viewProject: 'عرض المشروع',
    
    // About
    aboutTitle: 'من نحن',
    aboutSubtitle: 'شريكك الرقمي الموثوق في قطر',
    aboutDescription: 'نحن وكالة تسويق رقمي رائدة مقرها في الدوحة، قطر. مع أكثر من 5 سنوات من الخبرة، ساعدنا المئات من الشركات المحلية والعالمية في تأسيس حضورها الرقمي في السوق القطري.',
    yearsExperience: 'سنوات خبرة',
    clientsServed: 'عميل',
    projectsCompleted: 'مشروع مكتمل',
    teamMembers: 'عضو فريق',
    
    // Contact
    contactTitle: 'تواصل معنا',
    contactSubtitle: 'مستعد لتنمية عملك؟',
    nameLabel: 'الاسم الكامل',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'رقم الهاتف',
    messageLabel: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    officeAddress: 'عنوان المكتب',
    callUs: 'اتصل بنا',
    emailUs: 'راسلنا',
    
    // Footer
    quickLinks: 'روابط سريعة',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};