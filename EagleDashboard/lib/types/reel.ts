export interface Reel {
    _id: string;
    title: string;
    videoUrl: string;
    publicId?: string;
    createdAt: string;
}

export interface ReelInput {
    title: string;
    videoUrl?: string;
    publicId?: string;
}

