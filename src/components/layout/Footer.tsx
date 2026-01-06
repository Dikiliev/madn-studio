import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: any, sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Github, href: '#' }
  ];

  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-32 pb-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-madn-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Huge Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02]">
        <h1 className="text-[25vw] font-black font-display leading-[0.75] text-white text-center tracking-tighter transform translate-y-[20%]">
          MADN
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">
                MAD<span className="text-madn-accent">N</span>
              </h2>
              <p className="text-gray-500 max-w-sm mb-8 text-lg font-light leading-relaxed">
                Студия цифрового креатива. <br/>
                Мы объединяем эстетику и технологии, чтобы создавать продукты, которые запоминают.
              </p>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="w-12 h-12 rounded-full bg-zinc-900/50 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:scale-110 hover:border-white transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Spacer */}
          <div className="hidden md:block md:col-span-3"></div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-8 font-display tracking-wide uppercase text-sm text-gray-500">Студия</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('home', 'about')} className="group flex items-center text-gray-400 hover:text-madn-accent transition-colors duration-300">
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300 inline-block">О нас</span>
                </button>
              </li>
              <li>
                <Link to="/careers" className="group flex items-center text-gray-400 hover:text-madn-accent transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-madn-accent opacity-0 -ml-4 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300 inline-block">Карьера</span>
                </Link>
              </li>
              <li>
                <button onClick={() => onNavigate('home', 'services')} className="group flex items-center text-gray-400 hover:text-madn-accent transition-colors duration-300">
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300 inline-block">Услуги</span>
                </button>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center text-gray-400 hover:text-madn-accent transition-colors duration-300">
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300 inline-block">Контакты</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-8 font-display tracking-wide uppercase text-sm text-gray-500">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="group flex items-center text-gray-400 hover:text-madn-accent transition-colors duration-300 text-left">
                   <span className="transform group-hover:translate-x-2 transition-transform duration-300 inline-block">Политика<br/>конфиденциальности</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="group flex items-center text-gray-400 hover:text-madn-accent transition-colors duration-300">
                   <span className="transform group-hover:translate-x-2 transition-transform duration-300 inline-block">Условия использования</span>
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="group flex items-center text-gray-400 hover:text-madn-accent transition-colors duration-300">
                   <span className="transform group-hover:translate-x-2 transition-transform duration-300 inline-block">Cookie Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-600 font-mono">
          <p>&copy; {new Date().getFullYear()} MadN Studio. Moscow / Global.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <Link to="/privacy" className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy</Link>
             <Link to="/terms" className="hover:text-zinc-400 cursor-pointer transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

