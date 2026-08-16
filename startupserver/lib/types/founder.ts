export interface SocialLink {
  platform: string;
  url: string;
}

export interface Founder {
  _id: string;
  name: string;
  position: string;
  quote: string;
  details: string;
  socials: SocialLink[];
  whatsapp?: string;
  avatar: string;
}

export interface FounderFormData {
  name: string;
  position: string;
  quote: string;
  details: string;
  socials: SocialLink[];
  whatsapp?: string;
}
