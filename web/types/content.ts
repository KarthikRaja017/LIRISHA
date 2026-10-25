export interface SubServiceItem {
  id: string;
  name: string;
  description: string;
  link: string;
  features?: string[];
  tagline?: string;
  beforeSrc?: string;
  afterSrc?: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  iconClass: string;
  heroImage: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  subServices: SubServiceItem[];
  turnaroundTime: string;
  deliverables: string[];
  keyBenefits: string[];
}

export interface ResourceArticle {
  id: string;
  slug: string;
  category: "Articles" | "Case Studies" | "Blog" | "Guides" | string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  link: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  clientDetails?: {
    client: string;
    industry: string;
    location: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  projectType: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
}

export interface GalleryTab {
  id: string;
  name: string;
  items: GalleryItem[];
}

export interface PageHero {
  title?: string;
  tagline?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  [key: string]: any;
}

export interface PageSection {
  type: string;
  title?: string;
  content?: string;
  items?: any[];
  [key: string]: any;
}

export interface PageContent {
  slug: string;
  title: string;
  metaDescription?: string;
  hero?: PageHero;
  sections?: PageSection[];
  updatedAt?: string;
}

export interface SiteSettingItem {
  value: string;
  metadata?: {
    label?: string;
    description?: string;
    [key: string]: any;
  };
  updatedAt?: string;
}

export type SiteSettingsMap = Record<string, SiteSettingItem>;

