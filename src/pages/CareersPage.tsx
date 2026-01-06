import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, PenTool, Terminal, ArrowUpRight } from 'lucide-react';
import Button from '@ui/Button';

const POSITIONS = [
  {
    id: 1,
    role: 'Senior Frontend Developer',
    type: 'Remote / Moscow',
    salary: 'от 250k ₽',
    icon: Code,
    description: 'Ищем мастера React и TypeScript, который любит плавные анимации и чистую архитектуру.'
  },
  {
    id: 2,
    role: 'UI/UX Designer',
    type: 'Remote',
    salary: 'от 180k ₽',
    icon: PenTool,
    description: 'Для тех, кто мыслит системами, любит типографику и умеет создавать "вау" эффект в Figma.'
  },
  {
    id: 3,
    role: 'Backend Engineer (Go/Node.js)',
    type: 'Office / Hybrid',
    salary: 'от 280k ₽',
    icon: Terminal,
    description: 'Разработка высоконагруженных API, работа с базами данных и микросервисами.'
  }
];

const CareersPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-madn-light dark:bg-[#030303] relative transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Назад
          </button>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-slate-900 dark:text-white transition-colors">
            Карьера в <span className="text-madn-accent">MadN</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl font-light leading-relaxed transition-colors">
            Мы не просто нанимаем сотрудников, мы ищем единомышленников. Если ты любишь сложные задачи и ненавидишь посредственность — нам по пути.
          </p>
        </div>

        {/* Culture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 backdrop-blur-sm shadow-md dark:shadow-none transition-colors">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Свобода</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm">Гибкий график и минимум бюрократии. Важен результат, а не часы в офисе.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 backdrop-blur-sm shadow-md dark:shadow-none transition-colors">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Развитие</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm">Оплачиваем курсы, конференции и литературу. Мы растем вместе с тобой.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 backdrop-blur-sm shadow-md dark:shadow-none transition-colors">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Технологии</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm">Используем только современный стек. Никакого легаси и поддержки IE11.</p>
          </div>
        </div>

        {/* Positions List */}
        <h2 className="text-3xl font-display font-bold mb-10 text-slate-900 dark:text-white transition-colors">Открытые позиции</h2>
        
        <div className="space-y-4">
          {POSITIONS.map((job) => (
            <div 
              key={job.id} 
              className="group relative p-8 rounded-xl border border-slate-200 dark:border-white/10 hover:border-madn-accent/50 bg-white dark:bg-zinc-900/20 hover:shadow-lg dark:hover:bg-zinc-900/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:bg-madn-accent/20 group-hover:text-madn-accent transition-colors text-slate-900 dark:text-white">
                  <job.icon className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-madn-accent transition-colors">{job.role}</h3>
                   <div className="flex flex-wrap gap-3 mb-3 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-gray-500">
                      <span>{job.type}</span>
                      <span className="w-px h-3 bg-slate-300 dark:bg-gray-700 self-center"></span>
                      <span>{job.salary}</span>
                   </div>
                   <p className="text-slate-600 dark:text-gray-400 text-sm max-w-xl">{job.description}</p>
                </div>
              </div>
              
              <div className="flex items-center md:self-center">
                 <div className="w-10 h-10 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center group-hover:bg-madn-accent group-hover:border-transparent transition-all">
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Application */}
        <div className="mt-20 p-10 rounded-3xl bg-slate-900 dark:bg-gradient-to-r dark:from-zinc-900 dark:to-black border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors">
           <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Не нашли подходящей вакансии?</h3>
              <p className="text-slate-300 dark:text-gray-400 text-sm">Отправьте нам свое резюме, и мы свяжемся, когда появится что-то интересное.</p>
           </div>
           <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Отправить CV</Button>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;