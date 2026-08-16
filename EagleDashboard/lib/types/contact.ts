export interface SocialLink {
    platform: string;
    url: string;
    icon?: string;
    _id?: string;
}

export interface Contact {
    _id: string;
    address: string;
    email: string;
    phone: string;
    whatsapp?: string;
    socials: SocialLink[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ContactInput {
    address: string;
    email: string;
    phone: string;
    whatsapp?: string;
    socials: SocialLink[];
}
