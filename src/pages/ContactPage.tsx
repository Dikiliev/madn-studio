import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Mail, Phone, Send } from 'lucide-react';
import Button from '@ui/Button';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в течение рабочего дня.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-madn-light dark:bg-[#030303] relative overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-madn-accent/5 blur-[150px] rounded-full pointer-events-none"></div>

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
          
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 text-slate-900 dark:text-white transition-colors">
            Контакты
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl font-light transition-colors">
            Мы работаем с клиентами по всему миру. Напишите нам, чтобы обсудить ваш проект или просто поздороваться.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
           {/* Left Column: Contacts Info */}
           <div className="lg:col-span-5 space-y-12">
              
              {/* Info Blocks */}
              <div className="space-y-8">
                <a href="mailto:hello@madn.studio" className="group block p-6 rounded-2xl bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 hover:border-madn-accent/50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-none">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-slate-100 dark:bg-black rounded-lg text-madn-accent"><Mail className="w-6 h-6"/></div>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                   </div>
                   <div className="text-sm font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">Email</div>
                   <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">hello@madn.studio</div>
                </a>

                <a href="tel:+79991234567" className="group block p-6 rounded-2xl bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 hover:border-madn-accent/50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-none">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-slate-100 dark:bg-black rounded-lg text-madn-accent"><Phone className="w-6 h-6"/></div>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                   </div>
                   <div className="text-sm font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">Phone / Telegram</div>
                   <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">+7 (999) 123-45-67</div>
                </a>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold mb-6 font-display uppercase tracking-wide text-sm">Мы в соцсетях</h3>
                <div className="flex flex-wrap gap-4">
                   {['Instagram', 'Telegram', 'Behance', 'LinkedIn'].map((social) => (
                      <a 
                        key={social}
                        href="#" 
                        className="px-6 py-3 rounded-full border border-slate-300 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-all duration-300 font-mono text-sm"
                      >
                        {social}
                      </a>
                   ))}
                </div>
              </div>
           </div>

           {/* Right Column: Form */}
           <div className="lg:col-span-7">
              <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-xl dark:shadow-none transition-colors">
                <h3 className="text-3xl font-display font-bold mb-8 text-slate-900 dark:text-white">Начать проект</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3 block">Имя</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-14 px-5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-madn-accent transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-gray-700"
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div className="group">
                        <label className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3 block">Контакты</label>
                        <input
                          type="text"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full h-14 px-5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-madn-accent transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-gray-700"
                          placeholder="Email или Telegram"
                        />
                      </div>
                   </div>
                   
                   <div className="group">
                      <label className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3 block">О проекте</label>
                      <textarea
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full p-5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-madn-accent transition-all duration-300 resize-none placeholder:text-slate-400 dark:placeholder:text-gray-700"
                        placeholder="Краткое описание задачи, сроки, бюджет..."
                      ></textarea>
                   </div>

                   <div className="pt-4 flex items-center justify-between">
                      <p className="text-xs text-slate-500 dark:text-gray-600 max-w-xs">
                         Нажимая кнопку, вы соглашаетесь с нашей <button className="text-slate-800 dark:text-gray-400 hover:text-madn-accent dark:hover:text-white underline">Политикой конфиденциальности</button>.
                      </p>
                      <Button type="submit" variant="secondary" className="px-10">Отправить</Button>
                   </div>
                </form>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;