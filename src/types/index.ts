
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProjectImage {
  url: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
  // New fields for detailed view
  description?: string;
  fullDescription?: string;
  link?: string;
  stack?: string[];
  client?: string;
  challenge?: string;
  solution?: string;
  images?: ProjectImage[]; // Галерея изображений с описаниями
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: string;
}


