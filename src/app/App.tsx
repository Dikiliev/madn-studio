import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import Header from '@layout/Header';
import Footer from '@layout/Footer';
import ChatWidget from '@ui/ChatWidget';
import SpidermanBackground from '@ui/SpidermanBackground';
import { AppRoutes } from './routes';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Background Character State
  const [isBackgroundEnabled, setIsBackgroundEnabled] = useState(true);

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme to HTML element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Mouse tracking for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Определяем активную страницу из URL
  const getActivePage = (): 'home' | 'team' | 'work' | 'contact' => {
    const path = location.pathname;
    if (path.startsWith('/team')) return 'team';
    if (path.startsWith('/work')) return 'work';
    if (path.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const activePage = getActivePage();

  // Обработка навигации
  const handleNavigate = (page: 'home' | 'team' | 'work' | 'contact', sectionId?: string) => {
    if (sectionId && page === 'home') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const routes: Record<string, string> = {
        'home': '/',
        'team': '/team',
        'work': '/work',
        'contact': '/contact',
      };
      navigate(routes[page] || '/');
    window.scrollTo(0, 0);
    }
  };

  // Calculate spotlight gradient position
  const spotlightStyle = {
    background: isDarkMode
      ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.08), transparent 40%)`
      : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.04), transparent 40%)`,
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-madn-light dark:bg-madn-black text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-madn-accent selection:text-white relative transition-colors duration-500">
      
      {/* Spiderman Background */}
      <SpidermanBackground enabled={isBackgroundEnabled} />

      {/* Global Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={spotlightStyle}
      />

      {/* Film Grain Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03] z-[9999] mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>

      <Header 
        onNavigate={handleNavigate} 
        activePage={activePage} 
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        isSpiderEnabled={isBackgroundEnabled}
        onToggleSpider={() => setIsBackgroundEnabled(!isBackgroundEnabled)}
      />
      
      {/* Wrapper for page transitions */}
      <div key={location.pathname} className="animate-fade-in relative z-10">
        <AppRoutes />
      </div>

      <Footer onNavigate={handleNavigate} />
      <ChatWidget />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
