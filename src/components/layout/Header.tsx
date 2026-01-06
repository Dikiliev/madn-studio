import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Bug } from 'lucide-react';
import { NAV_ITEMS } from '@config';

interface HeaderProps {
  onNavigate: (page: 'home' | 'team' | 'work' | 'contact', sectionId?: string) => void;
  activePage: 'home' | 'team' | 'work' | 'contact';
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isSpiderEnabled: boolean;
  onToggleSpider: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  activePage, 
  isDarkMode, 
  onToggleTheme,
  isSpiderEnabled,
  onToggleSpider
}) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: typeof NAV_ITEMS[0]) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (item.href === '#team-trigger') {
      onNavigate('team');
      return;
    }
    if (item.href === '#contact-page') {
      onNavigate('contact');
      return;
    }

    const targetSection = item.href.replace('#', '');

    if (location.pathname !== '/') {
      onNavigate('home', targetSection);
    } else {
      const element = document.getElementById(targetSection);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (item: typeof NAV_ITEMS[0]) => {
     if (item.href === '#team-trigger' && activePage === 'team') return true;
     if (item.href === '#contact-page' && activePage === 'contact') return true;
     if (location.pathname === '/' && item.href.startsWith('#')) {
       // Проверка активной секции на главной странице
       return false; // Можно добавить логику определения активной секции при скролле
     }
     return false;
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        isScrolled 
          ? 'py-4 bg-white/80 dark:bg-[#030303]/80 backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none' 
          : 'py-8 bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="relative z-50 group cursor-pointer focus:outline-none">
          <span className="text-2xl font-display font-black tracking-tighter text-slate-900 dark:text-white">
            MAD<span className="text-madn-accent transition-all duration-300 group-hover:text-slate-900 dark:group-hover:text-white">N</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-sm font-medium transition-colors tracking-wide relative group ${
                isActive(item) 
                  ? 'text-madn-accent' 
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-madn-accent transition-all duration-300 group-hover:w-full ${
                 isActive(item) ? 'w-full' : 'w-0'
              }`}></span>
            </a>
          ))}

           <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-white/10">
             {/* Background Toggle */}
             <button 
                onClick={onToggleSpider}
                className={`p-2 rounded-full transition-colors ${isSpiderEnabled ? 'text-madn-accent bg-madn-accent/10' : 'text-slate-400 hover:bg-slate-100 dark:text-gray-600 dark:hover:bg-white/10'}`}
                aria-label="Toggle Background"
                title="Toggle Background Character"
              >
                <Bug className="w-5 h-5" />
              </button>

             {/* Theme Toggle */}
             <button 
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
           </div>
        </nav>

        {/* Mobile Menu & Theme Button */}
        <div className="flex items-center gap-2 md:hidden z-50">
             <button 
                onClick={onToggleSpider}
                className={`p-2 rounded-full transition-colors ${isSpiderEnabled ? 'text-madn-accent' : 'text-slate-400 dark:text-zinc-600'}`}
              >
                <Bug className="w-5 h-5" />
              </button>
             <button 
                onClick={onToggleTheme}
                className="p-2 rounded-full hover:bg-white/10 text-slate-900 dark:text-white"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            <button 
              className="text-slate-900 dark:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 md:hidden z-40 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}>
          <div className="flex flex-col space-y-8 text-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-4xl font-display font-bold text-slate-400 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-colors"
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

