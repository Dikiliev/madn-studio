import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Cookie } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Политика Конфиденциальности',
          icon: Shield,
          date: 'Обновлено: 20 Сентября 2024',
          content: (
            <>
              <p className="lead">Ваша конфиденциальность важна для MadN Studio. Мы обязуемся защищать данные, которые вы нам доверяете, и использовать их исключительно для создания лучшего опыта взаимодействия.</p>
              
              <hr className="my-8 border-slate-200 dark:border-white/10" />
              
              <h3>1. Какие данные мы собираем</h3>
              <p>Мы собираем только ту информацию, которая необходима для связи с вами и выполнения обязательств по проектам:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Контактные данные (Имя, Email, Телефон, Telegram ID).</li>
                <li>Технические данные проекта, передаваемые через брифы и формы.</li>
                <li>Данные об использовании сайта (через файлы Cookie) для аналитики.</li>
              </ul>

              <h3>2. Как мы используем ваши данные</h3>
              <p>Ваши данные используются исключительно для:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Обработки входящих заявок и первичной консультации.</li>
                <li>Заключения договоров (NDA, Договор оказания услуг).</li>
                <li>Технической поддержки и обратной связи.</li>
              </ul>

              <h3>3. Передача третьим лицам</h3>
              <p>Мы <strong>никогда</strong> не продаем ваши данные. Передача возможна только:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Доверенным партнерам, участвующим в разработке (хостинг-провайдеры, сервисы аналитики), при условии соблюдения ими конфиденциальности.</li>
                <li>По требованию государственных органов в случаях, предусмотренных законодательством РФ.</li>
              </ul>

              <h3>4. Безопасность</h3>
              <p>Мы используем современные протоколы шифрования (SSL/TLS) для защиты передачи данных. Доступ к персональным данным имеют только сотрудники, подписавшие соглашение о неразглашении.</p>
            </>
          )
        };
      case 'terms':
        return {
          title: 'Условия Использования',
          icon: FileText,
          date: 'Обновлено: 15 Января 2024',
          content: (
            <>
              <p className="lead">Добро пожаловать в MadN Studio. Используя наш сайт и услуги, вы автоматически соглашаетесь со следующими условиями. Пожалуйста, прочитайте их внимательно.</p>
              
              <hr className="my-8 border-slate-200 dark:border-white/10" />

              <h3>1. Интеллектуальная собственность</h3>
              <p>Весь контент на этом сайте, включая дизайн, логотип MadN, исходный код, тексты, графику и анимации, является интеллектуальной собственностью MadN Studio или используется по лицензии. Полное или частичное копирование материалов без письменного разрешения запрещено.</p>

              <h3>2. Оказание услуг</h3>
              <p>Информация на сайте носит ознакомительный характер и не является публичной офертой. Конкретные условия сотрудничества, сроки и стоимость фиксируются в индивидуальном Договоре на оказание услуг.</p>

              <h3>3. Ограничение ответственности</h3>
              <p>MadN Studio не несет ответственности за:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Временные сбои в работе сайта.</li>
                <li>Любые прямые или косвенные убытки, возникшие в результате использования информации с данного ресурса.</li>
              </ul>

              <h3>4. Изменения условий</h3>
              <p>Мы оставляем за собой право вносить изменения в данные Условия в любое время. Обновленная версия вступает в силу с момента публикации на сайте.</p>
            </>
          )
        };
      case 'cookies':
        return {
          title: 'Политика Cookie',
          icon: Cookie,
          date: 'Обновлено: 10 Февраля 2024',
          content: (
            <>
              <p className="lead">Этот сайт использует файлы cookie. Это стандартная технология, которая помогает нам делать сайт удобнее, быстрее и безопаснее.</p>
              
              <hr className="my-8 border-slate-200 dark:border-white/10" />

              <h3>Что такое Cookies?</h3>
              <p>Cookies — это крошечные текстовые файлы, которые браузер сохраняет на вашем устройстве при посещении сайтов. Они не содержат вирусов и не могут запускать программы.</p>

              <h3>Зачем они нам?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Функциональность:</strong> Чтобы запомнить ваши настройки (например, язык) и не спрашивать их каждый раз.</li>
                <li><strong>Аналитика:</strong> Мы используем обезличенные данные (Яндекс.Метрика, Google Analytics), чтобы понимать, какие страницы вам интересны, и улучшать контент.</li>
              </ul>

              <h3>Как отключить?</h3>
              <p>Вы можете отключить или удалить файлы cookie в настройках безопасности вашего браузера. Однако учтите, что некоторые функции сайта могут перестать работать корректно.</p>
            </>
          )
        };
      default:
        return { title: '', date: '', content: null, icon: FileText };
    }
  };

  const { title, date, content, icon: Icon } = getContent();

  return (
    <div className="pt-32 pb-20 min-h-screen bg-madn-light dark:bg-[#030303] relative transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group mb-12"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Назад
        </button>

        <div className="bg-white dark:bg-zinc-900/20 border border-slate-200 dark:border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-xl dark:shadow-none transition-colors">
          <div className="border-b border-slate-200 dark:border-white/10 pb-8 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 text-madn-accent">
               <Icon className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white">{title}</h1>
            <span className="text-slate-500 dark:text-gray-500 font-mono text-sm uppercase tracking-widest">{date}</span>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-madn-accent prose-li:text-slate-600 dark:prose-li:text-gray-400 prose-p:text-slate-600 dark:prose-p:text-gray-400 prose-strong:text-slate-900 dark:prose-strong:text-white">
            {content}
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-gray-600 font-mono gap-4">
             <p>MadN Digital Studio</p>
             <p>Moscow, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;