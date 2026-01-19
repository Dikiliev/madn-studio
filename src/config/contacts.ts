export interface ContactInfo {
  email: string;
  phone: string;
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
  email: 'hello@madn.studio',
  phone: '+7 (999) 123-45-67',
  telegram: '+7 (999) 123-45-67',
  location: 'Moscow / Global'
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Instagram',
    icon: 'Instagram',
    href: '#'
  },
  {
    name: 'Twitter',
    icon: 'Twitter',
    href: '#'
  },
  {
    name: 'LinkedIn',
    icon: 'Linkedin',
    href: '#'
  },
  {
    name: 'Github',
    icon: 'Github',
    href: '#'
  },
  {
    name: 'Telegram',
    icon: 'Send',
    href: '#'
  },
  {
    name: 'Behance',
    icon: 'Palette',
    href: '#'
  }
];

export const COMPANY_INFO: CompanyInfo = {
  name: 'MADN',
  description: 'Студия цифрового креатива. Мы объединяем эстетику и технологии, чтобы создавать продукты, которые запоминают.',
  location: 'Moscow / Global',
  copyright: `© ${new Date().getFullYear()} MadN Studio. Moscow / Global.`
};

