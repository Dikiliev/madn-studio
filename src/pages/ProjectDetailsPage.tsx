import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '@config';
import { ArrowLeft, ExternalLink, Code, Layers, CheckCircle } from 'lucide-react';
import Button from '@ui/Button';

const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const project = PROJECTS.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-madn-light dark:bg-[#030303] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Проект не найден</h1>
          <Button onClick={() => navigate('/work')}>Вернуться к проектам</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-madn-light dark:bg-[#030303] relative transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate('/work')} 
          className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Назад к проектам
        </button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 items-end">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-xs uppercase tracking-wider text-madn-accent font-mono">{project.category}</span>
               <span className="text-slate-600 dark:text-gray-600 font-mono text-xs">{project.year}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 text-slate-900 dark:text-white transition-colors">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 font-light leading-relaxed mb-8 transition-colors">
              {project.description || 'Инновационное цифровое решение для бизнеса.'}
            </p>
            {project.link && (
               <a href={project.link} target="_blank" rel="noopener noreferrer">
                 <Button variant="glow" icon className="px-8">Перейти на сайт</Button>
               </a>
            )}
          </div>
          
          <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-xl dark:shadow-none transition-colors">
             <div className="grid grid-cols-2 gap-8">
                <div>
                   <h3 className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3">Клиент</h3>
                   <p className="text-slate-900 dark:text-white text-lg font-display">{project.client || 'NDA'}</p>
                </div>
                <div>
                   <h3 className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3">Услуга</h3>
                   <p className="text-slate-900 dark:text-white text-lg font-display">{project.category}</p>
                </div>
             </div>
             <hr className="my-6 border-slate-200 dark:border-white/10" />
             <div>
                <h3 className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3">Стек технологий</h3>
                <div className="flex flex-wrap gap-2">
                   {project.stack?.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-black rounded-full border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-gray-400">
                        {tech}
                      </span>
                   )) || <span className="text-gray-500">Не указан</span>}
                </div>
             </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden mb-20 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-900 shadow-lg dark:shadow-none">
           <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-slate-100 dark:bg-zinc-900 rounded-lg text-madn-accent"><Layers className="w-5 h-5"/></div>
                 <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Задача</h2>
              </div>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-lg transition-colors">
                {project.challenge || 'Перед нами стояла задача создать уникальный пользовательский опыт, который выделит бренд на фоне конкурентов и повысит конверсию.'}
              </p>
           </div>
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-slate-100 dark:bg-zinc-900 rounded-lg text-madn-accent"><CheckCircle className="w-5 h-5"/></div>
                 <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Решение</h2>
              </div>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-lg transition-colors">
                {project.solution || 'Мы использовали современный стек технологий и продуктовый подход к дизайну, чтобы реализовать масштабируемое и быстрое решение.'}
              </p>
           </div>
        </div>
        
        {/* Full Description */}
        <div className="max-w-4xl mx-auto border-t border-slate-200 dark:border-white/5 pt-20 transition-colors">
           <h3 className="text-3xl font-display font-bold mb-8 text-slate-900 dark:text-white">О проекте</h3>
           <div className="prose prose-invert prose-lg max-w-none text-slate-600 dark:text-gray-400 prose-p:text-slate-600 dark:prose-p:text-gray-400">
              <p>{project.fullDescription || project.description}</p>
              <p>В процессе работы мы уделили особое внимание оптимизации производительности и адаптивности интерфейса. Результатом стал продукт, который одинаково хорошо работает на любых устройствах.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetailsPage;