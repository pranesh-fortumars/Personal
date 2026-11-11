export type Language = 'en' | 'ta' | 'bi';

export type CategoryId =
  | 'wedding'
  | 'engagement'
  | 'reception'
  | 'tamil-wedding'
  | 'mehendi'
  | 'haldi'
  | 'kids-birthday'
  | 'adult-birthday'
  | 'baby-shower'
  | 'seemantham'
  | 'housewarming'
  | 'anniversary'
  | 'naming'
  | 'manjal-neerattu'
  | 'special';

export interface Category {
  id: CategoryId;
  name: string;
  tamilName: string;
  blurb: string;
}

export interface Colorway {
  name: string;
  tamilName: string;
  bg: string; // page background
  bgAlt: string; // secondary surface
  primary: string; // main accent
  secondary: string; // secondary accent
  text: string; // body text
  textSoft: string; // muted text
  gold: string; // metallic accent
  border: string; // ornamental line
  swatch: [string, string]; // for swatch chip
}

export type PageType = 'cover' | 'invite' | 'details' | 'rsvp';

export interface PageContent {
  type: PageType;
  en: {
    title: string;
    body: string;
    host?: string;
    names?: string;
    date?: string;
    time?: string;
    venue?: string;
    address?: string;
    rsvp?: string;
    message?: string;
  };
  ta: {
    title: string;
    body: string;
    host?: string;
    names?: string;
    date?: string;
    time?: string;
    venue?: string;
    address?: string;
    rsvp?: string;
    message?: string;
  };
}

export interface Ornament {
  kind: 'floral' | 'peacock' | 'lotus' | 'mandala' | 'crown' | 'annam' | 'geometric' | 'botanical' | 'temple' | 'rays' | 'arch' | 'star' | 'henna' | 'sun' | 'wave';
  accent?: boolean;
}

export interface Template {
  id: number;
  slug: string;
  name: string;
  tamilName: string;
  category: CategoryId;
  languageAvailability: Language[];
  price: number;
  pageTypes: PageType[];
  colorways: Colorway[];
  ornament: Ornament;
  composition: 'vertical' | 'arched' | 'framed' | 'modular' | 'folded' | 'bordered' | 'circular' | 'doublearch';
  paper: 'matte' | 'ivory' | 'pearl' | 'kraft' | 'vellum';
  defaultContent: PageContent[];
}

export interface Personalisation {
  host: string;
  couple: string;
  family: string;
  invitee: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  rsvp: string;
  message: string;
  extra: string;
}

export interface CartItem {
  id: string;
  templateId: number;
  templateName: string;
  colorwayName: string;
  language: Language;
  quantity: number;
  unitPrice: number;
  pages: number;
  personalisation: Personalisation;
  addedAt: number;
}

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  tamilName: string;
  blurb: string;
  hero: string;
  route: string;
}
