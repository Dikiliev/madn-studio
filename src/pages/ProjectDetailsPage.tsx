import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '@config';
import { ArrowLeft, ExternalLink, Code, Layers, CheckCircle, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import Button from '@ui/Button';
import { ProjectImage } from '@types';

const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  
  const project = PROJECTS.find(p => p.id === projectId);

  // Генерируем массив изображений: если есть images, используем их, иначе создаем из imageUrl
  const getProjectImages = (): ProjectImage[] => {
    if (project?.images && project.images.length > 0) {
      return project.images;
    }
    // Если нет массива images, создаем один элемент из imageUrl с описанием
    if (project?.imageUrl) {
      return [{
        url: project.imageUrl,
        description: `Главный экран проекта ${project.title}. ${project.description || 'Современный интерфейс с продуманным дизайном и удобной навигацией.'}`
      }];
    }
    return [];
  };

  const projectImages = getProjectImages();
  const hasMultipleImages = projectImages.length > 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Блокировка скролла при открытом lightbox
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedImageIndex]);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsClosing(false);
    // Небольшая задержка для запуска анимации открытия
    setTimeout(() => setIsLightboxVisible(true), 10);
  };

  const handleCloseLightbox = () => {
    setIsClosing(true);
    setIsLightboxVisible(false);
    setTimeout(() => {
      setSelectedImageIndex(null);
      setIsClosing(false);
    }, 300);
  };

  const handleNextImage = () => {
    if (!hasMultipleImages || selectedImageIndex === null || isSliding) return;
    setSlideDirection('left');
    setIsSliding(true);
    setTimeout(() => {
      setSelectedImageIndex((selectedImageIndex + 1) % projectImages.length);
      setSlideDirection(null);
      setTimeout(() => setIsSliding(false), 50);
    }, 200);
  };

  const handlePreviousImage = () => {
    if (!hasMultipleImages || selectedImageIndex === null || isSliding) return;
    setSlideDirection('right');
    setIsSliding(true);
    setTimeout(() => {
      setSelectedImageIndex((selectedImageIndex - 1 + projectImages.length) % projectImages.length);
      setSlideDirection(null);
      setTimeout(() => setIsSliding(false), 50);
    }, 200);
  };

  // Обработка клавиатуры для навигации
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        handlePreviousImage();
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, hasMultipleImages, projectImages.length]);

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

        {/* Image Gallery */}
        <div className="mb-20">
          {/* Подсказка о возможности открытия изображений */}
          {hasMultipleImages && (
            <div className="mb-6 flex items-center gap-3 text-sm text-slate-500 dark:text-gray-400">
              <Maximize2 className="w-4 h-4" />
              <span>Нажмите на изображение для полноэкранного просмотра</span>
            </div>
          )}
          
          {hasMultipleImages ? (
            // Галерея с несколькими изображениями
            <div className="space-y-12">
              {projectImages.map((image, index) => (
                <div key={index} className="group relative">
                  <div 
                    className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-zinc-900 shadow-lg dark:shadow-none cursor-pointer transition-all duration-300 hover:shadow-2xl md:hover:scale-[1.01] aspect-[16/10] md:aspect-[16/9] relative"
                    onClick={() => handleOpenLightbox(index)}
                  >
                    <img 
                      src={image.url} 
                      alt={`${project.title} - Изображение ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" 
                      loading="lazy"
                    />
                    {/* Overlay hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  {image.description && (
                    <p className="mt-4 text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-4xl">
                      {image.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Одно изображение
            <div className="relative group">
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-zinc-900 shadow-lg dark:shadow-none cursor-pointer transition-all duration-300 hover:shadow-2xl md:hover:scale-[1.01] aspect-[16/10] md:aspect-[16/9]"
                   onClick={() => handleOpenLightbox(0)}>
                <img 
                  src={projectImages[0]?.url || project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" 
                  loading="lazy"
                />
                {/* Overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm text-slate-500 dark:text-gray-400">
                <Maximize2 className="w-4 h-4" />
                <span>Нажмите для полноэкранного просмотра</span>
              </div>
            </div>
          )}
        </div>

        {/* Lightbox - рендерится через Portal в body */}
        {selectedImageIndex !== null && createPortal(
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backgroundColor: isLightboxVisible && !isClosing ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              transition: 'background-color 0.3s ease-out',
              backdropFilter: isLightboxVisible && !isClosing ? 'blur(8px)' : 'blur(0px)'
            }}
            onClick={handleCloseLightbox}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={handleCloseLightbox}
              style={{
                position: 'fixed',
                top: '16px',
                right: '16px',
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 100000,
                opacity: isLightboxVisible && !isClosing ? 1 : 0,
                transform: isLightboxVisible && !isClosing ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-90deg)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <X style={{ width: '24px', height: '24px' }} />
            </button>
            
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreviousImage();
                  }}
                  style={{
                    position: 'fixed',
                    left: '16px',
                    top: '50%',
                    transform: `translateY(-50%) ${isLightboxVisible && !isClosing ? 'translateX(0)' : 'translateX(-20px)'}`,
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 100000,
                    opacity: isLightboxVisible && !isClosing ? 1 : 0,
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
                  }}
                >
                  <ChevronLeft style={{ width: '32px', height: '32px' }} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  style={{
                    position: 'fixed',
                    right: '16px',
                    top: '50%',
                    transform: `translateY(-50%) ${isLightboxVisible && !isClosing ? 'translateX(0)' : 'translateX(20px)'}`,
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 100000,
                    opacity: isLightboxVisible && !isClosing ? 1 : 0,
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
                  }}
                >
                  <ChevronRight style={{ width: '32px', height: '32px' }} />
                </button>
              </>
            )}

            {/* Изображение */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '90vw',
                maxHeight: '90vh',
                opacity: isLightboxVisible && !isClosing ? 1 : 0,
                transform: isLightboxVisible && !isClosing 
                  ? slideDirection === 'left' 
                    ? 'translateX(-30px) scale(0.95)' 
                    : slideDirection === 'right' 
                    ? 'translateX(30px) scale(0.95)' 
                    : 'translateX(0) scale(1)'
                  : 'scale(0.9)',
                transition: slideDirection 
                  ? 'all 0.2s ease-out' 
                  : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={projectImages[selectedImageIndex].url} 
                alt={`${project.title} - Изображение ${selectedImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  opacity: slideDirection ? 0.7 : 1,
                  transition: 'opacity 0.2s ease-out'
                }}
              />
              {projectImages[selectedImageIndex].description && (
                <div style={{ 
                  marginTop: '24px', 
                  maxWidth: '800px', 
                  textAlign: 'center', 
                  color: 'white', 
                  padding: '0 16px',
                  opacity: isLightboxVisible && !isClosing && !slideDirection ? 1 : 0,
                  transform: isLightboxVisible && !isClosing && !slideDirection ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.3s ease-out 0.15s'
                }}>
                  <p style={{ fontSize: '18px', lineHeight: '28px' }}>
                    {projectImages[selectedImageIndex].description}
                  </p>
                  {hasMultipleImages && (
                    <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '12px', fontFamily: 'monospace' }}>
                      {selectedImageIndex + 1} / {projectImages.length}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Подсказка о навигации */}
            {hasMultipleImages && (
              <div style={{
                position: 'fixed',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#9ca3af',
                fontSize: '12px',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isLightboxVisible && !isClosing ? 0.7 : 0,
                transition: 'opacity 0.3s ease-out 0.2s'
              }}>
                <span>← → навигация</span>
                <span style={{ color: '#4b5563' }}>•</span>
                <span>ESC закрыть</span>
              </div>
            )}
          </div>,
          document.body
        )}

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