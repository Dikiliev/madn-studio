import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '@ui/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-madn-light dark:bg-[#030303] flex items-center justify-center relative overflow-hidden transition-colors duration-500 mt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/50 via-madn-light to-madn-light dark:from-indigo-900/10 dark:via-[#030303] dark:to-[#030303] -z-20 transition-colors duration-500"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-15 pointer-events-none transition-colors duration-500"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-16">
            <h1 className="text-[10rem] md:text-[14rem] font-display font-black leading-none text-slate-900 dark:text-white select-none transition-colors duration-500">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white transition-colors duration-500">
              Страница не найдена
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed transition-colors duration-500 max-w-xl mx-auto">
              Запрашиваемая страница не существует или была перемещена.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button 
              variant="secondary" 
              onClick={() => navigate('/')}
              className="group"
            >
              <Home className="w-4 h-4 mr-2 inline-block group-hover:scale-110 transition-transform" />
              На главную
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 inline-block group-hover:-translate-x-1 transition-transform" />
              Назад
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-12 border-t border-slate-200 dark:border-white/5">
            <p className="text-sm text-slate-500 dark:text-gray-500 mb-6 font-mono uppercase tracking-wider">
              Популярные страницы
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/work')}
                className="px-5 py-2.5 text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 rounded-full hover:border-madn-accent/50 hover:bg-madn-accent/5 transition-all duration-300"
              >
                Проекты
              </button>
              <button
                onClick={() => navigate('/team')}
                className="px-5 py-2.5 text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 rounded-full hover:border-madn-accent/50 hover:bg-madn-accent/5 transition-all duration-300"
              >
                Команда
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-5 py-2.5 text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 rounded-full hover:border-madn-accent/50 hover:bg-madn-accent/5 transition-all duration-300"
              >
                Контакты
              </button>
              <button
                onClick={() => navigate('/careers')}
                className="px-5 py-2.5 text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 rounded-full hover:border-madn-accent/50 hover:bg-madn-accent/5 transition-all duration-300"
              >
                Карьера
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
