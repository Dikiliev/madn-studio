import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, Code, Fingerprint, Cpu, ArrowRight, MousePointer2, ExternalLink, Globe, Sparkles, Terminal, Server, Database, Layers, Rocket, Bot, CheckCircle2, Mail, Phone, ArrowUpRight, User } from 'lucide-react';
import Button from '@ui/Button';
import { DecryptedText } from '@ui/DecryptedText';
import { SERVICES, PROJECTS, TEAM_MEMBERS } from '@config';
import { Project } from '@types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Cpu': return <Layers className="w-6 h-6" />;
      case 'Fingerprint': return <Bot className="w-6 h-6" />;
      case 'Sparkles': return <Rocket className="w-6 h-6" />;
      default: return <MousePointer2 className="w-6 h-6" />;
    }
  };

  const handleProjectClick = (project: Project) => {
    navigate(`/work/${project.id}`);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-madn-light dark:bg-[#030303] transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/50 via-madn-light to-madn-light dark:from-indigo-900/10 dark:via-[#030303] dark:to-[#030303] -z-20 transition-colors duration-500"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,1))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(3,3,3,1))] -z-10 transition-colors duration-500"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-15 pointer-events-none transition-colors duration-500"></div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div className="mb-8 relative group cursor-default">
            <div className="relative px-6 py-2 bg-white/50 dark:bg-white/5 ring-1 ring-slate-200 dark:ring-white/10 rounded-full flex items-center gap-2 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-500">
              <span className="w-2 h-2 rounded-full bg-madn-accent animate-pulse"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-slate-600 dark:text-gray-300 uppercase">Web • Apps • Bots</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold leading-[0.9] tracking-tighter uppercase mb-8 relative select-none">
            <span className="relative z-10 text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-2xl block transition-colors duration-500">
              <DecryptedText text="MADN" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-800 via-violet-600 to-slate-400 dark:from-white dark:via-gray-400 dark:to-gray-800 relative z-10 block transition-colors duration-500">
              <DecryptedText text="STUDIO" speed={40} />
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light transition-colors duration-500">
            Мы создаем <span className="text-slate-900 dark:text-white font-medium">сайты, приложения и ботов</span> под ключ. 
            Превращаем ваши идеи в работающие цифровые продукты.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Button variant="secondary" onClick={() => navigate('/work')}>
              Смотреть проекты
            </Button>
            <Button variant="outline" icon onClick={() => navigate('/contact')}>
              Обсудить проект
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-b border-slate-200 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-md py-4 z-20 transition-colors duration-500">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mx-12 flex items-center font-mono transition-colors duration-500">
                <Rocket className="w-4 h-4 text-madn-accent mr-4" />
                Websites
                <span className="mx-6 text-slate-300 dark:text-zinc-800">|</span>
                Mobile Apps
                <span className="mx-6 text-slate-300 dark:text-zinc-800">|</span>
                Telegram Bots
                <span className="mx-6 text-slate-300 dark:text-zinc-800">|</span>
                Web3
                <span className="mx-6 text-slate-300 dark:text-zinc-800">|</span>
                CRM Systems
                <span className="mx-6 text-slate-300 dark:text-zinc-800">|</span>
                Turnkey Launch
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative bg-slate-50 dark:bg-[#030303] transition-colors duration-500">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-1 sticky top-32 self-start">
              <span className="text-madn-accent font-bold tracking-widest uppercase text-sm mb-4 block">Что мы создаем</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight text-slate-900 dark:text-white transition-colors duration-500">
                Продукты <br/> <span className="text-slate-500 dark:text-gray-600">Для Бизнеса.</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-8 transition-colors duration-500">
                От простого лендинга до сложной экосистемы. Мы берем на себя весь процесс: аналитика, дизайн, код и запуск.
              </p>
              <Button variant="outline" icon onClick={() => navigate('/contact')}>Обсудить задачу</Button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service) => (
                <div 
                  key={service.id} 
                  className="group relative p-8 rounded-[1rem] bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 hover:border-madn-accent/30 transition-all duration-500 overflow-hidden hover:shadow-xl dark:hover:bg-zinc-900/50 shadow-sm dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-madn-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:text-madn-accent transition-all duration-500">
                      {getIcon(service.icon)}
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-display text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300">{service.title}</h3>
                    <p className="text-slate-600 dark:text-gray-500 leading-relaxed text-sm group-hover:text-slate-500 dark:group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work (Teaser) */}
      <section id="work" className="py-32 bg-white dark:bg-[#050505] relative transition-colors duration-500">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-block p-3 rounded-full bg-slate-100 dark:bg-white/5 mb-6 border border-slate-200 dark:border-white/10 transition-colors duration-500">
              <Database className="w-6 h-6 text-madn-accent" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white transition-colors duration-500">Наши Кейсы</h2>
          </div>
          <div className="space-y-32">
            {PROJECTS.slice(0, 4).map((project, index) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 group`}
              >
                <div className="w-full md:w-3/5 relative perspective-1000">
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-slate-200 dark:border-white/10 transform transition-transform duration-700 group-hover:scale-[1.01] shadow-xl dark:shadow-2xl bg-white dark:bg-zinc-900">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-all duration-700 md:grayscale md:group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </div>
                <div className="w-full md:w-2/5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-[10px] uppercase tracking-wider text-madn-accent font-mono">{project.category}</span>
                    <span className="text-slate-500 dark:text-gray-600 font-mono text-xs">{project.year}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900 dark:text-white group-hover:text-madn-accent transition-colors duration-300">{project.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 mb-8 text-lg leading-relaxed font-light transition-colors duration-500">
                    Комплексная разработка продукта: дизайн, фронтенд, бэкенд и админ-панель. Полностью готовое решение для бизнеса.
                  </p>
                  <div className="flex gap-4">
                     <Button variant="outline" className="group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black dark:group-hover:border-white" onClick={() => handleProjectClick(project)}>
                       Смотреть кейс
                     </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-32 text-center">
            <Button variant="secondary" onClick={() => navigate('/work')}>Все проекты</Button>
          </div>
        </div>
      </section>

      {/* About Section - Brief */}
      <section id="about" className="py-32 bg-slate-50 dark:bg-[#030303] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03]">
          <span className="text-[20vw] font-black font-display leading-none text-slate-900 dark:text-white uppercase tracking-tighter">Trust</span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-12 text-slate-900 dark:text-white transition-colors duration-500">
              Профессиональный <br/>
              <span className="text-slate-500 dark:text-white">подход к</span> <span className="text-madn-accent">вашим задачам</span>.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="p-8 bg-white dark:bg-zinc-900/20 border border-slate-200 dark:border-white/5 rounded-xl backdrop-blur-sm hover:shadow-xl dark:hover:bg-zinc-900/40 transition-all duration-300">
                  <div className="mb-4 text-madn-accent"><CheckCircle2 className="w-6 h-6"/></div>
                  <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Качество</h4>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">Гарантируем чистый код, современный дизайн и стабильную работу продукта.</p>
                </div>
                <div className="p-8 bg-white dark:bg-zinc-900/20 border border-slate-200 dark:border-white/5 rounded-xl backdrop-blur-sm hover:shadow-xl dark:hover:bg-zinc-900/40 transition-all duration-300 relative top-0 md:top-8">
                  <div className="mb-4 text-madn-accent"><Layers className="w-6 h-6"/></div>
                  <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Экспертиза</h4>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">Опытные разработчики и дизайнеры для реализации проектов любой сложности.</p>
                </div>
                <div className="p-8 bg-white dark:bg-zinc-900/20 border border-slate-200 dark:border-white/5 rounded-xl backdrop-blur-sm hover:shadow-xl dark:hover:bg-zinc-900/40 transition-all duration-300">
                  <div className="mb-4 text-madn-accent"><Bot className="w-6 h-6"/></div>
                  <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Ответственность</h4>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">Соблюдаем сроки и договоренности. Всегда на связи и не пропадаем.</p>
                </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-white/5 pt-24 transition-colors duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                <div>
                  <span className="text-madn-accent font-mono text-xs font-bold tracking-widest uppercase mb-4 block">Команда</span>
                  <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">Люди за кодом</h3>
                </div>
                <Button variant="outline" icon onClick={() => navigate('/team')}>Вся команда</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.slice(0, 4).map((member) => (
                <div key={member.id} className="group relative cursor-pointer" onClick={() => navigate('/team')}>
                    <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 dark:bg-zinc-900 mb-6 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-out">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-madn-accent transition-colors">{member.name}</h4>
                      <p className="text-sm font-mono text-slate-500 dark:text-gray-500 uppercase tracking-wider">{member.role}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Block */}
      <section className="py-24 bg-slate-50 dark:bg-[#030303] relative border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-slate-900 dark:text-white">Готовы начать?</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto mb-10 text-lg">
              Мы всегда рады новым вызовам. Свяжитесь с нами, чтобы обсудить ваш будущий проект.
            </p>
            <Button variant="secondary" onClick={() => navigate('/contact')}>Связаться с нами</Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;


