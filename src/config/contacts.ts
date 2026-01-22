export interface ContactInfo {
  email: string;
  telegram?: string;
  location: string;
}

export interface SocialLink {
  name: string;
  icon: string; // Название иконки из lucide-react
  href: string;
}

export interface CompanyInfo {
  name: string;
  description: string;
  location: string;
  copyright: string;
}

export const CONTACT_INFO: ContactInfo = {
  email: 'madn-studio@ya.ru',
  telegram: 'http://t.me/mdikiy',
  location: 'Moscow / Global'
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Instagram',
    icon: 'Instagram',
    href: '#'
  },
  {
    name: 'Github',
    icon: 'Github', 
    href: 'https://github.com/madn-studio'
  },
  {
    name: 'Telegram',
    icon: 'Send',
    href: 'http://t.me/mdikiy'
  }
];

export const COMPANY_INFO: CompanyInfo = {
  name: 'MADN',
  description: 'Студия цифрового креатива. Мы объединяем эстетику и технологии, чтобы создавать продукты, которые запоминают.',
  location: 'Moscow / Global',
  copyright: `© ${new Date().getFullYear()} MadN Studio. Moscow / Global.`
};

