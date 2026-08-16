export interface SocialLink {
    platform: string;
    url: string;
    icon?: string;
}

export interface ContactInfo {
    _id?: string;
    address: string;
    email: string;
    phone: string;
    whatsapp?: string;
    socials: SocialLink[];
}
