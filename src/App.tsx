import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { translations } from './translations';
import {
  BedDouble, Bath, Waves, ShieldCheck, Clock, Award,
  MessageCircle, MessageSquare, Phone, Mail, Instagram, Facebook,
  Menu, X, ChevronRight, ChevronLeft, Star, MapPin, Globe, ChevronDown, ArrowRight, Play,
  Utensils, ShoppingBag, Flag
} from 'lucide-react';

const exclusiveVillas = [
  { 
    id: 1, name: "The Opal", district: "District 2", beds: 4, baths: 4, pool: true, price: "$450", 
    excerpt: "A stunning modern masterpiece with a private pool, lush tropical gardens, and bespoke interior design. The Opal offers a serene escape with expansive living areas and floor-to-ceiling windows that invite natural light into every corner.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687931-cebf0746e50e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613490908653-b5c1434b73b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  { 
    id: 2, name: "Villa Serenity", district: "District 2", beds: 5, baths: 5, pool: true, price: "$550", 
    excerpt: "True to its name, Villa Serenity is a haven of peace featuring an infinity pool overlooking the river. With five luxurious bedroom suites and a dedicated wellness room, it is the ultimate retreat for relaxation and rejuvenation.",
    image: "https://images.unsplash.com/photo-1613490908653-b5c1434b73b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687931-cebf0746e50e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  { 
    id: 3, name: "The Crown", district: "District 1", beds: 3, baths: 3, pool: true, price: "$600", 
    excerpt: "An exclusive urban sanctuary located in the heart of the city. The Crown boasts unparalleled skyline views, a private rooftop terrace, and sophisticated decor that perfectly blends classic elegance with contemporary luxury.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  { 
    id: 4, name: "Lotus Retreat", district: "District 7", beds: 6, baths: 6, pool: true, price: "$500", 
    excerpt: "A sprawling estate designed for grand entertaining and family gatherings. Lotus Retreat features a magnificent central courtyard, a large swimming pool, and beautifully appointed living spaces that exude warmth and sophistication.",
    image: "https://images.unsplash.com/photo-1600607687931-cebf0746e50e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4e56d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752229-250ce3d4f965?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  { 
    id: 5, name: "Jade Haven", district: "District 2", beds: 4, baths: 4, pool: true, price: "$400", 
    excerpt: "Immerse yourself in nature at Jade Haven, an eco-luxury villa surrounded by lush greenery. The property offers a seamless indoor-outdoor flow, a stunning infinity edge pool, and minimalist design that highlights its natural surroundings.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  { 
    id: 6, name: "Riverside Estate", district: "District 2", beds: 5, baths: 5, pool: true, price: "$580", 
    excerpt: "A majestic waterfront property offering breathtaking river views and unparalleled privacy. Riverside Estate features a private dock, expansive manicured lawns, and opulent interiors designed for the most discerning guests.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
];

const partnerVillas = [
  { id: 101, name: "Skyline Penthouse", district: "District 1", beds: 5, baths: 6, price: "$350", excerpt: "Experience the pinnacle of urban luxury in this sprawling penthouse. Featuring panoramic floor-to-ceiling city views, a private rooftop infinity pool, a state-of-the-art entertainment lounge, and a dedicated butler service to cater to your every need.", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 102, name: "Tropical Oasis", district: "District 2", beds: 7, baths: 8, price: "$420", excerpt: "A magnificent garden sanctuary designed for ultimate privacy and relaxation. This expansive estate boasts a massive outdoor pool, a fully equipped outdoor kitchen, lush tropical landscaping, and multiple guest houses for large family gatherings.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 103, name: "Modernist Villa", district: "District 7", beds: 6, baths: 7, price: "$380", excerpt: "An architectural masterpiece of sleek contemporary design. This smart-home integrated villa offers double-height ceilings, a private cinema room, a temperature-controlled wine cellar, and seamless indoor-outdoor living spaces perfect for hosting exclusive events.", image: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 104, name: "Heritage House", district: "District 3", beds: 5, baths: 5, price: "$300", excerpt: "Step back in time with this beautifully restored French colonial estate. Blending historic architectural charm with uncompromising modern luxury, it features a private courtyard, antique furnishings, a library, and a tranquil spa room.", image: "https://images.unsplash.com/photo-1600585154526-990dced4e56d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

const testimonials = [
  { id: 1, name: "Alexander M.", country: "🇬🇧", text: "Shing provided an unparalleled experience. The villa in District 2 was immaculate, and the concierge service handled all our dinner reservations flawlessly." },
  { id: 2, name: "Ji-Hoon K.", country: "🇰🇷", text: "최고의 경험이었습니다. 프라이버시가 완벽하게 보장되었고, 럭셔리한 인테리어가 인상적이었습니다. (An absolute top-tier experience. Perfect privacy and impressive luxury interiors.)" },
  { id: 3, name: "Wei C.", country: "🇨🇳", text: "非常棒的别墅，Shing的服务无微不至，沟通非常顺畅。强烈推荐给来胡志明市的朋友。(Fantastic villa, Shing's service was meticulous and communication was very smooth. Highly recommended.)" },
];

const journalPosts = [
  {
    id: 1,
    title: "A Guide to Fine Dining in District 1",
    category: "Gastronomy",
    date: "March 10, 2026",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    excerpt: "Discover the Michelin-starred restaurants and hidden culinary gems that define Saigon's vibrant high-end dining scene.",
    content: "Ho Chi Minh City's District 1 is rapidly emerging as one of Southeast Asia's premier culinary destinations. From intimate omakase counters hidden down historic alleyways to grand French-colonial dining rooms, the city offers an unparalleled spectrum of high-end gastronomy.\n\nOur concierge team has curated a selection of the most exclusive dining experiences. Whether you desire a private chef's table at a Michelin-starred establishment or a bespoke tasting menu featuring the finest local ingredients elevated by modern techniques, we ensure your culinary journey is nothing short of extraordinary.\n\nHighlights include rooftop dining with panoramic views of the Saigon River, where innovative fusion cuisine meets world-class mixology. For those seeking authenticity, we arrange exclusive access to private dining clubs where traditional Vietnamese recipes are reimagined for the modern palate."
  },
  {
    id: 2,
    title: "Exclusive Yacht Charters on the Saigon River",
    category: "Experiences",
    date: "February 28, 2026",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    excerpt: "Experience the city skyline from a different perspective. Our bespoke yacht services offer sunset cruises with private chefs and premium champagne.",
    content: "There is no better way to experience the vibrant energy of Ho Chi Minh City than from the tranquil waters of the Saigon River. Our exclusive yacht charter service provides an intimate and luxurious escape from the bustling streets below.\n\nStep aboard our fleet of state-of-the-art vessels, where a dedicated crew awaits to cater to your every need. Enjoy a sunset cruise as the city skyline transforms into a dazzling display of lights. Our bespoke packages include private chefs preparing gourmet meals on deck, premium champagne tastings, and personalized itineraries.\n\nWhether you're hosting an intimate gathering, celebrating a special occasion, or simply seeking a serene retreat, our yacht charters offer a unique perspective on the city, combining unparalleled luxury with breathtaking views."
  },
  {
    id: 3,
    title: "The Rise of Luxury Real Estate in District 2",
    category: "Lifestyle",
    date: "February 15, 2026",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    excerpt: "Explore why Thao Dien has become the premier destination for expatriates and the ultra-wealthy seeking tranquility within the bustling metropolis.",
    content: "District 2, particularly the Thao Dien enclave, has undergone a remarkable transformation, evolving into Ho Chi Minh City's most sought-after address for luxury real estate. This riverside community offers a rare blend of cosmopolitan lifestyle and suburban tranquility.\n\nThe appeal lies in its tree-lined streets, international schools, and an abundance of high-end amenities, including artisanal cafes, boutique shopping, and world-class wellness centers. The architectural landscape is a stunning mix of sprawling tropical villas and ultra-modern high-rises offering panoramic river views.\n\nFor the discerning investor or homeowner, District 2 represents not just a residence, but a lifestyle choice. The properties here are designed with an emphasis on privacy, security, and seamless indoor-outdoor living, catering perfectly to those who demand the highest standards of luxury and comfort."
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState<any>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[currentLang as keyof typeof translations] || translations.EN;

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const aboutY = useTransform(scrollY, [0, 1000], [0, -80]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Custom Cursor State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const cursorVariants = {
    default: { x: mousePosition.x - 8, y: mousePosition.y - 8, height: 16, width: 16, backgroundColor: "rgba(255, 255, 255, 0.4)", border: "0px solid transparent" },
    hover: { x: mousePosition.x - 24, y: mousePosition.y - 24, height: 48, width: 48, backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.3)" },
    view: { x: mousePosition.x - 40, y: mousePosition.y - 40, height: 80, width: 80, backgroundColor: "rgba(255, 255, 255, 0.9)", border: "0px solid transparent" }
  };
  
  const textEnter = () => setCursorVariant("hover");
  const textLeave = () => setCursorVariant("default");
  const viewEnter = () => setCursorVariant("view");
  const viewLeave = () => setCursorVariant("default");

  const languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'VI', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ZH', name: '中文', flag: '🇨🇳' },
    { code: 'KO', name: '한국어', flag: '🇰🇷' },
    { code: 'HI', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans selection:bg-accent selection:text-bg overflow-x-hidden md:cursor-none">
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-white font-serif text-3xl md:text-5xl tracking-[0.2em] uppercase mb-6 text-center px-4 font-light"
            >
              Saigon Villa Hunter
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              className="h-[1px] bg-white/20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[1000] flex items-center justify-center text-bg font-sans text-[10px] uppercase tracking-widest hidden md:flex font-medium"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      >
        {cursorVariant === "view" ? "VIEW" : ""}
      </motion.div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-bg/90 backdrop-blur-xl border-b border-border py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-lg md:text-xl font-serif tracking-[0.3em] cursor-pointer text-white" onClick={() => scrollToSection('home')}>
            SVH.
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-[10px] uppercase tracking-[0.3em] text-white">
            <button onMouseEnter={textEnter} onMouseLeave={textLeave} onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors">{t.nav.about}</button>
            <button onMouseEnter={textEnter} onMouseLeave={textLeave} onClick={() => scrollToSection('portfolio')} className="hover:text-accent transition-colors">{t.nav.collection}</button>
            <button onMouseEnter={textEnter} onMouseLeave={textLeave} onClick={() => scrollToSection('testimonials')} className="hover:text-accent transition-colors">{t.nav.testimonials}</button>
            <button onMouseEnter={textEnter} onMouseLeave={textLeave} onClick={() => scrollToSection('journal')} className="hover:text-accent transition-colors">{t.nav.journal}</button>
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onMouseEnter={textEnter} onMouseLeave={textLeave}
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-2 hover:text-accent transition-colors"
              >
                <Globe size={14} />
                <span>{currentLang}</span>
                <ChevronDown size={12} />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-6 w-40 bg-surface border border-border rounded-lg shadow-2xl overflow-hidden text-white"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-bg transition-colors flex items-center space-x-3 ${currentLang === lang.code ? 'text-accent' : 'text-muted'}`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onMouseEnter={textEnter} onMouseLeave={textLeave} onClick={() => scrollToSection('contact')} className="border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-bg transition-colors">
              {t.nav.book}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg pt-32 px-6 flex flex-col space-y-8 text-center text-white"
          >
            <button onClick={() => scrollToSection('about')} className="text-xl font-serif tracking-widest hover:text-accent">{t.nav.about}</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-xl font-serif tracking-widest hover:text-accent">{t.nav.collection}</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-xl font-serif tracking-widest hover:text-accent">{t.nav.testimonials}</button>
            <button onClick={() => scrollToSection('journal')} className="text-xl font-serif tracking-widest hover:text-accent">{t.nav.journal}</button>
            <button onClick={() => scrollToSection('contact')} className="text-xl font-serif tracking-widest text-accent border border-accent py-3 rounded-full mx-8">{t.nav.book}</button>
            
            <div className="flex justify-center space-x-6 pt-8 border-t border-border mx-8">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setCurrentLang(lang.code); setMobileMenuOpen(false); }}
                  className={`text-2xl ${currentLang === lang.code ? 'text-accent scale-110' : 'text-muted hover:text-white'} transition-all`}
                  title={lang.name}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col justify-end pb-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Villa Pool" 
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[100rem] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-[15vw] md:text-[9vw] leading-[0.85] font-serif tracking-tighter">
              <span className="block text-outline">CURATED</span>
              <span className="block">SANCTUARIES</span>
            </h1>
            <div className="max-w-sm pb-4">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-muted text-sm md:text-base font-light leading-relaxed mb-8"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                onClick={() => scrollToSection('portfolio')}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                className="border border-border rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-bg transition-colors duration-300"
              >
                {t.hero.explore}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted z-10"
        >
          <span className="text-[8px] tracking-[0.4em] uppercase mb-3 font-light">{t.hero.scroll}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-muted to-transparent"></div>
        </motion.div>
      </section>

      {/* Infinite Luxury Marquee */}
      <div className="py-8 bg-bg border-y border-border text-white overflow-hidden flex whitespace-nowrap relative z-20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex space-x-12 md:space-x-24 text-[10px] md:text-xs uppercase tracking-[0.3em] items-center font-light"
        >
          {t.marquee.map((item, i) => (
            <span key={`m1-${i}`} className="flex items-center space-x-12 md:space-x-24">
              <span>{item}</span><span className="w-1 h-1 rounded-full bg-accent"></span>
            </span>
          ))}
          {t.marquee.map((item, i) => (
            <span key={`m2-${i}`} className="flex items-center space-x-12 md:space-x-24">
              <span>{item}</span><span className="w-1 h-1 rounded-full bg-accent"></span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Trust & Personal Brand Section */}
      <section id="about" className="py-32 px-6 md:px-12 max-w-[100rem] mx-auto relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
            style={{ y: aboutY }}
          >
            <div className="aspect-[3/4] overflow-hidden relative z-10 oval-mask">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Shing - Saigon Villa Hunter" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 lg:pl-12"
          >
            <div className="flex items-center space-x-4 mb-8">
              <h2 className="text-muted text-[10px] uppercase tracking-[0.3em]">{t.about.title}</h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-serif mb-12 leading-none text-white">Shing, <br/><span className="italic font-light text-accent text-4xl md:text-6xl">{t.about.subtitle}</span></h3>
            <p className="text-muted font-light leading-relaxed mb-6 text-sm md:text-base">
              {t.about.p1}
            </p>
            <p className="text-muted font-light leading-relaxed mb-16 text-sm md:text-base">
              {t.about.p2}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="flex flex-col items-start">
                <span className="font-serif text-2xl mb-2 text-white">Verified</span>
                <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Top 1% in HCMC</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-serif text-2xl mb-2 text-white">24/7</span>
                <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Concierge</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-serif text-2xl mb-2 text-white">Secure</span>
                <span className="text-[10px] text-muted uppercase tracking-[0.2em]">100% Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Exclusive Portfolio */}
      <section id="portfolio" className="py-32 border-t border-border">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-muted text-[10px] uppercase tracking-[0.3em] mb-4">{t.portfolio.title}</h2>
              <h3 className="text-5xl md:text-7xl font-serif text-white">{t.portfolio.subtitle}</h3>
            </div>
            <p className="text-muted font-light max-w-md text-sm md:text-base">
              Our hand-picked collection of premium properties, offering unparalleled luxury and privacy.
            </p>
          </div>
        </div>

        <div className="border-t border-border">
          {exclusiveVillas.map((villa, index) => (
            <div 
              key={villa.id} 
              className="group flex flex-col lg:flex-row border-b border-border hover:bg-surface transition-colors duration-500 cursor-pointer"
              onClick={() => setSelectedVilla(villa)}
              onMouseEnter={viewEnter}
              onMouseLeave={viewLeave}
            >
              <div className="lg:w-1/3 p-8 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
                <div>
                  <div className="text-[10px] text-muted uppercase tracking-[0.3em] mb-6">{villa.district}</div>
                  <h4 className="text-4xl md:text-5xl font-serif mb-6 group-hover:text-accent transition-colors duration-500 text-white">{villa.name}</h4>
                  <p className="text-muted font-light text-sm md:text-base leading-relaxed mb-8 line-clamp-4">
                    {villa.excerpt}
                  </p>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <div className="flex space-x-6 text-[11px] text-muted uppercase tracking-[0.2em] mb-2">
                    <span>{villa.beds} {t.portfolio.beds}</span>
                    <span>{villa.baths} {t.portfolio.baths}</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl md:text-4xl font-serif text-white">{villa.price}</span>
                    <span className="text-[10px] text-muted uppercase tracking-[0.2em]">{t.portfolio.night}</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3 p-4 md:p-8 h-[400px] md:h-[600px]">
                <div className="w-full h-full overflow-hidden rounded-lg relative">
                  <img 
                    src={villa.image} 
                    alt={villa.name} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Collection */}
      <section className="py-32 px-6 md:px-12 max-w-[100rem] mx-auto overflow-hidden border-t border-border">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-muted text-[10px] uppercase tracking-[0.3em] mb-4">The Partner Collection</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-white">Curated Alternatives</h3>
          </div>
          <div className="hidden md:flex space-x-4">
            <button className="p-4 border border-border rounded-full hover:border-white hover:text-white transition-colors text-muted">
              <ChevronLeft size={20} />
            </button>
            <button className="p-4 border border-border rounded-full hover:border-white hover:text-white transition-colors text-muted">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-8 pb-8 snap-x">
          {partnerVillas.map((villa) => (
            <div 
              key={villa.id} 
              className="min-w-[300px] md:min-w-[450px] snap-center group cursor-pointer"
              onClick={() => setSelectedVilla(villa)}
              onMouseEnter={viewEnter}
              onMouseLeave={viewLeave}
            >
              <div className="relative h-80 md:h-[400px] rounded-lg overflow-hidden mb-6">
                <img 
                  src={villa.image} 
                  alt={villa.name} 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-bg/90 backdrop-blur-md px-3 py-1.5 border border-border text-[10px] uppercase tracking-[0.2em] text-white flex space-x-3">
                  <span>{villa.beds} {t.portfolio.beds}</span>
                  <span>•</span>
                  <span>{villa.baths} {t.portfolio.baths}</span>
                </div>
              </div>
              <div className="flex flex-col h-[240px]">
                <h4 className="text-3xl font-serif group-hover:text-accent transition-colors text-white mb-3">{villa.name}</h4>
                <p className="text-muted font-light text-sm leading-relaxed mb-6 line-clamp-4">
                  {villa.excerpt}
                </p>
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-border/50">
                  <span className="text-muted text-[10px] uppercase tracking-[0.2em] mb-1">{villa.district}</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-white font-serif text-2xl md:text-3xl">{villa.price}</span>
                    <span className="text-[10px] text-muted uppercase tracking-[0.2em]">{t.portfolio.night}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section id="testimonials" className="py-32 border-t border-border">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h3 className="text-5xl md:text-7xl font-serif leading-none text-white">
              <span className="block text-outline">WORDS FROM</span>
              <span className="block">THE ELITE</span>
            </h3>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">{t.testimonials.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="border-t border-border pt-8"
              >
                <div className="text-accent font-serif text-6xl leading-none mb-6">"</div>
                <p className="text-muted font-light leading-relaxed mb-12 text-sm md:text-base min-h-[120px]">
                  {testimonial.text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="font-serif text-lg text-white">{testimonial.name}</div>
                  <div className="text-xl">{testimonial.country}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal / Blog Section */}
      <section id="journal" className="py-32 border-t border-border bg-surface">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h3 className="text-5xl md:text-7xl font-serif leading-none text-white">
              <span className="block text-outline">THE</span>
              <span className="block">JOURNAL</span>
            </h3>
            <div className="text-right">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">{t.journal.title}</h2>
              <p className="text-white font-serif">{t.journal.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journalPosts.map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
                onClick={() => setSelectedArticle(post)}
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-bg/90 backdrop-blur-md px-4 py-1.5 border border-border text-[10px] uppercase tracking-[0.2em] text-white">
                    {post.category}
                  </div>
                </div>
                <div className="text-muted text-[10px] uppercase tracking-[0.2em] mb-4">{post.date}</div>
                <h4 className="text-2xl font-serif text-white mb-4 group-hover:text-accent transition-colors">{post.title}</h4>
                <p className="text-muted font-light text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-[10px] uppercase tracking-[0.2em] text-white group-hover:text-accent transition-colors">
                  {t.journal.readMore} <ArrowRight size={14} className="ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-32 pb-12 px-6 md:px-12 border-t border-border">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
            <div className="md:col-span-5">
              <div className="text-4xl font-serif tracking-[0.2em] mb-8 text-white">
                SAIGON<br/>VILLA HUNTER.
              </div>
              <p className="text-muted font-light max-w-sm mb-12 text-sm">
                {t.footer.desc}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white hover:text-bg transition-colors text-white">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white hover:text-bg transition-colors text-white">
                  <Mail size={16} />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-8">{t.footer.quickLinks}</h4>
              <ul className="space-y-4 text-sm font-light text-white">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-accent transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors">{t.nav.about}</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-accent transition-colors">{t.nav.collection}</button></li>
                <li><button onClick={() => scrollToSection('journal')} className="hover:text-accent transition-colors">{t.nav.journal}</button></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-8">{t.footer.contact}</h4>
              <ul className="space-y-4 text-sm font-light text-white">
                <li>shing@saigonvillahunter.com</li>
                <li>+84 90 123 4567</li>
                <li>District 2, Ho Chi Minh City</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-muted">
            <p>&copy; {new Date().getFullYear()} SVH. {t.footer.rights}</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contact Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className="w-12 h-12 bg-surface text-white border border-border rounded-full flex items-center justify-center shadow-xl hover:bg-accent hover:text-bg hover:border-accent transition-all duration-300" title="WhatsApp">
          <Phone size={18} />
        </a>
        <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className="w-12 h-12 bg-surface text-white border border-border rounded-full flex items-center justify-center shadow-xl hover:bg-accent hover:text-bg hover:border-accent transition-all duration-300" title="WeChat">
          <MessageCircle size={18} />
        </a>
        <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className="w-12 h-12 bg-surface text-white border border-border rounded-full flex items-center justify-center shadow-xl hover:bg-accent hover:text-bg hover:border-accent transition-all duration-300" title="KakaoTalk">
          <MessageSquare size={18} />
        </a>
      </div>

      {/* Article Details Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="bg-bg w-full h-full md:h-[95vh] md:w-[95vw] md:rounded-t-3xl overflow-hidden flex flex-col relative border-t border-x border-border md:mt-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                onMouseEnter={textEnter} onMouseLeave={textLeave}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 bg-black/50 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <X size={20} strokeWidth={1} />
              </button>

              <div className="flex-1 overflow-y-auto hide-scrollbar">
                {/* Hero Image */}
                <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={selectedArticle.image} 
                    alt={selectedArticle.title} 
                    className="w-full h-full object-cover grayscale opacity-80" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-5xl mx-auto right-0">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <div className="flex items-center space-x-4 text-muted text-[10px] tracking-[0.3em] uppercase mb-6">
                        <span className="bg-accent/20 text-accent px-3 py-1 border border-accent/30 rounded-full">{selectedArticle.category}</span>
                        <span>{selectedArticle.date}</span>
                      </div>
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4 leading-tight">{selectedArticle.title}</h2>
                    </motion.div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
                  <p className="text-xl md:text-2xl font-serif text-white leading-relaxed mb-12 border-l-2 border-accent pl-6">
                    {selectedArticle.excerpt}
                  </p>
                  
                  <div className="prose prose-invert prose-lg max-w-none text-muted font-light leading-loose">
                    {selectedArticle.content.split('\n\n').map((paragraph: string, idx: number) => (
                      <p key={idx} className="mb-8">{paragraph}</p>
                    ))}
                  </div>
                  
                  {/* Share & Tags */}
                  <div className="mt-16 pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Share</span>
                      <div className="flex space-x-3">
                        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-white">
                          <Instagram size={16} />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-white">
                          <Facebook size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted border border-border px-4 py-2 rounded-full">Luxury</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted border border-border px-4 py-2 rounded-full">Saigon</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted border border-border px-4 py-2 rounded-full">{selectedArticle.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Villa Details Modal */}
      <AnimatePresence>
        {selectedVilla && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVilla(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="bg-bg w-full h-full md:h-[95vh] md:w-[95vw] md:rounded-t-3xl overflow-hidden flex flex-col relative border-t border-x border-border md:mt-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedVilla(null)}
                onMouseEnter={textEnter} onMouseLeave={textLeave}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 bg-black/50 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto w-full h-full hide-scrollbar scroll-smooth">
                {/* Hero Image */}
                <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={selectedVilla.image} 
                    alt={selectedVilla.name} 
                    className="w-full h-full object-cover grayscale opacity-80" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <div className="flex items-center text-muted text-[10px] tracking-[0.3em] uppercase mb-4">
                        <MapPin size={14} className="mr-2 text-accent" /> {selectedVilla.district}
                      </div>
                      <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4">{selectedVilla.name}</h2>
                    </motion.div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="max-w-[100rem] mx-auto px-6 md:px-16 py-16 md:py-24 flex flex-col lg:flex-row gap-16">
                  
                  {/* Left Column: Details */}
                  <div className="lg:w-2/3">
                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-8 mb-16 pb-16 border-b border-border">
                      <div className="flex flex-col">
                        <span className="text-muted text-[10px] uppercase tracking-[0.3em] mb-3">{t.modal.guests}</span>
                        <span className="text-3xl font-serif text-white">{selectedVilla.beds * 2}</span>
                      </div>
                      <div className="w-px h-16 bg-border hidden sm:block"></div>
                      <div className="flex flex-col">
                        <span className="text-muted text-[10px] uppercase tracking-[0.3em] mb-3">{t.modal.bedrooms}</span>
                        <span className="text-3xl font-serif text-white">{selectedVilla.beds}</span>
                      </div>
                      <div className="w-px h-16 bg-border hidden sm:block"></div>
                      <div className="flex flex-col">
                        <span className="text-muted text-[10px] uppercase tracking-[0.3em] mb-3">{t.modal.bathrooms}</span>
                        <span className="text-3xl font-serif text-white">{selectedVilla.baths}</span>
                      </div>
                      <div className="w-px h-16 bg-border hidden sm:block"></div>
                      <div className="flex flex-col">
                        <span className="text-muted text-[10px] uppercase tracking-[0.3em] mb-3">{t.modal.size}</span>
                        <span className="text-3xl font-serif text-white">850 sqm</span>
                      </div>
                    </div>

                    <h3 className="text-4xl font-serif mb-8 text-white">{t.modal.sanctuary}</h3>
                    <p className="text-muted font-light leading-relaxed mb-6 text-sm md:text-base">
                      {t.modal.p1.replace('{district}', selectedVilla.district)}
                    </p>
                    <p className="text-muted font-light leading-relaxed mb-16 text-sm md:text-base">
                      {t.modal.p2.replace('{name}', selectedVilla.name)}
                    </p>

                    {/* Property Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-y border-border py-12">
                      <div>
                        <div className="text-muted text-[10px] uppercase tracking-[0.3em] mb-2">Architect</div>
                        <div className="text-white font-serif text-lg">{selectedVilla.details?.architect || "Studio MK27"}</div>
                      </div>
                      <div>
                        <div className="text-muted text-[10px] uppercase tracking-[0.3em] mb-2">Year Built</div>
                        <div className="text-white font-serif text-lg">{selectedVilla.details?.year || "2024"}</div>
                      </div>
                      <div>
                        <div className="text-muted text-[10px] uppercase tracking-[0.3em] mb-2">Views</div>
                        <div className="text-white font-serif text-lg">{selectedVilla.details?.view || "Panoramic"}</div>
                      </div>
                      <div>
                        <div className="text-muted text-[10px] uppercase tracking-[0.3em] mb-2">Staff</div>
                        <div className="text-white font-serif text-lg">{selectedVilla.details?.staff || "Full Team"}</div>
                      </div>
                    </div>

                    {/* Cinematic Video Tour */}
                    <h3 className="text-4xl font-serif mb-8 text-white">Cinematic Tour</h3>
                    <div className="relative w-full aspect-video mb-20 group cursor-pointer overflow-hidden rounded-lg">
                      <img 
                        src={selectedVilla.videoCover || selectedVilla.gallery?.[0] || selectedVilla.image} 
                        alt="Video Thumbnail" 
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-1000 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-white transition-all duration-500">
                          <Play className="text-white ml-2" size={24} strokeWidth={1} />
                        </div>
                      </div>
                    </div>

                    {/* Image Gallery Grid */}
                    <h3 className="text-4xl font-serif mb-10 text-white">{t.modal.gallery}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-20">
                      <div className="col-span-2 h-64 md:h-[500px] overflow-hidden group">
                        <img src={selectedVilla.gallery?.[0] || "https://images.unsplash.com/photo-1600607687931-cebf0746e50e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} alt="Interior" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
                      </div>
                      <div className="h-48 md:h-80 overflow-hidden group">
                        <img src={selectedVilla.gallery?.[1] || "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Bedroom" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
                      </div>
                      <div className="h-48 md:h-80 overflow-hidden group">
                        <img src={selectedVilla.gallery?.[2] || "https://images.unsplash.com/photo-1613490908653-b5c1434b73b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Bathroom" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
                      </div>
                      <div className="col-span-2 h-64 md:h-[500px] overflow-hidden group">
                        <img src={selectedVilla.gallery?.[3] || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} alt="Exterior" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    
                    <h3 className="text-4xl font-serif mb-10 text-white">{t.modal.amenities}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6 text-white font-light text-sm mb-12">
                      <div className="flex items-center"><BedDouble size={20} className="text-accent mr-4" strokeWidth={1} /> {t.modal.am1}</div>
                      <div className="flex items-center"><Bath size={20} className="text-accent mr-4" strokeWidth={1} /> {t.modal.am2}</div>
                      {selectedVilla.pool && <div className="flex items-center"><Waves size={20} className="text-accent mr-4" strokeWidth={1} /> {t.modal.am3}</div>}
                      <div className="flex items-center"><ShieldCheck size={20} className="text-accent mr-4" strokeWidth={1} /> {t.modal.am4}</div>
                      <div className="flex items-center"><Clock size={20} className="text-accent mr-4" strokeWidth={1} /> {t.modal.am5}</div>
                      <div className="flex items-center"><Award size={20} className="text-accent mr-4" strokeWidth={1} /> {t.modal.am6}</div>
                    </div>

                    {/* Location & Surroundings (Dark Theme Map) */}
                    <h3 className="text-4xl font-serif mb-8 text-white mt-16">Location & Surroundings</h3>
                    <div className="rounded-2xl overflow-hidden border border-border bg-surface mb-12">
                      <div className="relative h-64 md:h-80 w-full">
                        <img 
                          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                          alt="Map View" 
                          className="w-full h-full object-cover grayscale opacity-50"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                        
                        {/* Center Pin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="w-12 h-12 bg-accent/20 rounded-full animate-ping absolute"></div>
                          <div className="w-12 h-12 bg-accent/40 rounded-full absolute animate-pulse"></div>
                          <div className="w-4 h-4 bg-accent rounded-full relative z-10 border-2 border-surface shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                          <div className="mt-3 text-white font-serif text-sm bg-bg/90 px-4 py-1.5 rounded-full backdrop-blur-md border border-border shadow-xl whitespace-nowrap">
                            {selectedVilla.name}
                          </div>
                        </div>
                      </div>
                      
                      {/* POIs List */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center shrink-0">
                            <Utensils size={16} className="text-accent" />
                          </div>
                          <div>
                            <div className="text-white font-serif mb-1">Fine Dining</div>
                            <div className="text-muted text-xs font-light leading-relaxed">Michelin-starred restaurants within 2km</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center shrink-0">
                            <ShoppingBag size={16} className="text-accent" />
                          </div>
                          <div>
                            <div className="text-white font-serif mb-1">Luxury Boutiques</div>
                            <div className="text-muted text-xs font-light leading-relaxed">High-end shopping mall 15 mins away</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center shrink-0">
                            <Flag size={16} className="text-accent" />
                          </div>
                          <div>
                            <div className="text-white font-serif mb-1">Championship Golf</div>
                            <div className="text-muted text-xs font-light leading-relaxed">18-hole golf course just 5km away</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Guest Reviews */}
                    <h3 className="text-4xl font-serif mb-10 text-white mt-16">Guest Reviews</h3>
                    <div className="space-y-8 mb-12">
                      {(selectedVilla.reviews || [
                        { author: "Alexander M.", rating: 5, date: "October 2025", text: "An architectural masterpiece. The level of service was beyond anything we've experienced. The private chef curated a menu that perfectly complemented the stunning sunset views." },
                        { author: "Sarah W.", rating: 5, date: "August 2025", text: "Absolute perfection. The private pool and the dedicated staff exceeded all our expectations. We felt completely isolated from the city's hustle while being right in the center of it." }
                      ]).map((review: any, idx: number) => (
                        <div key={idx} className="border-b border-border pb-8">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-white font-serif text-xl">
                                {review.author.charAt(0)}
                              </div>
                              <div>
                                <div className="text-white font-serif text-lg">{review.author}</div>
                                <div className="text-muted text-[10px] uppercase tracking-[0.2em] mt-1">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={14} className="fill-accent text-accent" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted font-light text-sm md:text-base leading-relaxed italic">
                            "{review.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Column: Sticky Reservation Card */}
                  <div className="lg:w-1/3 relative">
                    <div className="sticky top-12 bg-surface p-8 border border-border">
                      <div className="flex justify-between items-end mb-8 pb-8 border-b border-border">
                        <div>
                          <span className="text-muted text-[10px] uppercase tracking-[0.3em] block mb-2">{t.portfolio.from}</span>
                          <span className="text-5xl font-serif text-white">{selectedVilla.price}</span>
                        </div>
                        <span className="text-muted font-light mb-1 text-sm">{t.portfolio.night}</span>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="bg-bg border border-border p-5 flex justify-between items-center cursor-pointer hover:border-accent transition-colors" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                          <span className="text-white font-light text-sm">{t.modal.checkin}</span>
                          <ChevronDown size={16} className="text-accent" />
                        </div>
                        <div className="bg-bg border border-border p-5 flex justify-between items-center cursor-pointer hover:border-accent transition-colors" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                          <span className="text-white font-light text-sm">{selectedVilla.beds * 2} {t.modal.guests}</span>
                          <ChevronDown size={16} className="text-accent" />
                        </div>
                      </div>

                      <button 
                        onMouseEnter={textEnter} onMouseLeave={textLeave}
                        className="w-full bg-white text-bg py-5 font-medium uppercase tracking-[0.3em] text-[10px] hover:bg-accent hover:text-white transition-all duration-300 mb-6"
                      >
                        {t.modal.requestBook}
                      </button>
                      
                      <div className="flex items-center justify-center space-x-3 text-[10px] uppercase tracking-[0.2em] text-muted font-light">
                        <ShieldCheck size={14} className="text-accent" />
                        <span>{t.modal.secure}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
