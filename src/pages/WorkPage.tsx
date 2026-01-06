import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '@config';
import { Project } from '@types';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Button from '@ui/Button';

const WorkPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setAnimateItems(true), 100);
  }, []);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const handleProjectClick = (project: Project) => {
    navigate(`/work/${project.id}`);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-madn-light dark:bg-[#030303] relative transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Назад
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 text-slate-900 dark:text-white transition-colors">
                Наши <span className="text-madn-accent">Кейсы</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl font-light transition-colors">
                Мы создаем цифровые продукты, которые работают. От финтеха до e-commerce.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-slate-200 dark:border-white/10 pb-6 sticky top-24 z-30 bg-white/80 dark:bg-[#030303]/80 backdrop-blur-xl transition-colors duration-500">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-mono uppercase tracking-wider transition-all duration-300 border ${
                filter === cat 
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white' 
                  : 'bg-transparent text-slate-500 dark:text-gray-500 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              onClick={() => handleProjectClick(project)}
              className={`group cursor-pointer transition-all duration-700 transform ${animateItems ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
               <div className="aspect-[16/10] overflow-hidden rounded-xl bg-slate-200 dark:bg-zinc-900 mb-6 relative border border-slate-200 dark:border-white/5 shadow-lg dark:shadow-none">
                 <img 
                   src={project.imageUrl} 
                   alt={project.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-80 group-hover:opacity-100"
                 />
                 <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                 
                 {/* Hover Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                       <ArrowUpRight className="w-8 h-8 text-white" />
                    </div>
                 </div>
               </div>
               
               <div className="flex justify-between items-start">
                 <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className="text-madn-accent font-mono text-xs font-bold tracking-widest uppercase">{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-gray-600"></span>
                      <span className="text-slate-500 dark:text-gray-500 font-mono text-xs">{project.year}</span>
                   </div>
                   <h3 className="text-3xl font-bold font-display text-slate-900 dark:text-white group-hover:text-madn-accent transition-colors">{project.title}</h3>
                 </div>
               </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-32 border-t border-slate-200 dark:border-white/5 pt-16 text-center transition-colors">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 text-slate-900 dark:text-white">Есть идея проекта?</h2>
            <Button variant="secondary" onClick={() => navigate('/contact')}>Обсудить с нами</Button>
        </div>

      </div>
    </div>
  );
};

export default WorkPage;