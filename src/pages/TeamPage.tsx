import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEAM_MEMBERS } from '@config';
import { ArrowLeft, Send, Instagram } from 'lucide-react';
import Button from '@ui/Button';

const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-madn-light dark:bg-[#030303] relative transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="mb-12">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Назад
          </button>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-slate-900 dark:text-white transition-colors">
            Команда <span className="text-madn-accent">MadN</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl font-light transition-colors">
            Мы — группа энтузиастов, инженеров и художников. Мы не просто пишем код, мы создаем опыт, который меняет восприятие вашего бренда.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={member.id} className="group cursor-pointer">
               <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 dark:bg-zinc-900 mb-6 relative border border-transparent dark:border-white/5 shadow-md dark:shadow-none">
                 <img 
                   src={member.image} 
                   alt={member.name} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                 />
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {/* Social Icons */}
                    <a 
                      href={`https://t.me/${member.social || ''}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Send className="w-5 h-5 text-white group-hover:text-black"/>
                    </a>
                    <a 
                      href={`https://instagram.com/${member.social || ''}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram className="w-5 h-5 text-white group-hover:text-black"/>
                    </a>
                 </div>
               </div>
               
               <div className="flex flex-col">
                 <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-1 group-hover:text-madn-accent transition-colors">{member.name}</h3>
                 <span className="text-sm font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest">{member.role}</span>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 text-center relative overflow-hidden shadow-xl dark:shadow-none transition-colors">
           <div className="absolute top-0 right-0 w-64 h-64 bg-madn-accent/10 blur-[100px] rounded-full pointer-events-none"></div>
           <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 relative z-10 text-slate-900 dark:text-white">Хочешь в команду?</h3>
           <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
             Мы всегда ищем талантливых разработчиков и дизайнеров. Если ты горишь своим делом — напиши нам.
           </p>
           <Button variant="outline" className="relative z-10">Отправить портфолио</Button>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;